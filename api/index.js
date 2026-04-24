import { Hono } from 'hono';

const app = new Hono();

// آدرس کلادفلر خود را اینجا بگذارید
const TARGET_DOMAIN = "iranfree-61z.pages.dev";

app.all('*', async (c) => {
  const url = new URL(c.req.url);
  const targetUrl = new URL(url.pathname + url.search, `https://${TARGET_DOMAIN}`);

  // کپی کردن هدرها برای اینکه کلادفلر فکر کند درخواست مستقیم است
  const headers = new Headers(c.req.raw.headers);
  headers.set('Host', TARGET_DOMAIN);

  const response = await fetch(targetUrl.toString(), {
    method: c.req.method,
    headers: headers,
    body: c.req.raw.body,
    redirect: 'manual'
  });

  return new Response(response.body, {
    status: response.status,
    headers: response.headers
  });
});

export default app;
