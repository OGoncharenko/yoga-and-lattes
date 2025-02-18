import express from "express";

const router = express.Router();

router.get("/commenttest", (req, res) => {
  res.status(200).send("Comment route works!");
});

export default router;