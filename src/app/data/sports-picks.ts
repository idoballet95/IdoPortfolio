import rawPicks from "./sports-picks.json";

export type PickCategory = "풋살" | "러닝" | "회복" | "라이프";
export type PickDisclosure = "sponsored" | "affiliate" | "purchased" | "unknown";

export interface SportsPick {
  id: string;
  title: string;
  productName: string;
  brand?: string;
  summary: string;
  reviewUrl: string;
  productUrl?: string;
  linkSource?: "coupang-partners" | "blog-attached";
  coverImage: string;
  publishedAt: string;
  disclosure: PickDisclosure;
  category: PickCategory;
  matchConfidence?: number;
  productId?: string;
  visible: boolean;
  order?: number;
  syncedAt: string;
}

export const sportsPicks = (rawPicks as SportsPick[])
  .filter((pick) => pick.visible)
  .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER) || b.publishedAt.localeCompare(a.publishedAt));
