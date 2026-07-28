#!/bin/bash
# Generic GOLD3 guide verification — GOLD2-era adaptation of terroir.md §16.
# Portable across guides: SLUG is taken from the LIVE dir name (terroir/<SLUG>/),
# or pass it explicitly as argv[2] if the live dir path doesn't match the slug.
LIVE="$1"   # dir containing index.html + data.js
SLUG="${2:-$(basename "$LIVE")}"
F="$LIVE/index.html"
fail=0
ck(){ if eval "$2"; then echo "OK   $1"; else echo "FAIL $1"; fail=1; fi }

ck "lang=en"                 'grep -q "<html lang=\"en\">" "$F"'
for id in soul history why-now eat drink tables dish bougie calas walks coffee-gardens work culture crafts quartiers gastronomy bars music avoid follow seasonal sources; do
  ck "section #$id"          "grep -q 'id=\"$id\"' '$F'"
done
for id in verify markets producers hifi-bars map-section three-tables money-sits tables-extended; do
  ck "removed #$id absent"   "! grep -q 'id=\"$id\"' '$F'"
done
ck "topnav masthead"         'grep -q "terroir-topnav" "$F"'
ck "floating map"            'grep -q "id=\"terroir-mini\"" "$F" && grep -q "id=\"terroir-mini-toggle\"" "$F"'
ck "kit absolute paths"      'grep -q "/terroir/_assets/guide/guide-render.js" "$F"'
ck "no search/votes js"      '! grep -qE "guide-search\.js|votes\.js" "$F"'
ck "comments js"             'grep -q "guide-comments.js" "$F"'
ck "organiser script"        'grep -q "La Grande / La Petite Table v2" "$F"'
ck "gem popup script"        'grep -q "food-gem popups" "$F"'
ck "config articleId"        "grep -q 'terroir-${SLUG}' \"\$F\""
ck "data.js src"             "grep -q '/terroir/data/${SLUG}.js' \"\$F\""
ck "no relative ../ assets"  '! grep -q "\.\./_assets" "$F"'
ck "no stale Girona content" '[ $(grep -o "Girona" "$F" | wc -l) -le 2 ]'
ck "no port-call/pcv"        '[ $(cat "$F" "$LIVE/data.js" | grep -ciE "port-call|pcv") -eq 0 ]'
ck "data.js parses (node)"   'node -e "global.window={};eval(require(\"fs\").readFileSync(\"$LIVE/data.js\",\"utf8\"));const D=window.TERROIR_DATA;if(!(D.VENUES.length>=30&&D.TABLES.grande&&D.TABLES.petite&&D.GEMS.length>=5&&D.PHOTOS.length===3&&D.NEIGHBORHOODS.length>=10&&D.WALKS.length>=6&&D.LANDMARKS.length>=10))process.exit(1)"'
ck "berths = 3"              'node -e "global.window={};eval(require(\"fs\").readFileSync(\"$LIVE/data.js\",\"utf8\"));process.exit(window.TERROIR_DATA.VENUES.filter(v=>v.tier===\"berth_top\").length===3?0:1)"'
ck "dishes on every venue"   'node -e "global.window={};eval(require(\"fs\").readFileSync(\"$LIVE/data.js\",\"utf8\"));process.exit(window.TERROIR_DATA.VENUES.every(v=>v.dishes&&v.dishes.length>=2)?0:1)"'
ck "gem patterns in prose"   'node -e "const fs=require(\"fs\");global.window={};eval(fs.readFileSync(\"$LIVE/data.js\",\"utf8\"));const doc=fs.readFileSync(\"$F\",\"utf8\").toLowerCase();const miss=window.TERROIR_DATA.GEMS.filter(g=>!doc.includes(g.pattern.toLowerCase()));if(miss.length){console.error(\"missing anchors:\",miss.map(g=>g.pattern).join(\", \"));process.exit(1)}"'
echo "data-pins: $(grep -o 'data-pin' "$F" | wc -l | tr -d ' ') (floor 40)"
[ "$(grep -o 'data-pin' "$F" | wc -l)" -ge 40 ] || { echo "FAIL data-pin floor"; fail=1; }
for w in delicious vibrant charming quaint stunning breathtaking "must-try" "hidden gem" mouthwatering "bucket list" foodie; do
  n=$(grep -oi "$w" "$F" | wc -l | tr -d ' ')
  [ "$n" -eq 0 ] || { echo "FAIL banned word '$w' x$n"; fail=1; }
done
n=$(grep -oiE "elevated|curated" "$F" | wc -l | tr -d ' '); [ "$n" -eq 0 ] || { echo "FAIL banned word elevated/curated x$n"; fail=1; }
ck "3 photo files exist"     '[ $(ls "$LIVE/img/"*.jpg 2>/dev/null | wc -l) -ge 3 ]'
ck "csv in folder"           '[ -s "$LIVE/data.csv" ]'
echo; [ $fail -eq 0 ] && echo "ALL CHECKS GREEN" || echo "CHECKS FAILED"
exit $fail
