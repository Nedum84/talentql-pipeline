import rateLimit from "express-rate-limit";

export const apiLimiter3ReqFor1Sec = rateLimit({
  windowMs: 1 * 1000, // 1 sec
  max: 3, // limit each IP to 3 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  handler: function (req, res) {
    //@ts-ignore
    const { remaining, limit, current } = req.rateLimit;

    return res
      .status(429)
      .set({ "x-ratelimit-limit": limit, "x-ratelimit-remaining": remaining })
      .json({
        error: "You sent too many requests. Please wait a while then try again",
      });
  },
});
