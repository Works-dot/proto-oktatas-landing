import path from "node:path";
import fs from "node:fs";
import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import router from "./routes";
import adminPageRouter from "./routes/admin-page";
import { logger } from "./lib/logger";

const app: Express = express();

// Railway terminates TLS at a single edge proxy in front of the container.
// `1` means "trust exactly one proxy hop" so req.ip reflects the real client
// without accepting spoofed x-forwarded-for chains from arbitrary upstreams.
app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
// Admin HTML page must be mounted before the SPA catch-all so it isn't
// shadowed by the static index.html fallback below.
app.use(adminPageRouter);

const isProduction = process.env.NODE_ENV === "production";
const staticDir = process.env.STATIC_DIR;

if (isProduction && staticDir && fs.existsSync(staticDir)) {
  logger.info({ staticDir }, "Serving static SPA");
  app.use(express.static(staticDir, { index: false, maxAge: "1h" }));
  const indexHtml = path.join(staticDir, "index.html");
  app.use((req: Request, res: Response, next) => {
    if (req.method !== "GET") return next();
    if (req.path.startsWith("/api/")) return next();
    res.sendFile(indexHtml);
  });
} else if (isProduction) {
  logger.warn(
    { staticDir },
    "STATIC_DIR not set or missing — SPA will not be served",
  );
}

export default app;
