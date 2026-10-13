import "dotenv/config"
import express from "express"
import MeetingService from "./meetingService.js";

const app = express();

const meetingService = new MeetingService();

app.use(express.json());

app.post("/api/meetings/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a meeting message.",
      });
    }

    const meetingDetails = await meetingService.schedule(
      message.trim()
    );

    return res.status(200).json({
      success: true,
      data: meetingDetails,
    });
  } catch (error) {
    console.error("Meeting parsing error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to extract meeting details.",
    });
  }
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});






