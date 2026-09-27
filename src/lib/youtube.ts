export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.substring(1);
    }
    if (parsedUrl.hostname.includes("youtube.com")) {
      if (parsedUrl.pathname === "/embed/") {
        return parsedUrl.pathname.split("/")[2];
      }
      if (parsedUrl.searchParams.has("v")) {
        return parsedUrl.searchParams.get("v");
      }
    }
  } catch (error) {
    // Fallback for non-URL strings or malformed URLs - try regex
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2] && match[2].length === 11) {
      return match[2];
    }
  }
  return null;
}
