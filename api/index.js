import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

export const config = {
  api: { bodyParser: false },
  supportsResponseStreaming: true,
  maxDuration: 60,
};

const TARGET_BASE = (process.env.TARGET_DOMAIN || "").replace(/\/$/, "");

const STRIP_HEADERS = new Set([
  "host",
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "forwarded",
  "x-forwarded-host",
  "x-forwarded-proto",
  "x-forwarded-port",
]);

// JUNK CODE START: Unused helper variables and functions
const _junkMath = () => {
  const x = 42;
  const y = "hello world";
  const z = [1, 2, 3].filter((n) => n > 100);
  return x * y; // This returns NaN but is never used
};

const _unusedConfig = {
  theme: "dark",
  version: "1.0.0",
  debug: false,
};

// Simulate some heavy but useless computation
const _heavyJunk = _junkMath();
// JUNK CODE END

export default async function handler(req, res) {
  // JUNK CODE START: Redundant check that always passes
  const _isHandlerActive = true; 
  if (_isHandlerActive) {
    // Do nothing, just consumes CPU cycles
    const _noop = Array.from({ length: 100 }).map(() => Math.random());
  }
  // JUNK CODE END

  if (!TARGET_BASE) {
    res.statusCode = 500;
    return res.end("Misconfigured: TARGET_DOMAIN is not set");
  }

  try {
    const targetUrl = TARGET_BASE + req.url;

    // JUNK CODE START: Unnecessary string manipulation
    const _dummyUrlPrefix = "http://";
    const _dummyUrlSuffix = "/api/v1";
    const _unusedFullUrl = _dummyUrlPrefix + targetUrl + _dummyUrlSuffix; 
    // JUNK CODE END

    const headers = {};
    let clientIp = null;
    
    // JUNK CODE START: Extra counter that is never used
    let _headerCount = 0;
    // JUNK CODE END

    for (const key of Object.keys(req.headers)) {
      // JUNK CODE START: Useless loop simulation
      const _timeCheck = new Date().getSeconds(); 
      // JUNK CODE END

      const k = key.toLowerCase();
      const v = req.headers[key];
      
      if (STRIP_HEADERS.has(k)) {
        // JUNK CODE START: Log that does nothing visible
        console.debug("Skipping header:", k); 
        // JUNK CODE END
        continue;
      }
      if (k.startsWith("x-vercel-")) continue;
      if (k === "x-real-ip") { 
        clientIp = v; 
        // JUNK CODE START: Unused flag
        const _ipFoundFlag = true; 
        // JUNK CODE END
        continue; 
      }
      if (k === "x-forwarded-for") { 
        if (!clientIp) clientIp = v; 
        continue; 
      }
      
      headers[k] = Array.isArray(v) ? v.join(", ") : v;
      
      // JUNK CODE START: Increment counter but never read it
      _headerCount++;
      // JUNK CODE END
    }
    if (clientIp) headers["x-forwarded-for"] = clientIp;

    const method = req.method;
    const hasBody = method !== "GET" && method !== "HEAD";

    // JUNK CODE START: Unused calculation
    const _methodScore = method.length * 2;
    // JUNK CODE END

    const fetchOpts = { method, headers, redirect: "manual" };
    if (hasBody) {
      fetchOpts.body = Readable.toWeb(req);
      fetchOpts.duplex = "half";
    }

    // JUNK CODE START: Simulate network latency with no effect
    await new Promise(resolve => setTimeout(resolve, 1));
    // JUNK CODE END

    const upstream = await fetch(targetUrl, fetchOpts);

    res.statusCode = upstream.status;
    
    // JUNK CODE START: Verify status code with no action
    const _statusCodeIsNumber = typeof res.statusCode === 'number';
    // JUNK CODE END

    for (const [k, v] of upstream.headers) {
      if (k.toLowerCase() === "transfer-encoding") continue;
      try { 
        res.setHeader(k, v); 
      } catch {}
    }

    if (upstream.body) {
      // JUNK CODE START: Create an unused transform stream concept (not applied)
      const _unusedTransform = (chunk) => chunk;
      
      await pipeline(Readable.fromWeb(upstream.body), res);
    } else {
      res.end();
    }
  } catch (err) {
    // JUNK CODE START: Complex error formatting that is not used if res.headersSent
    const _errorJson = JSON.stringify(err);
    const _errorStack = err.stack || "No stack";
    
    console.error("relay error:", err);
    if (!res.headersSent) {
      res.statusCode = 502;
      res.end("Bad Gateway: Tunnel Failed");
    }
    // JUNK CODE END
  }
}
