import Url from "../models/url.model.js";
import { nanoid } from "nanoid";
import useragent from "useragent";
import validUrl from "valid-url";

export const createShortUrl = async (req, res) => {
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
    // console.log(generatedCode);

    const shortUrl = `${process.env.BASE_URL}/${generatedCode}`;
    const newUrl = await Url.create({
      originalUrl,
      shortCode: generatedCode,
      shortUrl,
      user: req.user._id,
    });
    await newUrl.save();
    res.json(newUrl);
  } catch (error) {
    next(error);
  }
};

export const getUrls = async (req, res) => {
  try {
    const urls = await Url.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(urls); // return user’s URLs sorted by creation date
  } catch (error) {
    next(error);
  }
};

export const redirectShortUrl = async (req, res) => {
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
