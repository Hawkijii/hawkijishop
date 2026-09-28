// HAWKIJI — self-initiated ecommerce concept by Ralph Jay Guevarra. Fictional products and sample commerce data.
// Setup: npm create vite@latest hawkiji -- --template react && cd hawkiji && npm i framer-motion
// Replace src/App.jsx with this file (or import it). No external images are used.
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Figtree:wght@400;500;600;700&display=swap');
:root{--red:#FF3030;--deep:#D91F26;--warm:#F8F6F1;--ink:#171717;--mut:#77736D;--soft:#E7E3DC;--ease:cubic-bezier(.22,1,.36,1)}
*{box-sizing:border-box;margin:0}
html{scroll-behavior:smooth}
body{font:400 15px/1.5 Figtree,system-ui,sans-serif;background:var(--warm);color:var(--ink);-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:Anton,Impact,sans-serif;font-weight:400;letter-spacing:.01em;line-height:1;text-transform:uppercase}
h2{font-size:clamp(32px,5vw,56px)} h3{font-size:22px}
button,input,select{font:inherit;color:inherit} button{cursor:pointer}
ul{list-style:none;padding:0} p{color:var(--mut)}
:focus-visible{outline:2px solid var(--ink);outline-offset:2px}
.wrap{max-width:1320px;margin:0 auto;padding:0 24px}
.btn{display:inline-flex;justify-content:center;align-items:center;gap:8px;padding:14px 26px;border:1.5px solid var(--ink);background:var(--ink);color:#fff;font-weight:600;border-radius:99px;transition:all .25s var(--ease)}
.btn:hover:not(:disabled){background:var(--red);border-color:var(--red);transform:translateY(-1px)}
.btn:disabled{opacity:.4;cursor:not-allowed}
.btn.o{background:none;color:inherit}.btn.o:hover:not(:disabled){background:var(--ink);border-color:var(--ink);color:#fff}
.btn.w{background:#fff;color:var(--ink);border-color:#fff}.btn.w:hover:not(:disabled){background:var(--ink);color:#fff;border-color:var(--ink)}
.btn.full{width:100%}
.ib{position:relative;width:42px;height:42px;display:grid;place-items:center;border:0;background:none;border-radius:50%;color:inherit;transition:background .2s}
.ib:hover{background:rgba(127,127,127,.16)}
.ib svg,.ic{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.bdg{position:absolute;top:2px;right:0;min-width:18px;height:18px;border-radius:9px;background:var(--red);color:#fff;font-size:11px;font-weight:700;display:grid;place-items:center}
/* nav */
.top{background:var(--ink);color:#fff;text-align:center;font-size:13px;padding:8px}
.nav{position:sticky;top:0;z-index:40;transition:background .3s,color .3s,box-shadow .3s}
.nav.solid{background:rgba(248,246,241,.94);backdrop-filter:blur(12px);box-shadow:0 1px 0 var(--soft)}
.nav.over{background:transparent;color:#fff;margin-bottom:-64px;position:fixed;left:0;right:0}
.ni{height:64px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center}
.logo{font:400 30px Anton,Impact,sans-serif;letter-spacing:.06em;background:none;border:0;color:inherit}
.links{display:flex;gap:28px}.links button{background:none;border:0;font-weight:600;padding:6px 0;position:relative}
.links button:after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:currentColor;transform:scaleX(0);transition:transform .3s var(--ease)}
.links button:hover:after,.links .on:after{transform:scaleX(1)}
.right{display:flex;justify-content:flex-end}.burger{display:none}
.mm{position:fixed;inset:64px 0 0;z-index:39;background:var(--warm);padding:20px 24px;display:grid;align-content:start;gap:4px}
.mm button{background:none;border:0;text-align:left;font:400 40px Anton,sans-serif;text-transform:uppercase;padding:10px 0;border-bottom:1px solid var(--soft)}
/* hero */
.hero{position:relative;min-height:100svh;background:var(--red);color:#fff;overflow:hidden;display:grid;align-content:center;padding:100px 0 60px}
.big{font:400 min(26vw,410px)/.9 Anton,Impact,sans-serif;letter-spacing:.005em;text-align:center;position:relative;z-index:1;user-select:none}
.hb{position:relative;z-index:3;display:flex;justify-content:space-between;align-items:end;gap:20px;flex-wrap:wrap;margin-top:40px}
.hb p{color:#fff;font:400 clamp(20px,3vw,32px) Anton,sans-serif;letter-spacing:.06em}
.hp{position:absolute;z-index:2;border:0;background:none;padding:0}
.hp .box{width:clamp(110px,15vw,210px);aspect-ratio:1;background:var(--warm);border-radius:14px;box-shadow:0 22px 34px -12px rgba(120,0,0,.55);overflow:hidden;position:relative;transition:box-shadow .3s,transform .35s var(--ease)}
.hp:hover .box{transform:translateY(-10px) scale(1.04);box-shadow:0 34px 44px -14px rgba(120,0,0,.6)}
.hp .lbl{position:absolute;left:8px;bottom:8px;background:var(--ink);color:#fff;font-size:12px;font-weight:600;padding:3px 10px;border-radius:99px;opacity:0;transform:translateY(6px);transition:all .25s}
.hp:hover .lbl,.hp:focus-visible .lbl{opacity:1;transform:none}
.hp1{left:5%;top:52%}.hp2{left:56%;top:11%}.hp3{right:5%;top:56%}
/* sections */
section{padding:90px 0}
.sh{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:36px;flex-wrap:wrap}
.trust{background:#fff;border-bottom:1px solid var(--soft);padding:22px 0}
.trust .wrap{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.trust b{display:block;font-size:14px}.trust span{font-size:13px;color:var(--mut)}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:28px 18px}
.card{position:relative}
.cimg{position:relative;aspect-ratio:1;background:#fff;border-radius:6px;overflow:hidden;width:100%;border:0;padding:0;display:block}
.cimg svg{width:100%;height:100%;display:block;transition:transform .6s var(--ease)}.card:hover .cimg svg{transform:scale(1.05)}
.qa{position:absolute;left:10px;right:10px;bottom:10px;padding:11px;background:var(--ink);color:#fff;border:0;border-radius:99px;font-weight:600;font-size:14px;opacity:0;transform:translateY(8px);transition:all .3s var(--ease)}
.card:hover .qa,.qa:focus-visible{opacity:1;transform:none}.qa:hover{background:var(--red)}
.wish{position:absolute;top:8px;right:8px;background:#fff;width:36px;height:36px;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,.08);z-index:2}
.wish[aria-pressed=true] svg{fill:var(--red);stroke:var(--red)}
.pill{position:absolute;top:10px;left:10px;background:var(--red);color:#fff;font-size:12px;font-weight:700;padding:3px 10px;border-radius:99px;z-index:2}.pill.n{background:var(--ink)}
.cinfo{padding:12px 2px 0}.cinfo small{color:var(--mut);font-size:13px}
.nm{display:block;background:none;border:0;padding:0;text-align:left;font-weight:600;font-size:15px}.nm:hover{color:var(--deep)}
.pr{font-weight:600;margin-top:2px}.pr s{color:var(--mut);font-weight:400;margin-left:6px}.pr .sale{color:var(--deep)}
.sw{display:flex;gap:8px;margin-top:8px}
.sw button{width:20px;height:20px;border-radius:50%;border:1px solid rgba(0,0,0,.18);padding:0;box-shadow:0 0 0 2px var(--warm);transition:transform .2s}
.sw button:hover{transform:scale(1.15)}.sw button[aria-pressed=true]{box-shadow:0 0 0 2px var(--warm),0 0 0 3.5px var(--ink)}
/* collections */
.cols{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.col{position:relative;min-height:440px;border-radius:10px;padding:24px;display:flex;flex-direction:column;justify-content:space-between;text-align:left;border:0;overflow:hidden;transition:transform .4s var(--ease)}
.col:hover{transform:translateY(-4px)}.col svg{position:absolute;right:-10%;bottom:-6%;width:85%;opacity:.95;transition:transform .5s var(--ease)}.col:hover svg{transform:scale(1.06) rotate(-2deg)}
.col span{position:relative;font-weight:600;font-size:14px}.col h3{position:relative;font-size:32px;max-width:200px}
/* editorial */
.ed{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:18px}
.story{background:#fff;border-radius:10px;padding:28px;min-height:260px;display:flex;flex-direction:column;justify-content:space-between;border:1px solid var(--soft)}
.story:first-child{background:var(--ink);color:#fff}.story:first-child p{color:#c9c5be}
.story small{font-weight:600;color:var(--deep)}.story:first-child small{color:var(--red)}
.story h3{font-size:28px;margin:10px 0}
.news{background:var(--red);color:#fff;text-align:center}.news p{color:#fff;margin:14px auto 28px;max-width:460px}
.nf{display:flex;gap:10px;max-width:480px;margin:0 auto}.nf input{flex:1;min-width:0;padding:14px 22px;border-radius:99px;border:0;color:var(--ink)}
/* shop */
.ph{padding:50px 0 24px;text-align:center}.ph p{max-width:520px;margin:12px auto 0}
.cats{display:flex;gap:8px;overflow-x:auto;padding:4px 0 16px;justify-content:center;flex-wrap:wrap}
.cats button,.chip{padding:9px 18px;border-radius:99px;border:1.5px solid var(--soft);background:#fff;font-weight:600;font-size:14px;white-space:nowrap;transition:all .2s}
.cats button:hover{border-color:var(--ink)}.cats .on{background:var(--ink);color:#fff;border-color:var(--ink)}
.bar{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 0;border-top:1px solid var(--soft);border-bottom:1px solid var(--soft);margin-bottom:28px;flex-wrap:wrap}
.bar select,.sin{padding:10px 16px;border-radius:99px;border:1.5px solid var(--soft);background:#fff}
.sin{min-width:0;flex:1;max-width:280px}
.shop{display:grid;grid-template-columns:240px 1fr;gap:40px;align-items:start}
.side{position:sticky;top:84px;max-height:calc(100vh - 100px);overflow:auto}
.side fieldset{border:0;border-top:1px solid var(--soft);padding:16px 0}.side legend{font-weight:700;padding:0;float:left;width:100%;margin-bottom:10px}
.side label{display:flex;gap:10px;align-items:center;padding:4px 0;cursor:pointer;clear:both}.side input{accent-color:var(--red);width:17px;height:17px}
.fb{display:none}.chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}.chip{padding:6px 14px;font-size:13px}.chip:hover{border-color:var(--red)}
.none{text-align:center;padding:70px 0}.none h3{margin-bottom:10px}.none .btn{margin-top:18px}
/* overlays */
.ov{position:fixed;inset:0;background:rgba(23,23,23,.5);z-index:60}
.modal{position:fixed;z-index:61;left:50%;top:50%;translate:-50% -50%;width:min(880px,94vw);max-height:92vh;overflow:auto;background:var(--warm);border-radius:14px;display:grid;grid-template-columns:1fr 1fr}
.modal.sm{grid-template-columns:1fr;width:min(420px,94vw);padding:32px}
.modal .x{position:absolute;top:10px;right:10px;z-index:3;background:#fff}
.mi{background:#fff;aspect-ratio:1}.mi svg{width:100%;height:100%}.mb{padding:32px}
.drawer{position:fixed;z-index:61;top:0;right:0;bottom:0;width:min(440px,100vw);background:var(--warm);display:flex;flex-direction:column}
.dh{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid var(--soft)}
.db{flex:1;overflow:auto;padding:8px 20px}.df{padding:18px 20px;border-top:1px solid var(--soft);background:#fff}
.li{display:grid;grid-template-columns:84px 1fr;gap:14px;padding:16px 0;border-bottom:1px solid var(--soft)}
.li .t{width:84px;height:84px;background:#fff;border-radius:6px;overflow:hidden}.li .t svg{width:100%;height:100%}
.li small{color:var(--mut)}.rm{background:none;border:0;color:var(--mut);text-decoration:underline;font-size:13px;padding:0}.rm:hover{color:var(--deep)}
.lr{display:flex;justify-content:space-between;align-items:center;margin-top:8px}
.qty{display:inline-flex;align-items:center;border:1.5px solid var(--soft);border-radius:99px;background:#fff}.qty button{width:38px;height:38px;border:0;background:none;font-size:18px;border-radius:50%}.qty button:hover{color:var(--red)}.qty span{min-width:24px;text-align:center;font-weight:600}
.ship{height:6px;background:var(--soft);border-radius:9px;margin:8px 0 16px;overflow:hidden}.ship i{display:block;height:100%;background:var(--red);transition:width .5s var(--ease)}
.empty{text-align:center;padding:70px 10px}.empty h3{margin-bottom:10px}.empty .btn{margin-top:20px}
.srch{position:fixed;z-index:61;top:0;left:0;right:0;background:var(--warm);padding:20px 0 30px;max-height:90vh;overflow:auto}
.srch input{width:100%;padding:16px 22px;border-radius:99px;border:1.5px solid var(--ink);font-size:18px;background:#fff}
.sr{display:flex;gap:14px;align-items:center;width:100%;background:none;border:0;padding:10px 0;text-align:left;border-bottom:1px solid var(--soft)}.sr .t{width:56px;height:56px;background:#fff;border-radius:6px;overflow:hidden;flex:none}
/* options + pdp */
.opt h4{font-size:14px;margin:18px 0 8px;display:flex;justify-content:space-between}.opt h4 span{font-weight:400;color:var(--mut)}
.osw{display:flex;gap:10px;flex-wrap:wrap}.osw button{width:38px;height:38px;border-radius:50%;border:1px solid rgba(0,0,0,.2);box-shadow:0 0 0 3px var(--warm)}.osw button[aria-pressed=true]{box-shadow:0 0 0 3px var(--warm),0 0 0 5px var(--ink)}
.osz{display:flex;gap:8px;flex-wrap:wrap}.osz button{min-width:64px;padding:11px 14px;border-radius:10px;border:1.5px solid var(--soft);background:#fff;font-weight:600}.osz button:hover{border-color:var(--ink)}.osz button[aria-pressed=true]{background:var(--ink);color:#fff;border-color:var(--ink)}
.hint{font-size:13px;color:var(--deep);margin-top:10px;min-height:20px}
.pdp{display:grid;grid-template-columns:1.15fr 1fr;gap:56px;padding:36px 0 70px;align-items:start}
.gal{display:grid;grid-template-columns:80px 1fr;gap:12px;position:sticky;top:84px}
.thumbs{display:grid;gap:10px;align-content:start}.thumbs button{padding:0;border:1.5px solid transparent;border-radius:6px;overflow:hidden;background:#fff;aspect-ratio:1}.thumbs button[aria-pressed=true]{border-color:var(--ink)}.thumbs svg{width:100%;height:100%;display:block}
.main{background:#fff;border-radius:8px;aspect-ratio:1;overflow:hidden}.main svg{width:100%;height:100%}
.crumb{font-size:13px;color:var(--mut);padding-top:24px}.crumb button{background:none;border:0;color:inherit;text-decoration:underline;padding:0}
.pdp h1{font-size:clamp(34px,4.4vw,52px);margin:8px 0}.big-pr{font-size:26px;font-weight:600}
.stars{color:var(--red);letter-spacing:2px}
.acts{display:grid;grid-template-columns:auto 1fr auto;gap:10px;margin-top:22px;align-items:center}
.pol{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:22px 0;font-size:13px}.pol div{background:#fff;border-radius:8px;padding:12px}
.acc{border-top:1px solid var(--soft)}.acc button{width:100%;display:flex;justify-content:space-between;background:none;border:0;padding:16px 0;font-weight:700;text-align:left}.acc p{padding-bottom:16px}
.rev{background:#fff;padding:60px 0}.rev .wrap{display:grid;grid-template-columns:1fr 2fr;gap:50px}
.rc{padding:18px 0;border-top:1px solid var(--soft)}.rc b{display:block}
.fld{display:grid;gap:12px;margin-bottom:28px}.fld h3{margin-bottom:4px}.fld .r{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.fld input{width:100%;padding:14px 16px;border:1.5px solid var(--soft);border-radius:10px;background:#fff}.fld input:focus{outline:none;border-color:var(--ink)}
.co{display:grid;grid-template-columns:1.3fr 1fr;gap:56px;padding:40px 0 80px;align-items:start}
.sum{background:#fff;border-radius:12px;padding:24px;position:sticky;top:84px}.sum .lr{margin:10px 0}
.conf{max-width:560px;margin:80px auto;text-align:center}.conf h2{margin-bottom:16px}
.ab{max-width:720px;margin:0 auto;padding:70px 24px 90px}.ab p{margin:18px 0;font-size:18px;color:var(--ink)}
.foot{background:var(--ink);color:#fff;padding:60px 0 30px}.foot p{color:#b9b5ae}
.fg{display:grid;grid-template-columns:1.6fr repeat(3,1fr);gap:30px}.fg button{display:block;background:none;border:0;color:#b9b5ae;padding:4px 0;text-align:left}.fg button:hover{color:#fff}.fg h4{margin-bottom:10px}
.disc{margin-top:40px;padding-top:20px;border-top:1px solid #333;font-size:12px;color:#8d8983}
.toast{position:fixed;bottom:24px;left:50%;translate:-50% 0;z-index:80;background:var(--ink);color:#fff;padding:13px 22px;border-radius:99px;font-size:14px;max-width:92vw}
@media(max-width:1100px){.grid{grid-template-columns:repeat(3,1fr)}.cols{grid-template-columns:1fr 1fr}.pdp{gap:32px}}
@media(max-width:900px){
 .links{display:none}.burger{display:grid}.ni{grid-template-columns:1fr auto 1fr}.ni .l{display:flex}
 .shop{grid-template-columns:1fr}.fb{display:inline-flex}
 .side{display:none;position:fixed;inset:auto 0 0 0;z-index:62;max-height:82vh;background:var(--warm);padding:20px 24px 90px;border-radius:18px 18px 0 0;top:auto}.side.open{display:block}
 .sbtn{position:fixed;z-index:63;bottom:16px;left:24px;right:24px}
 .pdp,.co{grid-template-columns:1fr}.gal{position:static;grid-template-columns:1fr}.thumbs{grid-auto-flow:column;grid-auto-columns:64px;order:2}
 .ed{grid-template-columns:1fr}.rev .wrap{grid-template-columns:1fr}.sum{position:static;order:-1}
 .modal{grid-template-columns:1fr}.mi{aspect-ratio:4/3}
}
@media(max-width:640px){
 section{padding:60px 0}.wrap{padding:0 16px}.grid{grid-template-columns:repeat(2,1fr);gap:22px 12px}
 .trust .wrap{grid-template-columns:1fr 1fr}.cols{grid-template-columns:1fr}.col{min-height:280px}
 .hero{padding-top:90px}.hp1{left:2%;top:46%}.hp2{left:50%;top:14%}.hp3{right:2%;top:60%}.hb{margin-top:150px}
 .hp .lbl,.qa{opacity:1;transform:none}.qa{padding:8px;font-size:13px}
 .fg{grid-template-columns:1fr 1fr}.fg>:first-child{grid-column:span 2}.fld .r{grid-template-columns:1fr}
 .acts{grid-template-columns:1fr auto}.acts .qty{grid-column:span 2;justify-self:start}.mb{padding:22px}
 .nf{flex-direction:column}.pol{grid-template-columns:1fr}
}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{transition:none!important}}
`;

/* ---------- data ---------- */
const HEX = { Cloud: "#EDEAE3", Stone: "#BDB6A9", Charcoal: "#3A3A3C", Red: "#E62E2E", Sage: "#A9B5A0", Sand: "#D9C3A0" };
const RAW = [
  ["sig", "Signature Sheet Set", "Sheet sets", 128, 0, "Cloud,Stone,Charcoal,Red", "Cotton percale", 400, 1, "everyday,neutrals"],
  ["sat", "Sateen Sheet Set", "Sheet sets", 148, 118, "Cloud,Sage,Sand", "Cotton sateen", 500, 0, "neutrals"],
  ["lin", "Washed Linen Sheet Set", "Sheet sets", 178, 0, "Stone,Sage,Sand", "Linen", 0, 1, "light,neutrals"],
  ["duv", "Everyday Duvet Cover", "Duvet covers", 138, 0, "Cloud,Stone,Charcoal", "Cotton percale", 300, 0, "everyday"],
  ["rdv", "Bedroom Red Duvet Cover", "Duvet covers", 158, 0, "Red,Cloud", "Cotton sateen", 400, 1, "red"],
  ["pil", "Percale Pillowcase Pair", "Pillowcases", 38, 0, "Cloud,Stone,Charcoal,Red", "Cotton percale", 300, 0, "everyday,red"],
  ["pls", "Sateen Pillowcase Pair", "Pillowcases", 46, 36, "Cloud,Sand,Red", "Cotton sateen", 500, 0, "neutrals"],
  ["blk", "Merino Blanket", "Blankets", 168, 0, "Stone,Charcoal,Red", "Merino wool", 0, 0, "red"],
  ["thr", "Lightweight Cotton Throw", "Blankets", 78, 0, "Cloud,Sage,Sand", "Cotton", 0, 1, "light,neutrals"],
  ["qlt", "Diamond Quilt", "Quilts", 198, 168, "Cloud,Charcoal,Red", "Cotton", 0, 0, "everyday,red"],
  ["bed", "Matelassé Bedspread", "Bedspreads", 218, 0, "Cloud,Stone", "Cotton", 0, 0, "light,neutrals"],
  ["top", "Cooling Mattress Topper", "Mattress toppers", 208, 0, "Cloud", "Fiber fill", 0, 0, "everyday"],
];
const PRODUCTS = RAW.map(([id, name, cat, price, sale, colors, mat, tc, nw, cols]) => ({ id, name, cat, price, sale, colors: colors.split(","), mat, tc, nw, cols: cols.split(",") }));
const CATS = ["Sheet sets", "Duvet covers", "Pillowcases", "Blankets", "Quilts", "Bedspreads", "Mattress toppers"];
const sizesOf = (c) => (c === "Pillowcases" ? ["Standard", "King"] : c === "Blankets" ? ["Throw", "Queen", "King"] : ["Twin", "Full", "Queen", "King"]);
const PRICES = [["Under $50", 0, 50], ["$50 – $150", 50, 150], ["Over $150", 150, 1e9]];
const TCS = [["300 – 399", 300, 399], ["400 – 499", 400, 499], ["500 and up", 500, 9999]];
const FGROUPS = [["cat", "Category", CATS], ["color", "Color", Object.keys(HEX)], ["size", "Size", ["Twin", "Full", "Queen", "King", "Standard", "Throw"]], ["mat", "Material", ["Cotton percale", "Cotton sateen", "Cotton", "Linen", "Merino wool", "Fiber fill"]], ["price", "Price", PRICES.map((x) => x[0])], ["tc", "Thread count", TCS.map((x) => x[0])]];
const COLL = [["everyday", "The Everyday Edit", "#E7E3DC", "#171717"], ["neutrals", "Soft Neutrals", "#EDEAE3", "#77736D"], ["red", "Bedroom Red", "#FF3030", "#FFFFFF"], ["light", "Lightweight Layers", "#A9B5A0", "#F8F6F1"]];
const eff = (p) => p.sale || p.price;
const $ = (n) => "$" + n.toFixed(2).replace(/\.00$/, "");
const EMPTY = { cat: [], color: [], size: [], mat: [], price: [], tc: [], q: "", coll: "", sort: "rec" };

function applyF(f) {
  let r = PRODUCTS.filter((p) => {
    const q = f.q.trim().toLowerCase();
    if (q && !(p.name + p.cat + p.mat).toLowerCase().includes(q)) return false;
    if (f.coll && !p.cols.includes(f.coll)) return false;
    if (f.cat.length && !f.cat.includes(p.cat)) return false;
    if (f.color.length && !p.colors.some((c) => f.color.includes(c))) return false;
    if (f.size.length && !sizesOf(p.cat).some((s) => f.size.includes(s))) return false;
    if (f.mat.length && !f.mat.includes(p.mat)) return false;
    if (f.price.length && !PRICES.some(([l, a, b]) => f.price.includes(l) && eff(p) >= a && eff(p) < b)) return false;
    if (f.tc.length && !TCS.some(([l, a, b]) => f.tc.includes(l) && p.tc >= a && p.tc <= b)) return false;
    return true;
  });
  if (f.sort === "new") r = [...r].sort((a, b) => b.nw - a.nw);
  if (f.sort === "lo") r = [...r].sort((a, b) => eff(a) - eff(b));
  if (f.sort === "hi") r = [...r].sort((a, b) => eff(b) - eff(a));
  return r;
}

/* ---------- visuals ---------- */
const Ic = ({ d }) => <svg viewBox="0 0 24 24" aria-hidden="true" className="ic"><path d={d} /></svg>;
const ICON = { search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3", user: "M20 21a8 8 0 0 0-16 0M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", bag: "M5 8h14l1 13H4L5 8zM8 8a4 4 0 0 1 8 0", heart: "M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z", x: "M5 5l14 14M19 5L5 19", menu: "M4 7h16M4 17h16" };
const IB = ({ n, label, onClick, children, ...r }) => <button className="ib" aria-label={label} onClick={onClick} {...r}><Ic d={ICON[n]} />{children}</button>;

function Art({ cat, color = "Cloud", view = 0 }) {
  const c = HEX[color] || color, s = "rgba(0,0,0,.09)", l = "rgba(0,0,0,.14)";
  const bg = view === 3 ? "#EFEBE3" : "#FBFAF7";
  const body = {
    "Sheet sets": <><rect x="30" y="128" width="140" height="30" rx="7" fill={c} /><rect x="38" y="98" width="124" height="32" rx="7" fill={c} /><rect x="46" y="68" width="108" height="32" rx="7" fill={c} /><path d="M38 128h124M46 98h108M30 143h140" stroke={l} /><rect x="30" y="150" width="140" height="8" rx="4" fill={s} /></>,
    "Duvet covers": <><rect x="26" y="52" width="148" height="110" rx="14" fill={c} /><path d="M26 92h148M26 128h148M76 52v110M124 52v110" stroke={l} strokeDasharray="4 4" /><rect x="26" y="52" width="148" height="22" rx="11" fill={s} /></>,
    Pillowcases: <><path d="M20 70q40-16 80 0v70q-40 14-80 0z" fill={c} /><path d="M78 92q40-16 80 0v70q-40 14-80 0z" fill={c} /><path d="M78 92q40-16 80 0v14q-40-14-80 0z" fill={s} /><path d="M28 78q32-9 64 0" stroke={l} fill="none" /></>,
    Blankets: <><rect x="28" y="70" width="144" height="72" rx="6" fill={c} /><path d="M28 94h144M28 118h144" stroke={l} strokeWidth="6" /><path d="M172 76v60M28 76v60" stroke={l} strokeWidth="6" strokeDasharray="2 3" /><rect x="28" y="130" width="144" height="12" fill={s} /></>,
    Quilts: <><rect x="26" y="44" width="148" height="120" rx="8" fill={c} /><path d="M26 44l148 120M26 84l108 80M26 124l68 40M66 44l108 92M106 44l68 56M146 44l28 24M174 44L26 164M174 84L66 164M174 124l-68 40M134 44L26 132M94 44L26 100M54 44L26 68" stroke={l} /></>,
    Bedspreads: <><rect x="20" y="70" width="160" height="50" rx="8" fill={c} /><path d="M20 120h160v42q-20 6-40 0t-40 0-40 0-40 0z" fill={c} /><path d="M20 120h160" stroke={l} /><circle cx="60" cy="95" r="10" fill="none" stroke={l} /><circle cx="100" cy="95" r="10" fill="none" stroke={l} /><circle cx="140" cy="95" r="10" fill="none" stroke={l} /></>,
    "Mattress toppers": <><rect x="26" y="90" width="148" height="52" rx="10" fill={c} /><rect x="26" y="126" width="148" height="16" rx="8" fill={s} /><path d="M46 90v36M76 90v36M106 90v36M136 90v36M160 90v36" stroke={l} /></>,
  }[cat];
  const t = view === 1 ? "translate(-70 -80) scale(1.7)" : view === 2 ? "rotate(-9 100 100) scale(.92) translate(8 8)" : view === 3 ? "translate(20 22) scale(.8)" : "";
  return <svg viewBox="0 0 200 200" role="img" aria-label={color + " " + cat}><rect width="200" height="200" fill={bg} /><g transform={t}>{body}</g></svg>;
}

/* ---------- shared ---------- */
function Modal({ onClose, children, sm, label }) {
  return (
    <>
      <motion.div className="ov" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.div className={"modal" + (sm ? " sm" : "")} role="dialog" aria-modal="true" aria-label={label} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
        <IB n="x" label="Close" className="ib x" onClick={onClose} />{children}
      </motion.div>
    </>
  );
}
const Price = ({ p, big }) => <div className={big ? "big-pr" : "pr"}>{p.sale ? <><span className="sale">{$(p.sale)}</span><s>{$(p.price)}</s></> : $(p.price)}</div>;

function Opts({ p, st, set, onAdd }) {
  const ok = st.color && st.size;
  return (
    <div className="opt">
      <h4>Color <span>{st.color || "Select"}</span></h4>
      <div className="osw" role="group" aria-label="Color">{p.colors.map((c) => <button key={c} aria-label={c} aria-pressed={st.color === c} style={{ background: HEX[c] }} onClick={() => set({ ...st, color: c })} />)}</div>
      <h4>Size <span>{st.size || "Select"}</span></h4>
      <div className="osz" role="group" aria-label="Size">{sizesOf(p.cat).map((s) => <button key={s} aria-pressed={st.size === s} onClick={() => set({ ...st, size: s })}>{s}</button>)}</div>
      <div className="acts">
        <div className="qty"><button aria-label="Decrease quantity" onClick={() => set({ ...st, qty: Math.max(1, st.qty - 1) })}>−</button><span aria-live="polite">{st.qty}</span><button aria-label="Increase quantity" onClick={() => set({ ...st, qty: Math.min(9, st.qty + 1) })}>+</button></div>
        <button className="btn" disabled={!ok} onClick={onAdd}>Add to bag · {$(eff(p) * st.qty)}</button>
        {st.wish}
      </div>
      <p className="hint" role="status">{!ok && (st.color ? "Select a size to continue." : st.size ? "Select a color to continue." : "Select a color and size to add this to your bag.")}</p>
    </div>
  );
}

function Card({ p, wish, onWish, onQuick, onOpen, delay = 0 }) {
  const [c, setC] = useState(p.colors[0]);
  const rm = useReducedMotion();
  return (
    <motion.article layout={!rm} className="card" initial={rm ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay }}>
      {p.sale ? <span className="pill">Sale</span> : p.nw ? <span className="pill n">New</span> : null}
      <button className="ib wish" aria-label={"Wishlist " + p.name} aria-pressed={wish} onClick={onWish}><Ic d={ICON.heart} /></button>
      <button className="cimg" aria-label={"View " + p.name} onClick={() => onOpen(p.id)}><Art cat={p.cat} color={c} /></button>
      <button className="qa" onClick={() => onQuick(p.id, c)}>Quick add</button>
      <div className="cinfo">
        <small>{p.cat}</small>
        <button className="nm" onClick={() => onOpen(p.id)}>{p.name}</button>
        <Price p={p} />
        <div className="sw" role="group" aria-label="Colors">{p.colors.map((k) => <button key={k} aria-label={k} aria-pressed={c === k} style={{ background: HEX[k] }} onClick={() => setC(k)} />)}</div>
      </div>
    </motion.article>
  );
}

/* ---------- pages ---------- */
function Hero({ onQuick, onShop, onColl }) {
  const rm = useReducedMotion();
  const drops = [["hp1", "sig", "Cloud", -8, 0.4], ["hp2", "rdv", "Cloud", 9, 0.7], ["hp3", "pil", "Stone", -5, 1]];
  return (
    <section className="hero" style={{ padding: undefined }}>
      <div className="wrap" style={{ width: "100%" }}>
        <h1 className="big">HAWKIJI</h1>
        <div className="hb"><p>Sleep, with character.</p><div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><button className="btn w" onClick={onShop}>Shop bedding</button><button className="btn o" style={{ color: "#fff", borderColor: "#fff" }} onClick={onColl}>Explore collections</button></div></div>
      </div>
      {drops.map(([cls, id, col, rot, d], i) => {
        const p = PRODUCTS.find((x) => x.id === id);
        return (
          <motion.div key={id} className={"hp " + cls} style={{ position: "absolute" }} initial={rm ? false : { y: -520, opacity: 0, rotate: rot * 3 }} animate={{ y: 0, opacity: 1, rotate: rot }} transition={{ type: "spring", stiffness: 60, damping: 17, mass: 1.2, delay: d }}>
            <motion.button className="hp" style={{ position: "relative" }} aria-label={"Quick view " + p.name} onClick={() => onQuick(id, col)} animate={rm ? {} : { y: [0, -6, 0] }} transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
              <div className="box"><Art cat={p.cat} color={col} /><span className="lbl">{p.name}</span></div>
            </motion.button>
          </motion.div>
        );
      })}
    </section>
  );
}

function Home({ go, onQuick, wish, onWish, news }) {
  const [em, setEm] = useState(""), [done, setDone] = useState(false);
  const arr = PRODUCTS.filter((p) => p.nw).slice(0, 4);
  return (
    <>
      <Hero onQuick={onQuick} onShop={() => go("shop", { f: EMPTY })} onColl={() => document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" })} />
      <div className="trust"><div className="wrap">{[["Free shipping over $120", "Concept store policy"], ["30-day returns", "Concept store policy"], ["Secure checkout", "Demo only, no payments"], ["Carefully selected materials", "Cotton, linen, merino"]].map(([a, b]) => <div key={a}><b>{a}</b><span>{b}</span></div>)}</div></div>
      <section><div className="wrap">
        <div className="sh"><h2>New arrivals</h2><button className="btn o" onClick={() => go("shop", { f: { ...EMPTY, sort: "new" } })}>Shop all</button></div>
        <div className="grid">{arr.map((p) => <Card key={p.id} p={p} wish={wish.includes(p.id)} onWish={() => onWish(p.id)} onQuick={onQuick} onOpen={(id) => go("pdp", { id })} />)}</div>
      </div></section>
      <section id="collections" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sh"><h2>Collections</h2></div>
        <div className="cols">{COLL.map(([k, n, bg, fg], i) => (
          <button key={k} className="col" style={{ background: bg, color: fg }} onClick={() => go("shop", { f: { ...EMPTY, coll: k } })}>
            <h3>{n}</h3><span>{PRODUCTS.filter((p) => p.cols.includes(k)).length} products · Shop collection</span>
            <Art2 cat={["Duvet covers", "Sheet sets", "Pillowcases", "Blankets"][i]} k={k} />
          </button>))}</div>
      </div></section>
      <section style={{ paddingTop: 0 }}><div className="wrap">
        <div className="sh"><h2>From the bedroom</h2></div>
        <div className="ed">
          {[["Materials", "Percale, sateen, linen: which feels right?", "Percale is crisp and airy, sateen is smooth and drapey, linen relaxes with every wash. Start with how you sleep."], ["Color", "Using red with restraint", "One saturated pillowcase pair against soft neutrals is enough to give a bed a point of view."], ["Styling", "Layer a bed in five minutes", "Fitted sheet, flat sheet, duvet, then one throw folded at the foot. Done."]].map(([t, h, b]) => <article className="story" key={h}><div><small>{t}</small><h3>{h}</h3></div><p>{b}</p></article>)}
        </div>
      </div></section>
      <section className="news"><div className="wrap">
        <h2>The Bedroom Edit</h2><p>New drops and styling notes, occasionally. Demo form: nothing is sent.</p>
        {done ? <p role="status" style={{ fontWeight: 700, fontSize: 18 }}>Thanks — you're on the list.</p> : <form className="nf" onSubmit={(e) => { e.preventDefault(); setDone(true); news(); }}><label className="ib" style={{ display: "none" }} htmlFor="em">Email</label><input id="em" type="email" required placeholder="Email address" value={em} onChange={(e) => setEm(e.target.value)} /><button className="btn">Join</button></form>}
      </div></section>
    </>
  );
}
const Art2 = ({ cat, k }) => <div aria-hidden="true" style={{ position: "absolute", right: "-8%", bottom: "-4%", width: "85%", opacity: 0.95 }}><Art cat={cat} color={k === "red" ? "Red" : k === "light" ? "Cloud" : "Stone"} /></div>;

function Shop({ f, setF, go, onQuick, wish, onWish }) {
  const [fo, setFo] = useState(false);
  const list = useMemo(() => applyF(f), [f]);
  const toggle = (g, v) => setF({ ...f, [g]: f[g].includes(v) ? f[g].filter((x) => x !== v) : [...f[g], v] });
  const active = [...FGROUPS.flatMap(([g]) => f[g].map((v) => [g, v])), ...(f.coll ? [["coll", COLL.find((c) => c[0] === f.coll)[1]]] : []), ...(f.q ? [["q", `“${f.q}”`]] : [])];
  const clear = () => setF({ ...EMPTY, sort: f.sort });
  const title = f.coll ? COLL.find((c) => c[0] === f.coll)[1] : "Shop all bedding";
  return (
    <div className="wrap">
      <div className="ph"><h1 style={{ fontSize: "clamp(40px,7vw,80px)" }}>{title}</h1><p>Sheets, duvets, pillowcases, blankets and more. Sample catalog for a concept store.</p></div>
      <div className="cats" role="group" aria-label="Categories"><button className={!f.cat.length ? "on" : ""} onClick={() => setF({ ...f, cat: [] })}>All</button>{CATS.map((c) => <button key={c} className={f.cat.length === 1 && f.cat[0] === c ? "on" : ""} onClick={() => setF({ ...f, cat: [c] })}>{c}</button>)}</div>
      <div className="bar">
        <input className="sin" aria-label="Search products" type="search" placeholder="Search name, category, material" value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} />
        <button className="btn o fb" onClick={() => setFo(true)}>Filters{active.length ? ` (${active.length})` : ""}</button>
        <span role="status"><b>{list.length}</b> {list.length === 1 ? "product" : "products"}</span>
        <label>Sort <select value={f.sort} onChange={(e) => setF({ ...f, sort: e.target.value })}><option value="rec">Recommended</option><option value="new">Newest</option><option value="lo">Price: Low to High</option><option value="hi">Price: High to Low</option></select></label>
      </div>
      <div className="shop">
        <aside className={"side" + (fo ? " open" : "")} aria-label="Filters">
          {FGROUPS.map(([g, n, opts]) => <fieldset key={g}><legend>{n}</legend>{opts.map((o) => <label key={o}><input type="checkbox" checked={f[g].includes(o)} onChange={() => toggle(g, o)} />{o}</label>)}</fieldset>)}
          {fo && <button className="btn sbtn" onClick={() => setFo(false)}>Show {list.length} products</button>}
        </aside>
        <div>
          {active.length > 0 && <div className="chips">{active.map(([g, v]) => <button key={g + v} className="chip" onClick={() => (g === "coll" ? setF({ ...f, coll: "" }) : g === "q" ? setF({ ...f, q: "" }) : toggle(g, v))}>{v} ✕</button>)}<button className="chip" onClick={clear}>Clear all</button></div>}
          {list.length ? <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))" }}><AnimatePresence>{list.map((p) => <Card key={p.id} p={p} wish={wish.includes(p.id)} onWish={() => onWish(p.id)} onQuick={onQuick} onOpen={(id) => go("pdp", { id })} />)}</AnimatePresence></div>
            : <div className="none"><h3>No products found</h3><p>Try removing a filter or searching for something else.</p><button className="btn" onClick={clear}>Clear search and filters</button></div>}
        </div>
      </div>
    </div>
  );
}

function PDP({ id, go, add, wish, onWish, onQuick }) {
  const p = PRODUCTS.find((x) => x.id === id);
  const [st, setSt] = useState({ color: "", size: "", qty: 1 }), [v, setV] = useState(0), [ac, setAc] = useState(0);
  useEffect(() => { setSt({ color: "", size: "", qty: 1 }); setV(0); }, [id]);
  const col = st.color || p.colors[0];
  const info = [["Details", `${p.name} is part of the HAWKIJI concept range: modern, minimal and made to be lived in. Sample product description for the portfolio concept.`], ["Materials", `${p.mat}${p.tc ? `, ${p.tc} thread count` : ""}. Carefully selected materials (concept description).`], ["Care", "Machine wash cold with similar colors. Tumble dry low. Warm iron if needed. Do not bleach."], ["Shipping & Returns", "Free shipping over $120. 30-day returns. These are concept store policies and no orders are shipped."]];
  const rel = PRODUCTS.filter((x) => x.cat !== p.cat).slice(0, 4);
  return (
    <>
      <div className="wrap">
        <p className="crumb"><button onClick={() => go("home")}>Home</button> / <button onClick={() => go("shop", { f: { ...EMPTY, cat: [p.cat] } })}>{p.cat}</button> / {p.name}</p>
        <div className="pdp">
          <div className="gal">
            <div className="thumbs">{[0, 1, 2, 3].map((i) => <button key={i} aria-label={"Image " + (i + 1)} aria-pressed={v === i} onClick={() => setV(i)}><Art cat={p.cat} color={col} view={i} /></button>)}</div>
            <div className="main"><AnimatePresence mode="wait"><motion.div key={v + col} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} style={{ height: "100%" }}><Art cat={p.cat} color={col} view={v} /></motion.div></AnimatePresence></div>
          </div>
          <div>
            <h1>{p.name}</h1><Price p={p} big />
            <p><span className="stars" aria-hidden="true">★★★★★</span> Concept product rating</p>
            <Opts p={p} st={{ ...st, wish: <button className="ib" aria-pressed={wish.includes(p.id)} aria-label="Toggle wishlist" style={{ border: "1.5px solid var(--soft)", background: wish.includes(p.id) ? "var(--red)" : "#fff", color: wish.includes(p.id) ? "#fff" : "inherit" }} onClick={() => onWish(p.id)}><Ic d={ICON.heart} /></button> }} set={(s) => setSt({ color: s.color, size: s.size, qty: s.qty })} onAdd={() => add(p, st.color, st.size, st.qty)} />
            <div className="pol"><div><b>Free shipping over $120</b><br />Concept policy</div><div><b>30-day returns</b><br />Concept policy</div></div>
            {info.map(([t, b], i) => <div className="acc" key={t}><button aria-expanded={ac === i} onClick={() => setAc(ac === i ? -1 : i)}>{t}<span>{ac === i ? "−" : "+"}</span></button>{ac === i && <p>{b}</p>}</div>)}
          </div>
        </div>
      </div>
      <div className="rev"><div className="wrap">
        <div><h2 style={{ fontSize: 36 }}>Reviews</h2><p style={{ marginTop: 10 }}>Sample / concept data. These are placeholder entries that demonstrate the review interface.</p></div>
        <div>{["Sample review: soft and crisp", "Sample review: holds its color"].map((t, i) => <div className="rc" key={t}><span className="stars">{"★".repeat(5 - i)}</span><b>{t}</b><p>Placeholder text showing how a written review would appear on the product page.</p></div>)}</div>
      </div></div>
      <section><div className="wrap"><div className="sh"><h2>Complete the bed</h2></div><div className="grid">{rel.map((x) => <Card key={x.id} p={x} wish={wish.includes(x.id)} onWish={() => onWish(x.id)} onQuick={onQuick} onOpen={(i) => go("pdp", { id: i })} />)}</div></div></section>
    </>
  );
}

function Checkout({ cart, go, done, setDone }) {
  const rows = cart.map((i) => ({ ...i, p: PRODUCTS.find((x) => x.id === i.id) }));
  const sub = rows.reduce((a, r) => a + eff(r.p) * r.qty, 0), ship = sub >= 120 || !sub ? 0 : 9;
  const F = ({ id, l, ...r }) => <div><label htmlFor={id} style={{ display: "none" }}>{l}</label><input id={id} placeholder={l} autoComplete="off" required {...r} /></div>;
  if (done) return <div className="conf wrap"><h2>Checkout preview complete</h2><p>Checkout preview complete — this is a portfolio concept and no payment was processed.</p><button className="btn" style={{ marginTop: 24 }} onClick={() => { setDone(false); go("shop", { f: EMPTY }); }}>Back to shop</button></div>;
  if (!rows.length) return <div className="empty wrap"><h3>Your bag is empty</h3><p>Add something to preview checkout.</p><button className="btn" onClick={() => go("shop", { f: EMPTY })}>Shop bedding</button></div>;
  return (
    <div className="wrap co">
      <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
        <h1 style={{ fontSize: 48, marginBottom: 24 }}>Checkout preview</h1>
        <div className="fld"><h3>Contact</h3><F id="ce" l="Email" type="email" /></div>
        <div className="fld"><h3>Shipping</h3><div className="r"><F id="fn" l="First name" /><F id="ln" l="Last name" /></div><F id="ad" l="Address" /><div className="r"><F id="ci" l="City" /><F id="zp" l="Postal code" /></div></div>
        <div className="fld"><h3>Payment</h3><p style={{ fontSize: 13 }}>Demo only. Do not enter real card details; nothing is collected or sent.</p><F id="cn" l="Card number (demo)" inputMode="numeric" /><div className="r"><F id="ex" l="MM / YY" /><F id="cv" l="CVC" /></div></div>
        <button className="btn full">Place demo order · {$(sub + ship)}</button>
      </form>
      <aside className="sum" aria-label="Order summary"><h3 style={{ marginBottom: 12 }}>Order summary</h3>
        {rows.map((r) => <div className="lr" key={r.key}><span>{r.qty} × {r.p.name}<br /><small style={{ color: "var(--mut)" }}>{r.color} / {r.size}</small></span><b>{$(eff(r.p) * r.qty)}</b></div>)}
        <hr style={{ border: 0, borderTop: "1px solid var(--soft)", margin: "14px 0" }} />
        <div className="lr"><span>Subtotal</span><b>{$(sub)}</b></div><div className="lr"><span>Shipping</span><b>{ship ? $(ship) : "Free"}</b></div><div className="lr"><b>Total</b><b>{$(sub + ship)}</b></div>
      </aside>
    </div>
  );
}

const About = ({ go }) => <div className="ab"><h1 style={{ fontSize: 72 }}>About HAWKIJI</h1><p>HAWKIJI is a fictional bedding and home textiles brand: modern, bold, minimal and warm. Sleep, with character.</p><p>This site is a self-initiated ecommerce concept by Ralph Jay Guevarra. Products, prices, reviews and checkout are sample data built to demonstrate a complete shopping experience.</p><button className="btn" onClick={() => go("shop", { f: EMPTY })}>Shop bedding</button></div>;

/* ---------- app ---------- */
export default function App() {
  const [view, setView] = useState({ n: "home" }), [f, setF] = useState(EMPTY), [cart, setCart] = useState([]), [wish, setWish] = useState([]);
  const [drawer, setDrawer] = useState(false), [quick, setQuick] = useState(null), [qs, setQs] = useState({ color: "", size: "", qty: 1 });
  const [srch, setSrch] = useState(false), [q, setQ] = useState(""), [acct, setAcct] = useState(false), [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false), [toast, setToast] = useState(""), [done, setDone] = useState(false);
  const flash = (m) => { setToast(m); setTimeout(() => setToast(""), 2600); };
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40), k = (e) => e.key === "Escape" && (setDrawer(false), setQuick(null), setSrch(false), setAcct(false), setMenu(false));
    s(); window.addEventListener("scroll", s, { passive: true }); window.addEventListener("keydown", k);
    return () => { window.removeEventListener("scroll", s); window.removeEventListener("keydown", k); };
  }, []);
  const go = (n, o = {}) => { if (o.f) setF(o.f); setView({ n, id: o.id }); setMenu(false); setSrch(false); setDrawer(false); setQuick(null); window.scrollTo(0, 0); };
  const onQuick = (id, color) => { setQs({ color: color || "", size: "", qty: 1 }); setQuick(id); };
  const add = (p, color, size, qty) => {
    const key = p.id + color + size;
    setCart((c) => (c.find((i) => i.key === key) ? c.map((i) => (i.key === key ? { ...i, qty: Math.min(9, i.qty + qty) } : i)) : [...c, { key, id: p.id, color, size, qty }]));
    setQuick(null); setDrawer(true);
  };
  const onWish = (id) => setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  const rows = cart.map((i) => ({ ...i, p: PRODUCTS.find((x) => x.id === i.id) }));
  const count = cart.reduce((a, i) => a + i.qty, 0), sub = rows.reduce((a, r) => a + eff(r.p) * r.qty, 0);
  const qp = PRODUCTS.find((x) => x.id === quick);
  const res = q.trim() ? applyF({ ...EMPTY, q }) : [];
  const over = view.n === "home" && !scrolled && !menu;
  const NAVL = [["Shop", () => go("shop", { f: EMPTY }), "shop"], ["Collections", () => { go("home"); setTimeout(() => document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" }), 60); }], ["New Arrivals", () => go("shop", { f: { ...EMPTY, sort: "new" } })], ["About", () => go("about"), "about"]];
  return (
    <>
      <style>{css}</style>
      <div className="top">Free shipping over $120 · 30-day returns · Concept store</div>
      <header className={"nav " + (over ? "over" : "solid")}>
        <div className="wrap ni">
          <div className="l" style={{ display: "flex" }}><IB n={menu ? "x" : "menu"} label={menu ? "Close menu" : "Open menu"} className="ib burger" aria-expanded={menu} onClick={() => setMenu(!menu)} /><nav className="links" aria-label="Primary">{NAVL.map(([n, fn, k]) => <button key={n} className={view.n === k ? "on" : ""} onClick={fn}>{n}</button>)}</nav></div>
          <button className="logo" aria-label="HAWKIJI home" onClick={() => go("home")}>HAWKIJI</button>
          <div className="right"><IB n="search" label="Search" onClick={() => setSrch(true)} /><IB n="user" label="Account" onClick={() => setAcct(true)} /><IB n="bag" label={`Bag, ${count} items`} onClick={() => setDrawer(true)}>{count > 0 && <span className="bdg">{count}</span>}</IB></div>
        </div>
      </header>
      <AnimatePresence>{menu && <motion.nav className="mm" aria-label="Mobile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{NAVL.map(([n, fn]) => <button key={n} onClick={fn}>{n}</button>)}</motion.nav>}</AnimatePresence>
      <main>
        {view.n === "home" && <Home go={go} onQuick={onQuick} wish={wish} onWish={onWish} news={() => {}} />}
        {view.n === "shop" && <Shop f={f} setF={setF} go={go} onQuick={onQuick} wish={wish} onWish={onWish} />}
        {view.n === "pdp" && <PDP id={view.id} go={go} add={add} wish={wish} onWish={onWish} onQuick={onQuick} />}
        {view.n === "checkout" && <Checkout cart={cart} go={go} done={done} setDone={(d) => { setDone(d); if (d) setCart([]); }} />}
        {view.n === "about" && <About go={go} />}
      </main>
      <footer className="foot"><div className="wrap">
        <div className="fg"><div><div className="logo" style={{ fontSize: 38 }}>HAWKIJI</div><p>Premium bedding and home textiles. Sleep, with character.</p></div>
          <div><h4>Shop</h4>{CATS.slice(0, 4).map((c) => <button key={c} onClick={() => go("shop", { f: { ...EMPTY, cat: [c] } })}>{c}</button>)}</div>
          <div><h4>Collections</h4>{COLL.slice(0, 3).map(([k, n]) => <button key={k} onClick={() => go("shop", { f: { ...EMPTY, coll: k } })}>{n}</button>)}</div>
          <div><h4>Info</h4><button onClick={() => go("about")}>About</button><button onClick={() => flash("Concept store: no support desk.")}>Shipping & returns</button><button onClick={() => flash("Concept store: no support desk.")}>Contact</button></div></div>
        <p className="disc">HAWKIJI — Self-initiated ecommerce concept by Ralph Jay Guevarra. Concept project: fictional products and sample commerce data.</p>
      </div></footer>

      <AnimatePresence>
        {srch && <><motion.div className="ov" onClick={() => setSrch(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div className="srch" role="dialog" aria-modal="true" aria-label="Search" initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }}><div className="wrap" style={{ maxWidth: 760 }}>
            <div style={{ display: "flex", gap: 10 }}><input autoFocus aria-label="Search products" placeholder="Search sheets, linen, blankets…" value={q} onChange={(e) => setQ(e.target.value)} />{q && <button className="btn o" onClick={() => setQ("")}>Clear</button>}<IB n="x" label="Close search" onClick={() => setSrch(false)} /></div>
            <div style={{ marginTop: 14 }} role="status">
              {q.trim() && !res.length && <div className="none" style={{ padding: "30px 0" }}><h3>No results for “{q}”</h3><p>Check the spelling or try a category or material.</p></div>}
              {res.slice(0, 6).map((p) => <button key={p.id} className="sr" onClick={() => { go("pdp", { id: p.id }); setQ(""); }}><span className="t"><Art cat={p.cat} color={p.colors[0]} /></span><span><b>{p.name}</b><br /><small style={{ color: "var(--mut)" }}>{p.cat} · {p.mat}</small></span><b style={{ marginLeft: "auto" }}>{$(eff(p))}</b></button>)}
              {res.length > 0 && <button className="btn full" style={{ marginTop: 16 }} onClick={() => { go("shop", { f: { ...EMPTY, q } }); setQ(""); }}>See all {res.length} results</button>}
            </div></div></motion.div></>}
        {acct && <Modal sm label="Account" onClose={() => setAcct(false)}><h3 style={{ fontSize: 34, marginBottom: 14 }}>Sign in</h3><form className="fld" onSubmit={(e) => { e.preventDefault(); setAcct(false); flash("Account UI demo: no sign-in happened."); }}><input type="email" required placeholder="Email" aria-label="Email" /><input type="password" required placeholder="Password" aria-label="Password" autoComplete="off" /><button className="btn full">Sign in</button><p style={{ fontSize: 13 }}>Concept UI only. No accounts exist.</p></form></Modal>}
        {qp && <Modal label={"Quick view " + qp.name} onClose={() => setQuick(null)}>
          <div className="mi"><Art cat={qp.cat} color={qs.color || qp.colors[0]} /></div>
          <div className="mb"><small style={{ color: "var(--mut)" }}>{qp.cat}</small><h3 style={{ fontSize: 30, margin: "4px 0 6px" }}>{qp.name}</h3><Price p={qp} big />
            <Opts p={qp} st={qs} set={setQs} onAdd={() => add(qp, qs.color, qs.size, qs.qty)} />
            <button className="btn o full" style={{ marginTop: 6 }} onClick={() => go("pdp", { id: qp.id })}>View product</button></div>
        </Modal>}
        {drawer && <><motion.div className="ov" onClick={() => setDrawer(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside className="drawer" role="dialog" aria-modal="true" aria-label="Shopping bag" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <div className="dh"><h3>Bag ({count})</h3><IB n="x" label="Close bag" onClick={() => setDrawer(false)} /></div>
            <div className="db">
              {!rows.length ? <div className="empty"><h3>Your bag is empty</h3><p>Find something for your bedroom.</p><button className="btn" onClick={() => go("shop", { f: EMPTY })}>Continue shopping</button></div> : <>
                <p style={{ fontSize: 13, marginTop: 10 }}>{sub >= 120 ? "You've unlocked free shipping." : `Add ${$(120 - sub)} more for free shipping.`}</p><div className="ship"><i style={{ width: Math.min(100, (sub / 120) * 100) + "%" }} /></div>
                {rows.map((r) => <div className="li" key={r.key}><div className="t"><Art cat={r.p.cat} color={r.color} /></div><div><b>{r.p.name}</b><br /><small>{r.color} / {r.size}</small>
                  <div className="lr"><div className="qty"><button aria-label="Decrease quantity" onClick={() => setCart(cart.map((i) => (i.key === r.key ? { ...i, qty: Math.max(1, i.qty - 1) } : i)))}>−</button><span>{r.qty}</span><button aria-label="Increase quantity" onClick={() => setCart(cart.map((i) => (i.key === r.key ? { ...i, qty: Math.min(9, i.qty + 1) } : i)))}>+</button></div><b>{$(eff(r.p) * r.qty)}</b></div>
                  <button className="rm" onClick={() => setCart(cart.filter((i) => i.key !== r.key))}>Remove</button></div></div>)}</>}
            </div>
            {rows.length > 0 && <div className="df"><div className="lr" style={{ marginTop: 0, marginBottom: 12 }}><b>Subtotal</b><b>{$(sub)}</b></div><button className="btn full" onClick={() => go("checkout")}>Checkout</button><button className="btn o full" style={{ marginTop: 8 }} onClick={() => setDrawer(false)}>Continue shopping</button></div>}
          </motion.aside></>}
      </AnimatePresence>
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}
