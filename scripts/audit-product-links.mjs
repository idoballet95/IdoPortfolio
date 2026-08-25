import fs from "node:fs/promises";

const picks = JSON.parse(await fs.readFile(new URL("../src/app/data/sports-picks.json", import.meta.url), "utf8")).filter((pick) => pick.visible);

function clean(value = "") {
  return value.replace(/<[^>]*>/g, " ").replace(/&(?:amp|quot|#39);/g, " ").replace(/\s+/g, " ").trim();
}

function pageTitle(html) {
  return clean(
    html.match(/<meta[^>]+(?:property|name)=["']og:title["'][^>]+content=["']([^"']+)/i)?.[1]
    || html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
    || "",
  );
}

const report = [];
for (const pick of picks) {
  try {
    const response = await fetch(pick.productUrl, { headers: { "user-agent": "Mozilla/5.0 i.do.picks-audit/1.0" }, redirect: "follow" });
    const html = await response.text();
    report.push({ id: pick.id, blogTitle: pick.title, resolvedUrl: response.url, productTitle: pageTitle(html) });
  } catch (error) {
    report.push({ id: pick.id, blogTitle: pick.title, error: error.message });
  }
}

console.log(JSON.stringify(report, null, 2));
