import Analytics from "../models/analytics.js";
import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";

// Track click
export const trackClick = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const referrer = req.headers.referer || "Direct";

    // Get location data
    const geo = geoip.lookup(ip);

    // Parse user agent
    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser().name;
    const device = parser.getDevice().type || "Desktop";

    const clickData = {
      ip,
      userAgent,
      referrer,
      country: geo?.country || "Unknown",
      city: geo?.city || "Unknown",
      device,
      browser,
    };

    let analytics = await Analytics.findOne({ shortUrl });

    if (!analytics) {
      analytics = new Analytics({
        shortUrl,
        clicks: [clickData],
      });
    } else {
      analytics.clicks.push(clickData);
    }

    await analytics.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get analytics data
export const getAnalytics = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const { period = "7d" } = req.query;

    const analytics = await Analytics.findOne({ shortUrl });
    if (!analytics) {
      return res.status(404).json({ error: "No analytics data found" });
    }

    // Calculate time range
    const now = new Date();
    let startDate;
    switch (period) {
      case "1d":
        startDate = new Date(now - 24 * 60 * 60 * 1000);
        break;
      case "7d":
        startDate = new Date(now - 7 * 24 * 60 * 60 * 1000);
        break;
      case "30d":
        startDate = new Date(now - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now - 7 * 24 * 60 * 60 * 1000);
    }

    // Filter clicks by date range
    const filteredClicks = analytics.clicks.filter(
      (click) => new Date(click.timestamp) >= startDate
    );

    // Process data for dashboard
    const stats = {
      totalClicks: filteredClicks.length,
      clicksByCountry: {},
      clicksByReferrer: {},
      clicksByDevice: {},
      clicksByBrowser: {},
      clicksByTime: {},
      dailyClicks: {},
    };

    filteredClicks.forEach((click) => {
      // Country stats
      stats.clicksByCountry[click.country] =
        (stats.clicksByCountry[click.country] || 0) + 1;

      // Referrer stats
      stats.clicksByReferrer[click.referrer] =
        (stats.clicksByReferrer[click.referrer] || 0) + 1;

      // Device stats
      stats.clicksByDevice[click.device] =
        (stats.clicksByDevice[click.device] || 0) + 1;

      // Browser stats
      stats.clicksByBrowser[click.browser] =
        (stats.clicksByBrowser[click.browser] || 0) + 1;

      // Time-based stats
      const date = new Date(click.timestamp).toISOString().split("T")[0];
      stats.dailyClicks[date] = (stats.dailyClicks[date] || 0) + 1;
    });

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
