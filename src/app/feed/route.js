import { buildRssResponse } from "@/src/utils/rss";

// /feed is the address most feed readers and WordPress-style tools try first;
// it serves the same RSS as /rss.xml.
export const revalidate = 600;

export function GET() {
  return buildRssResponse();
}
