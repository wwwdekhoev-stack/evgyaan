import { buildRssResponse } from "@/src/utils/rss";

export const revalidate = 600;

export function GET() {
  return buildRssResponse();
}
