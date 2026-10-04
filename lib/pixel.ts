/**
 * Facebook Pixel Client Utility
 * Handles standard e-commerce events and logs actions to console in development.
 */

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

export function initFacebookPixel(pixelId: string) {
  if (typeof window === "undefined" || !pixelId) return;

  if (!window.fbq) {
    const fbq: any = function () {
      if (fbq.callMethod) {
        fbq.callMethod.apply(fbq, arguments);
      } else {
        fbq.queue.push(arguments);
      }
    };
    if (!window._fbq) window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }

  window.fbq("init", pixelId);
  console.log(`[FB Pixel] Initialized with ID: ${pixelId}`);
}

export function trackPixelEvent(
  eventName: "PageView" | "ViewContent" | "InitiateCheckout" | "Lead" | "Purchase",
  params: Record<string, any> = {}
) {
  if (typeof window === "undefined") return;

  console.log(`[FB Pixel Event] 🚀 ${eventName}:`, params);

  if (window.fbq) {
    window.fbq("track", eventName, params);
  }
}

/**
 * TODO: Server-Side Conversions API (CAPI) Integration
 * 
 * To implement Meta Conversions API in production:
 * 1. Generate a Conversions API Access Token in Meta Events Manager.
 * 2. In /app/api/orders/route.ts, send a POST request to:
 *    https://graph.facebook.com/v19.0/{PIXEL_ID}/events?access_token={ACCESS_TOKEN}
 * 3. Include user_data (hashed phone, hashed email, client_ip_address, client_user_agent)
 *    and custom_data (currency: 'MAD', value: total, content_name: productTitle).
 * 4. Pass event_id for deduplication between browser fbq() and server CAPI.
 */
export async function sendServerSideEventPlaceholder(
  eventName: string,
  data: Record<string, any>
) {
  // Commented placeholder for future server-side CAPI calls
  /*
  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        user_data: {
          ph: hashSha256(data.phone),
          fn: hashSha256(data.firstName),
        },
        custom_data: {
          currency: "MAD",
          value: data.value,
        },
      },
    ],
  };
  */
}
