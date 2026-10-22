<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | DentalSEOHub</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #1e293b;
            background-color: #f8fafc;
            margin: 0;
            padding: 30px;
          }
          .container {
            max-width: 1000px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
            padding: 32px;
          }
          h1 {
            color: #0f172a;
            font-size: 24px;
            margin-top: 0;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          p.desc {
            color: #64748b;
            font-size: 14px;
            margin-top: 0;
            margin-bottom: 24px;
            line-height: 1.5;
          }
          .badge {
            background-color: #eff6ff;
            color: #2563eb;
            font-weight: 600;
            font-size: 12px;
            padding: 4px 10px;
            border-radius: 9999px;
            border: 1px solid #bfdbfe;
            display: inline-block;
            margin-bottom: 16px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          th {
            background-color: #f1f5f9;
            color: #334155;
            text-align: left;
            padding: 12px;
            font-weight: 600;
            border-bottom: 1px solid #e2e8f0;
          }
          td {
            padding: 12px;
            border-bottom: 1px solid #f1f5f9;
            color: #475569;
          }
          tr:hover td {
            background-color: #f8fafc;
          }
          a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
          }
          a:hover {
            text-decoration: underline;
          }
          .priority {
            font-weight: 600;
            color: #0f172a;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="badge">Programmatic SEO Engine</div>
          <h1>XML Sitemap Index</h1>
          <p class="desc">
            This XML sitemap is generated dynamically for search engines (Google Search Console, Bingbot). 
            It contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> indexed URLs across target dental marketing metros.
          </p>
          <table>
            <thead>
              <tr>
                <th width="65%">Page URL</th>
                <th width="15%">Change Freq</th>
                <th width="10%">Priority</th>
                <th width="10%">Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <xsl:variable name="itemURL">
                      <xsl:value-of select="sitemap:loc"/>
                    </xsl:variable>
                    <a href="{$itemURL}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td class="priority">
                    <xsl:value-of select="sitemap:priority"/>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:lastmod"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
