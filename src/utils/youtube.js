// UTM tagging for outbound links to the channel.
//
// The site is meant to feed the channel and the channel is meant to feed the
// site, and right now neither side can see the other. YouTube Analytics
// reports external traffic by referring domain, which lumps every link from
// evgyan.com into one row - so there is no way to tell whether the footer
// link, an author page, or a link inside an article is what actually sends
// anyone to a video.
//
// These parameters split that one row into named placements. Nothing here
// changes which video or channel is opened.
//
// Not to be used on structured data: schema.org `sameAs` must carry the
// canonical profile URL, so those stay untagged.
export function withYouTubeUtm(url, campaign) {
  if (!url || typeof url !== "string") return url;
  if (!/(^|\.)youtube\.com|(^|\.)youtu\.be/.test(url)) return url;
  // Never tag twice, and never overwrite a campaign someone set by hand.
  if (/[?&]utm_source=/.test(url)) return url;

  const separator = url.includes("?") ? "&" : "?";
  const params = new URLSearchParams({
    utm_source: "evgyan.com",
    utm_medium: "referral",
    utm_campaign: campaign || "site",
  });
  return `${url}${separator}${params.toString()}`;
}
