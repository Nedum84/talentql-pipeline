import { Router } from "express";
import { apiRateLimiter } from "./rate.limiter";

const router = Router();

router.post("/howold", apiRateLimiter(1, 3), async (req, res) => {
  const { dateString } = req.query as any;

  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

export { router };
