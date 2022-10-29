import express from "express";
const router = express.Router();
import { register } from "../controllers/register.js";

//Yian Chen
router.post("/", register);

router.get("/", (req, res) => {
  res.status(200).redirect("/register.html");
});

export default router;
