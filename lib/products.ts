import fs from "fs";
import path from "path";
import { ProductConfig } from "./types";

const PRODUCTS_DIR = path.join(process.cwd(), "data", "products");

export function getProductBySlug(slug: string): ProductConfig | null {
  try {
    const filePath = path.join(PRODUCTS_DIR, `${slug}.json`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents) as ProductConfig;
    return data;
  } catch (error) {
    console.error(`Error loading product with slug "${slug}":`, error);
    return null;
  }
}

export function getAllProductSlugs(): string[] {
  try {
    if (!fs.existsSync(PRODUCTS_DIR)) {
      return [];
    }
    const files = fs.readdirSync(PRODUCTS_DIR);
    return files
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(/\.json$/, ""));
  } catch (error) {
    console.error("Error reading products directory:", error);
    return [];
  }
}

export function getAllProducts(): ProductConfig[] {
  const slugs = getAllProductSlugs();
  const products: ProductConfig[] = [];
  for (const slug of slugs) {
    const product = getProductBySlug(slug);
    if (product) {
      products.push(product);
    }
  }
  return products;
}
