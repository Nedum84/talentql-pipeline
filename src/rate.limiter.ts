import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";

export function apiRateLimiter(timeInMinutes: number, maxApiCalls: number, message?: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    rateLimit({
      windowMs: timeInMinutes * 60 * 1000, // eg 15 minutes (if timeInMinutes==15)
      max: maxApiCalls, // Limit each IP to {maxApiCalls} requests per `window` (here, per 15 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      message:
        message ??
        `You have exceeded max request of ${maxApiCalls} within ${timeInMinutes} minute(s)`,
      statusCode: 429,
    });

    next();
  };
}
