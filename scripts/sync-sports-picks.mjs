import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(root, "src/app/data/sports-picks.json");
const overridePath = path.join(root, "scripts/sports-picks-overrides.json");
const coverDirectory = path.join(root, "public/media/sports-picks");
const dryRun = process.argv.includes("--dry-run");
const BLOG_ID = "idohere";
const RSS_URL = `https://rss.blog.naver.com/${BLOG_ID}.xml`;
const CATEGORY_INDEX_URL = `https://blog.naver.com/PostTitleListAsync.naver?blogId=${BLOG_ID}&categoryNo=10&countPerPage=30`;

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required server environment variable: ${name}`);
  return value;
}

function clean(value = "") {
  return value.replace(/<[^>]*>/g, "").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/\s+/g, " ").trim();
}

function canonicalPostUrl(logNo) {
  return `https://blog.naver.com/${BLOG_ID}/${logNo}`;
}

function naverListDate(value) {
  const [year, month, day] = String(value).split(".").map((part) => part.trim()).filter(Boolean);
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

async function fetchText(url, options = {}) {
  const response = await fetch(url, { ...options, headers: { "user-agent": "Mozilla/5.0 i.do.picks-sync/1.0", ...(options.headers || {}) } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${new URL(url).hostname}`);
  return response.text();
}

function cdata(block, tag) {
  return block.match(new RegExp(`<${tag}>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`, "i"))?.[1]?.trim() || "";
}

async function rssEquipmentPosts() {
  const xml = await fetchText(RSS_URL);
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((match) => match[1]).filter((block) => clean(cdata(block, "category")) === "용품").map((block) => {
    const link = cdata(block, "link"); const id = link.match(/(\d{9,})/)?.[1];
    const description = cdata(block, "description");
    return { id, title: cdata(block, "title"), link, description, postdate: new Date(block.match(/<pubDate>(.*?)<\/pubDate>/i)?.[1] || "").toISOString().slice(0, 10), coverImage: description.match(/<img[^>]+src=["']([^"']+)/i)?.[1] || "" };
  }).filter((item) => item.id);
}

async function categoryIndexPosts() {
  const posts = [];
  for (let page = 1; page <= 20; page += 1) {
    const raw = await fetchText(`${CATEGORY_INDEX_URL}&currentPage=${page}`);
    const response = JSON.parse(raw.replace(/\\(?!["\\/bfnrtu])/g, "\\\\"));
    if (response.resultCode !== "S") throw new Error(`Naver category index failed: ${response.resultMessage || "unknown error"}`);
    const pagePosts = response.postList || [];
    if (!pagePosts.length || pagePosts.every((post) => posts.some((saved) => saved.logNo === post.logNo))) break;
    posts.push(...pagePosts);
  }
  return posts.map((post) => ({
    id: String(post.logNo),
    title: clean(decodeURIComponent(String(post.title).replace(/\+/g, " "))),
    link: canonicalPostUrl(post.logNo),
    description: "",
    postdate: naverListDate(post.addDate),
    coverImage: "",
  }));
}

async function naverSearch(query, clientId, clientSecret) {
  const url = new URL("https://openapi.naver.com/v1/search/blog.json");
  url.searchParams.set("query", query);
  url.searchParams.set("display", "100");
  url.searchParams.set("sort", "date");
  const response = await fetch(url, { headers: { "X-Naver-Client-Id": clientId, "X-Naver-Client-Secret": clientSecret } });
  if (!response.ok) throw new Error(`Naver API ${response.status}: ${await response.text()}`);
  return response.json();
}

function extractMeta(html, property) {
  const escaped = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`<meta[^>]+(?:property|name)=["']${escaped}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${escaped}["']`, "i"),
  ];
  return patterns.map((pattern) => html.match(pattern)?.[1]).find(Boolean) || "";
}

function extractAttachedProductLink(html) {
  const start = html.indexOf('<div class="se-main-container">');
  const end = html.indexOf("<!-- SE_DOC_FOOTER_START", start);
  if (start < 0) return "";
  const body = html.slice(start, end > start ? end : undefined);
  const links = [...body.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>/gi)]
    .map((match) => match[1].replaceAll("&amp;", "&"))
    .filter((url) => /^https?:/i.test(url) && !/(?:m\.)?blog\.naver\.com/i.test(url));
  return links.find((url) => /(naver\.me|mkt\.shopping\.naver\.com|smartstore\.naver\.com|brand\.naver\.com|shopping\.naver\.com|coupang\.com)/i.test(url)) || "";
}

function coverExtension(contentType = "") {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("gif")) return "gif";
  return "jpg";
}

async function localizeCover(id, remoteUrl, previousCover = "") {
  if (!remoteUrl) return previousCover;
  try {
    const response = await fetch(remoteUrl, {
      headers: {
        referer: `https://m.blog.naver.com/${BLOG_ID}/${id}`,
        "user-agent": "Mozilla/5.0 i.do.picks-sync/1.0",
      },
    });
    if (!response.ok) throw new Error(`cover ${response.status}`);
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) throw new Error(`unexpected cover type ${contentType}`);
    const extension = coverExtension(contentType);
    await fs.mkdir(coverDirectory, { recursive: true });
    await fs.writeFile(path.join(coverDirectory, `${id}.${extension}`), Buffer.from(await response.arrayBuffer()));
    return `/media/sports-picks/${id}.${extension}`;
  } catch (error) {
    console.warn(`Cover download failed for ${id}: ${error.message}`);
    return previousCover;
  }
}

