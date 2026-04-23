#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API_BASE = "https://api.buttondown.com/v1";
const API_KEY = process.env.BUTTONDOWN_API_KEY;

if (!API_KEY) {
  console.error("BUTTONDOWN_API_KEY environment variable is required");
  process.exit(1);
}

const headers = {
  Authorization: `Token ${API_KEY}`,
  "Content-Type": "application/json",
};

async function api(method, path, body) {
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${API_BASE}${path}`, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Buttondown API ${res.status}: ${text}`);
  }
  return res.json();
}

const server = new McpServer({
  name: "buttondown",
  version: "1.0.0",
});

// --- List subscribers ---
server.tool(
  "list_subscribers",
  "List newsletter subscribers with their status and signup date",
  {
    page: z.number().optional().describe("Page number (default 1)"),
    status: z
      .enum(["regular", "unactivated", "removed", "unpaid", "churned"])
      .optional()
      .describe("Filter by subscriber status"),
  },
  async ({ page, status }) => {
    let path = `/subscribers?page=${page || 1}`;
    if (status) path += `&type=${status}`;
    const data = await api("GET", path);
    const summary = data.results.map((s) => ({
      email: s.email,
      status: s.subscriber_type || s.type,
      created: s.creation_date,
      tags: s.tags,
    }));
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            { count: data.count, page: page || 1, subscribers: summary },
            null,
            2
          ),
        },
      ],
    };
  }
);

// --- Subscriber count ---
server.tool(
  "subscriber_count",
  "Get total number of active newsletter subscribers",
  {},
  async () => {
    const data = await api("GET", "/subscribers?page=1");
    return {
      content: [
        { type: "text", text: `Total subscribers: ${data.count}` },
      ],
    };
  }
);

// --- List sent emails ---
server.tool(
  "list_emails",
  "List sent and draft newsletter emails",
  {
    page: z.number().optional().describe("Page number (default 1)"),
    status: z
      .enum(["draft", "about_to_send", "sent", "deleted"])
      .optional()
      .describe("Filter by email status"),
  },
  async ({ page, status }) => {
    let path = `/emails?page=${page || 1}`;
    if (status) path += `&status=${status}`;
    const data = await api("GET", path);
    const summary = data.results.map((e) => ({
      id: e.id,
      subject: e.subject,
      status: e.status,
      created: e.creation_date,
      publish_date: e.publish_date,
      open_rate: e.open_rate,
      click_rate: e.click_rate,
      recipient_count: e.recipient_count,
    }));
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            { count: data.count, emails: summary },
            null,
            2
          ),
        },
      ],
    };
  }
);

// --- Get email details ---
server.tool(
  "get_email",
  "Get full details of a specific email including body and stats",
  {
    email_id: z.string().describe("The email UUID"),
  },
  async ({ email_id }) => {
    const data = await api("GET", `/emails/${email_id}`);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              id: data.id,
              subject: data.subject,
              status: data.status,
              body: data.body,
              created: data.creation_date,
              publish_date: data.publish_date,
              open_rate: data.open_rate,
              click_rate: data.click_rate,
              recipient_count: data.recipient_count,
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// --- Create email draft ---
server.tool(
  "create_draft",
  "Create a newsletter email draft in Buttondown (does NOT send it)",
  {
    subject: z.string().describe("Email subject line"),
    body: z.string().describe("Email body in Markdown"),
  },
  async ({ subject, body }) => {
    const data = await api("POST", "/emails", {
      subject,
      body,
      status: "draft",
    });
    return {
      content: [
        {
          type: "text",
          text: `Draft created.\nID: ${data.id}\nSubject: ${data.subject}\nReview at: https://buttondown.com/emails`,
        },
      ],
    };
  }
);

// --- Send a draft ---
server.tool(
  "send_draft",
  "Send an existing draft email to all subscribers. IMPORTANT: This sends to real people — confirm with the user first.",
  {
    email_id: z.string().describe("The draft email UUID to send"),
  },
  async ({ email_id }) => {
    const data = await api("POST", `/emails/${email_id}/send-draft`);
    return {
      content: [
        {
          type: "text",
          text: `Email sent!\nID: ${data.id}\nSubject: ${data.subject}\nRecipients: ${data.recipient_count || "all subscribers"}`,
        },
      ],
    };
  }
);

// --- Send email immediately ---
server.tool(
  "send_email",
  "Create AND send a newsletter email immediately. IMPORTANT: This sends to real people — confirm with the user first.",
  {
    subject: z.string().describe("Email subject line"),
    body: z.string().describe("Email body in Markdown"),
  },
  async ({ subject, body }) => {
    const data = await api("POST", "/emails", {
      subject,
      body,
      status: "about_to_send",
    });
    return {
      content: [
        {
          type: "text",
          text: `Email sent!\nID: ${data.id}\nSubject: ${data.subject}`,
        },
      ],
    };
  }
);

// Start
const transport = new StdioServerTransport();
await server.connect(transport);
