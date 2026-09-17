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
  }

  const assets: YenaCurationAsset[];
  export default assets;
}
