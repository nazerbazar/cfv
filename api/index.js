export default {
  async fetch(request, env, ctx) {
    const upgradeHeader = request.headers.get("Upgrade");
    
    // اگر درخواست از نوع WebSocket باشد
    if (upgradeHeader === "websocket") {
      const targetUrl = new URL(request.url);
      targetUrl.hostname = "iranfree-61z.pages.dev"; // آدرس کلادفلر شما
      
      const modifiedRequest = new Request(targetUrl, request);
      modifiedRequest.headers.set("Host", "iranfree-61z.pages.dev");
      
      return fetch(modifiedRequest);
    }

    // در غیر این صورت (برای باز شدن پنل معمولی)
    const targetUrl = new URL(request.url);
    targetUrl.hostname = "iranfree-61z.pages.dev";
    
    const response = await fetch(new Request(targetUrl, request));
    return response;
  }
};
