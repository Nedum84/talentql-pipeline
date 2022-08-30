import { Router } from "express";
import { apiLimiter3ReqFor1Sec } from "./rate.limiter";
import { isValidTimestamp } from "./utils";

const router = Router();

// apiRateLimiter(1 / 60, 2),
router.get("/howold", apiLimiter3ReqFor1Sec, (req, res) => {
  const { dob } = req.query as any;

  if (!isValidTimestamp(dob) || dob == null || dob === "") {
    return res.status(400).json({ error: "Invalide timestamp" });
  }

  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return res.status(200).json({ age });
});

export { router };
