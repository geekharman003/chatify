import aj from "../lib/arcjet.js";

const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Rate limit exceed.Please try again later." });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({
          message: "Bot access denied.",
        });
      } else {
        return res.status(403).json({
          message: "Access denied by security policy.",
        });
      }
    }

    next();
  } catch (error) {
    console.error("Error in arcjet middleware:", error);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

export default arcjetProtection;
