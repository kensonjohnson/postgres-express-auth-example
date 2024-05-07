import type { Request, Response } from "express";

export function catchUnmatchedRequestAndRedirectEncoded(
  req: Request,
  res: Response
) {
  // Capture the URL requested by the client
  const url = req.url;

  // Remove the leading slash and encode the URL
  const encodedUrl = encodeURIComponent(url.slice(1));

  // Redirect the client to the encoded URL
  res.redirect(`/?r=${encodedUrl}`);
}
