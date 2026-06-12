import { load } from "cheerio";
import { URL } from "node:url";
import { PdfLinkInfo } from "./types";

const PDF_URL_PATTERN = /\.pdf(?:\?|#|$)/i;
const SET_REGEX = /Sample Questions Set\s*(\d+)/i;
const ROUND_REGEX = /Round\s*(\d+)/i;
const URL_SET_REGEX = /Sample-Set-(\d+)/i;
const URL_ROUND_REGEX = /(?:^|\/)[a-z]?_round(\d+)\.pdf/i;
const YEAR_REGEX = /(?:from|\b)(19|20)\d{2}\b/;

function cleanText(value: string) {
  return value.trim().replace(/[\s\u00A0]+/g, " ");
}

function normalizeAbsoluteUrl(href: string, baseUrl: string): string {
  try {
    return new URL(href, baseUrl).toString();
  } catch {
    return href;
  }
}

function inferYearFromText(value: string): string | null {
  const match = value.match(/(19|20)\d{2}/);
  return match ? match[0] : null;
}

function inferRoundLabel(text: string): string | undefined {
  if (!text) return undefined;
  const cleaned = cleanText(text);
  const roundMatch = cleaned.match(/(Round\s*\d+)/i);
  if (roundMatch) return roundMatch[1];
  if (/Round Robin/i.test(cleaned)) return cleaned;
  if (/Double Elimination/i.test(cleaned)) return cleaned;
  return cleaned;
}

function inferSetNumberFromUrl(url: string): number | undefined {
  const match = url.match(URL_SET_REGEX);
  return match ? Number(match[1]) : undefined;
}

function inferRoundNumberFromUrl(url: string): number | undefined {
  const match = url.match(URL_ROUND_REGEX);
  return match ? Number(match[1]) : undefined;
}

export function discoverPdfLinks(html: string, sourcePageUrl: string): PdfLinkInfo[] {
  const $ = load(html);

  let currentSetLabel: string | undefined;
  let currentSetNumber: number | undefined;
  let currentSetYear: string | null = null;

  const links: PdfLinkInfo[] = [];
  const anchorElements = $("a[href]").toArray();

  for (const element of anchorElements) {
    const href = $(element).attr("href");
    if (!href) continue;
    const text = cleanText($(element).text());

    const setMatch = text.match(SET_REGEX);
    if (setMatch) {
      currentSetLabel = `Sample Questions Set ${setMatch[1]}`;
      currentSetNumber = Number(setMatch[1]);
      currentSetYear = inferYearFromText(text) ?? currentSetYear;
      continue;
    }

    if (!PDF_URL_PATTERN.test(href)) {
      continue;
    }

    const absoluteUrl = normalizeAbsoluteUrl(href, sourcePageUrl);
    const urlSetNumber = inferSetNumberFromUrl(absoluteUrl);
    const effectiveSetNumber = urlSetNumber ?? currentSetNumber;
    const effectiveSetLabel = effectiveSetNumber ? `Sample Questions Set ${effectiveSetNumber}` : currentSetLabel;
    const urlRoundNumber = inferRoundNumberFromUrl(absoluteUrl);
    const inferredRound = urlRoundNumber ? `Round ${urlRoundNumber}` : inferRoundLabel(text);
    const roundMatch = text.match(ROUND_REGEX);
    const roundNumber = urlRoundNumber ?? (roundMatch ? Number(roundMatch[1]) : undefined);
    const titleParts = [effectiveSetLabel, inferredRound].filter(Boolean);
    const sourceTitle = titleParts.length > 0 ? titleParts.join(" ") : text;
    const sampleSetYear = currentSetYear ?? inferYearFromText(href) ?? inferYearFromText(text);

    links.push({
      sourcePageUrl,
      sourcePdfUrl: absoluteUrl,
      sourceTitle,
      sourceSet: effectiveSetLabel,
      sourceRound: inferredRound,
      sampleSetNumber: effectiveSetNumber,
      sampleSetYear,
      roundNumber
    });
  }

  const deduped = new Map<string, PdfLinkInfo>();
  for (const link of links) {
    deduped.set(link.sourcePdfUrl, link);
  }

  return Array.from(deduped.values());
}
