import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";

const cacheBaseDir = path.resolve(process.cwd(), ".cache/osti-science-bowl");

function sanitizeFileName(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]/g, "_");
}

function makeCachePath(url: string) {
  const urlObj = new URL(url);
  const fileName = sanitizeFileName(path.basename(urlObj.pathname) || "downloaded.pdf");
  const hash = createHash("sha256").update(url).digest("hex").slice(0, 12);
  return path.join(cacheBaseDir, `${fileName}-${hash}.pdf`);
}

export async function ensureCacheDir() {
  await fs.mkdir(cacheBaseDir, { recursive: true });
}

export async function downloadPdf(url: string, refresh = false): Promise<Buffer> {
  await ensureCacheDir();
  const cachePath = makeCachePath(url);

  if (!refresh) {
    try {
      return await fs.readFile(cachePath);
    } catch {
      // continue to download
    }
  }

  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    throw new Error(`Failed to download PDF ${url}: ${response.status} ${response.statusText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(cachePath, buffer);
  return buffer;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
