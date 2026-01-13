const { google } = require('googleapis');

const SITE_URL = 'https://www.krgovpolicy.xyz';

async function submitToGoogle() {
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const publishedSlug = process.env.PUBLISHED_SLUG;

  if (!serviceAccountJson) {
    console.log('⚠️  GOOGLE_SERVICE_ACCOUNT_JSON not set, skipping Google submission');
    return;
  }

  const credentials = JSON.parse(serviceAccountJson);

  // 1. Sitemap 제출 (Search Console API)
  // Next.js가 빌드 시 자동으로 sitemap.xml 생성함
  await submitSitemap(credentials);

  // 2. 개별 URL 인덱싱 요청 (Indexing API) - slug가 있는 경우만
  if (publishedSlug) {
    await submitUrl(credentials, publishedSlug);
  }
}

async function submitSitemap(credentials) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/webmasters'],
    });

    const authClient = await auth.getClient();
    const searchconsole = google.searchconsole({ version: 'v1', auth: authClient });

    const sitemapUrl = `${SITE_URL}/sitemap.xml`;
    console.log(`🗺️  Submitting sitemap: ${sitemapUrl}`);

    await searchconsole.sitemaps.submit({
      siteUrl: SITE_URL,
      feedpath: sitemapUrl,
    });

    console.log('✅ Sitemap submitted to Google Search Console');
  } catch (error) {
    if (error.code === 404) {
      console.log('⚠️  Site not verified in Search Console');
    } else {
      console.error('❌ Sitemap submission failed:', error.message);
    }
  }
}

async function submitUrl(credentials, slug) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const authClient = await auth.getClient();
    const indexing = google.indexing({ version: 'v3', auth: authClient });

    const fullUrl = `${SITE_URL}/${slug}`;
    console.log(`🔍 Requesting indexing: ${fullUrl}`);

    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: fullUrl,
        type: 'URL_UPDATED',
      },
    });

    console.log('✅ URL submitted for indexing');
    console.log(`📊 Status: ${response.status}`);
  } catch (error) {
    console.error('❌ URL indexing failed:', error.message);
  }
}

if (require.main === module) {
  submitToGoogle();
}

module.exports = { submitToGoogle, submitSitemap, submitUrl, SITE_URL };
