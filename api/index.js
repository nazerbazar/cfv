import { Hono } from 'hono';

const app = new Hono();
const TARGET_DOMAIN = "iranfree-61z.pages.dev";

app.all('*', async (c) => {
  const url = new URL(c.req.url);
  const targetUrl = new URL(url.pathname + url.search, `https://${TARGET_DOMAIN}`);
  
  // کپی هدرها و تغییر Host به دامین کلادفلر
  const headers = new Headers(c.req.raw.headers);
  headers.set('Host', TARGET_DOMAIN);

  // این بخش مهم است: اگر درخواست WebSocket است (Upgrade)، باید به fetch اجازه دهیم 
  // که بدون پردازش اضافه، کانکشن را به سمت کلادفلر فوروارد کند.
  const response = await fetch(targetUrl.toString(), {
    method: c.req.method,
    headers: headers,
    body: c.req.raw.body,
    // در Edge Runtime ورسل، همین که بدنه درخواست را بدون تغییر پاس بدهیم 
    // و هدر Upgrade را داشته باشیم، معمولاً کافیست.
  });

  return new Response(response.body, {
    status: response.status,
    headers: response.headers
  });
});

export default app;