function disclosureFrom(text) {
  if (/제품을 제공|원고료|협찬/.test(text)) return "sponsored";
  if (/파트너스|수수료/.test(text)) return "affiliate";
  if (/내돈내산|직접 구매/.test(text)) return "purchased";
  return "unknown";
}

function categoryFrom(text) {
  if (/풋살|축구|논슬립|풋살화|축구화/.test(text)) return "풋살";
  if (/러닝|이어폰|선글라스/.test(text)) return "러닝";
  if (/베개|마사지|회복|보호대|크림/.test(text)) return "회복";
  return "라이프";
}

function productQuery(title) {
  return clean(title)
    .replace(/["'“”‘’|]/g, " ")
    .replace(/후기|추천|내돈내산|솔직|리뷰|여자|남자|꿀템|왜|이거|결국|오래|가성비|주목/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

function tokens(text) {
  return new Set(clean(text).toLowerCase().split(/[^0-9a-z가-힣]+/).filter((token) => token.length > 1));
}

function scoreCandidate(query, candidateName) {
  const source = tokens(query); const target = tokens(candidateName);
  if (!source.size) return 0;
  const overlap = [...source].filter((token) => target.has(token)).length;
  const ratio = overlap / source.size;
  const modelBonus = [...source].some((token) => /\d/.test(token) && target.has(token)) ? 20 : 0;
  return Math.min(100, Math.round(ratio * 80 + modelBonus));
}

function coupangAuthorization(method, pathWithQuery, accessKey, secretKey) {
  const datetime = new Date().toISOString().slice(2, 19).replace(/[:-]/g, "") + "Z";
  const [pathname, query = ""] = pathWithQuery.split("?");
  const message = `${datetime}${method}${pathname}${query}`;
  const signature = crypto.createHmac("sha256", secretKey).update(message).digest("hex");
  return `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${datetime}, signature=${signature}`;
}

async function coupangSearch(keyword, accessKey, secretKey, subId) {
  const endpoint = new URL("https://api-gateway.coupang.com/v2/providers/affiliate_open_api/apis/openapi/products/search");
  endpoint.searchParams.set("keyword", keyword);
  endpoint.searchParams.set("limit", "10");
  if (subId) endpoint.searchParams.set("subId", subId);
  const pathWithQuery = `${endpoint.pathname}?${endpoint.searchParams}`;
  const response = await fetch(endpoint, { headers: { Authorization: coupangAuthorization("GET", pathWithQuery, accessKey, secretKey) } });
  if (!response.ok) throw new Error(`Coupang API ${response.status}: ${await response.text()}`);
  const body = await response.json();
  return body.data?.productData || body.data || [];
}

async function main() {
  const naverId = required("NAVER_CLIENT_ID"); const naverSecret = required("NAVER_CLIENT_SECRET");
  const coupangKey = process.env.COUPANG_ACCESS_KEY?.trim() || "";
  const coupangSecret = process.env.COUPANG_SECRET_KEY?.trim() || "";
  const coupangEnabled = Boolean(coupangKey && coupangSecret);
  const subId = process.env.COUPANG_SUB_ID?.trim() || "";
  const overrides = JSON.parse(await fs.readFile(overridePath, "utf8"));
  const existing = JSON.parse(await fs.readFile(outputPath, "utf8"));
  const rssPosts = await categoryIndexPosts();
  const output = [];
  const candidateReport = [];
  for (const rssItem of rssPosts) {
    const id = rssItem.id;
    const search = await naverSearch(`\"${clean(rssItem.title)}\"`, naverId, naverSecret);
    const apiItem = (search.items || []).find((candidate) => candidate.bloggerlink?.includes(BLOG_ID) && candidate.link?.includes(id));
    const item = apiItem || rssItem;
    const reviewUrl = canonicalPostUrl(id); const html = await fetchText(`https://m.blog.naver.com/${BLOG_ID}/${id}`);
    const title = clean(item.title); const summary = clean(item.description).slice(0, 150);
    const remoteCoverImage = extractMeta(html, "og:image") || rssItem.coverImage; const bodyText = clean(html);
    const attachedProductUrl = extractAttachedProductLink(html);
    const override = overrides[id] || {};
    const query = override.searchQuery || productQuery(title); let best;
    if (coupangEnabled && !overrides[id]?.productUrl) {
      const candidates = await coupangSearch(query, coupangKey, coupangSecret, subId);
      const scoredCandidates = candidates.map((candidate) => ({ ...candidate, score: scoreCandidate(query, candidate.productName || "") })).sort((a, b) => b.score - a.score);
      best = scoredCandidates[0];
      if (dryRun) candidateReport.push({ id, query, candidates: scoredCandidates.slice(0, 3).map(({ productName, score }) => ({ productName, score })) });
    }
    const previous = existing.find((pick) => pick.id === id);
    const coverImage = dryRun ? (previous?.coverImage || remoteCoverImage) : await localizeCover(id, remoteCoverImage, previous?.coverImage);
    const autoMatch = override.verifiedCoupang === true ? best : undefined;
    const productUrl = override.productUrl || autoMatch?.productUrl || attachedProductUrl || undefined;
    const linkSource = override.productUrl || autoMatch?.productUrl ? "coupang-partners" : attachedProductUrl ? "blog-attached" : undefined;
    output.push({
      id, title, productName: override.productName || autoMatch?.productName || query, summary: override.summary || summary,
      reviewUrl, productUrl, linkSource,
      coverImage: override.coverImage || coverImage || previous?.coverImage || "",
      publishedAt: item.postdate?.includes("-") ? item.postdate : item.postdate ? `${item.postdate.slice(0,4)}-${item.postdate.slice(4,6)}-${item.postdate.slice(6,8)}` : previous?.publishedAt,
      disclosure: disclosureFrom(bodyText), category: override.category || categoryFrom(`${title} ${bodyText.slice(0, 5000)}`),
      matchConfidence: override.productUrl ? 100 : autoMatch?.score, productId: override.productId || autoMatch?.productId,
      visible: override.visible ?? true, order: override.order, syncedAt: new Date().toISOString(),
    });
  }
  if (!output.length) throw new Error("Sync produced zero category posts; existing catalogue was preserved.");
  const visibleOutput = output.filter((pick) => pick.visible);
  const report = { total: visibleOutput.length, matched: visibleOutput.filter((pick) => pick.productUrl).length, unresolved: visibleOutput.filter((pick) => !pick.productUrl).length, coupangEnabled };
  if (!dryRun) { const temporary = `${outputPath}.tmp`; await fs.writeFile(temporary, `${JSON.stringify(output, null, 2)}\n`); await fs.rename(temporary, outputPath); }
  console.log(JSON.stringify({ dryRun, ...report, ...(dryRun ? { candidateReport } : {}) }, null, 2));
}

main().catch((error) => { console.error(error.message); process.exitCode = 1; });
