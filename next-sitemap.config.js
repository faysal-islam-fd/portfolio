/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://www.faysalislamfahad.dev"
      : "http://localhost:3000"),
  generateRobotsTxt: true,
  exclude: ["/admin", "/admin/*", "/api/*", "/login"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/admin", "/api"] },
    ],
  },
  changefreq: "weekly",
  priority: 0.7,
};
