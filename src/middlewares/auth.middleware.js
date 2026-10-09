const { verifyAccessToken } = require("../utils/token");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access token is required",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);

    if (typeof payload.sub !== "string") {
      return res.status(401).json({
        message: "Invalid access token",
      });
    }

    req.user = { id: payload.sub };

    next();
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      return res.status(401).json({
        success: false,
        message:
          error instanceof jwt.TokenExpiredError
            ? "Access token has expired"
            : "Invalid access token",
      });
    }

    return next(error);
  }
};

module.exports = authenticate;
