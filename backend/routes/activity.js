const router = require("express").Router();
const Activity = require("../models/Activity");

router.post("/", async (req, res) => {
  console.log("📥 Incoming data:", req.body);  
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    console.error("❌ Save error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const data = await Activity.find();
  res.json(data);
});

module.exports = router;
router.get("/weekly", async (req, res) => {
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  const data = await Activity.aggregate([
    { $match: { date: { $gte: lastWeek } } },
    {
      $group: {
        _id: "$category",
        totalTime: { $sum: "$timeSpent" }
      }
    }
  ]);

  res.json(data);
});