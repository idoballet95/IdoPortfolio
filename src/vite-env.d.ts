/// <reference types="vite/client" />

declare module "virtual:yena-curation-assets" {
  export interface YenaCurationAsset {
    id: string;
    name: string;
    episode: string;
    collection: string;
    category: "daily" | "background" | "sheet";
    relativePath: string;
    url: string;
    duplicateIds: string[];
  }

  export const duplicateSummary: { groups: number; hidden: number };
  const assets: YenaCurationAsset[];
  export default assets;
}
