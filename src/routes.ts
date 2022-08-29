import { Router } from "express";
import { apiRateLimiter } from "./rate.limiter";
import { isValidTimestamp } from "./utils";

const router = Router();

router.get("/howold", apiRateLimiter(1, 3), (req, res) => {
  const { dob } = req.query as any;

  console.log(isValidTimestamp(dob), dob);

  if (!isValidTimestamp(dob)) {
    return res.status(400).json({ message: "Invalide timestamp" });
  }

  try {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return res.status(200).json(age);
  } catch (error) {
    console.log(error);

    return res.status(400).json({ message: "Invalide timestamp" });
  }
});

export { router };
