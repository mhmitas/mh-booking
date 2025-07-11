import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ReviewScores = {
  review_scores_accuracy?: number;
  review_scores_cleanliness?: number;
  review_scores_checkin?: number;
  review_scores_communication?: number;
  review_scores_location?: number;
  review_scores_value?: number;
};

/**
 * Calculates the average star rating (0 to 5) from individual review scores.
 * @param scores - An object containing review score categories (0 to 10 scale each).
 * @returns A number from 0 to 5, rounded to 2 decimal places.
 */
export function calculateAverageRating(scores: ReviewScores): number {
  const values = Object.values(scores).filter(
    (v): v is number => typeof v === "number"
  );

  if (values.length === 0) return 0;

  const total = values.reduce((sum, val) => sum + val, 0);
  const averageOutOf10 = total / values.length;
  const averageOutOf5 = (averageOutOf10 / 10) * 5;

  return parseFloat(averageOutOf5.toFixed(2)); // rounded to 2 decimal places
}

// lib/markdown.js
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

interface MarkdownToHtmlOptions {
  gfm?: boolean;
  breaks?: boolean;
  tables?: boolean;
}

export async function markdownToHtml(markdown: string): Promise<string> {
  // Configure marked for GFM (tables, task lists, etc.)
  const options: MarkdownToHtmlOptions = {
    gfm: true,
    breaks: true, // Optional: Convert newlines to <br>
    tables: true,
  };
  marked.setOptions(options);

  // Convert Markdown to HTML
  const html: string = await marked(markdown);

  // Sanitize HTML to prevent XSS
  const sanitizedHtml: string = DOMPurify.sanitize(html);

  return sanitizedHtml;
}

export async function convertMessageObjectToSimple(msg: any) {
  // Extract role from id[2], e.g. "HumanMessage" -> "human"
  const rawRole = msg.id?.[2] || "unknown";

  // Extract content safely
  const content = msg.kwargs?.content || "";
  const htmlContent = await markdownToHtml(content);

  return { type: rawRole, content: htmlContent };
}
