import { NextRequest, NextResponse } from "next/server";

const REMOVED_BLOG_SLUGS = new Set([
  "2026-minimum-wage-salary-table",
  "k-pass-transport-card-2026",
  "subsidy-application-tips",
  "climate-card-vs-kpass-2026",
  "real-estate-price-check-guide",
  "credit-score-management",
  "year-end-tax-settlement-guide",
  "housing-subscription-youth-special",
  "exchange-rate-calculator-manual",
]);

export function middleware(request: NextRequest) {
  const match = request.nextUrl.pathname.match(/^\/blog\/([^/]+)\/?$/);
  const slug = match?.[1];

  if (slug && REMOVED_BLOG_SLUGS.has(slug)) {
    return new NextResponse("Gone", {
      status: 410,
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/:slug*"],
};
