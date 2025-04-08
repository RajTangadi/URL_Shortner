import Url from "../models/url.model.js";
import { nanoid } from "nanoid";
import useragent from "useragent";
import validUrl from "valid-url";
import moment from "moment";

export const createShortUrl = async (req, res, next) => {
  // console.log("req.user1: ", req.user);

  const { originalUrl, shortCode } = req.body;

  try {
    if (!validUrl.isUri(originalUrl)) {
      return res.status(401).json({ error: "Invalid Url" });
    }

    if (shortCode) {
      const existingUrl = await Url.findOne({ shortCode });
      if (existingUrl) {
        return res.status(400).json({ error: "Short code already in use" });
      }
    }

    if (originalUrl) {
      const existingUrl = await Url.findOne({ originalUrl });
      if (existingUrl) {
        return res.status(400).json({ error: "Url already exists" });
      }
    }

    let generatedCode;
    if (!shortCode) {
      generatedCode = nanoid(6); // Generate 6-char unique code
    } else {
      generatedCode = shortCode;
    }

    const shortUrl = `${process.env.BASE_URL}/${generatedCode}`;
    console.log(shortUrl);

    const newUrl = await Url.create({
      originalUrl,
      shortCode: generatedCode,
      shortUrl: shortUrl,
      user: req?.user?.id,
      status: req.expired ? "inactive" : "active",
      createdAt: moment(req.createdAt).format("MM-DD-YYYY"),
    });
    await newUrl.save();
    res.json(newUrl);
  } catch (error) {
    next(error);
  }
};

export const getUrls = async (req, res, next) => {
  try {
    const urls = await Url.find({ user: req.user.id }).sort({ createdAt: -1 });
    // console.log("urls", urls);
    const formattedUrls = urls.map((url) => ({
      id: url._id,
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      shortUrl: url.shortUrl,
      clicks: url.clicks.length,
      createdAt: moment(url.createdAt).format("MM-DD-YYYY"),
    }));

    res.json({  formattedUrls });
  } catch (error) {
    next(error);
  }
};

export const redirectShortUrl = async (req, res, next) => {
  const { shortCode } = req.params;

  try {
    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) return res.status(404).send("URL Not found");

    const agent = useragent.parse(req.headers["user-agent"]);
    urlDoc.clicks.push({
      referrer: req.get("Referrer") || "Direct",
      userAgent: agent.toString(),
    });
    await urlDoc.save();

    res.redirect(urlDoc.originalUrl);
  } catch (error) {
    next(error);
  }
};
