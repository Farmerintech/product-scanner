import Jwt from "jsonwebtoken";

export const AuthMiddleware = (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({ message: "Unauthorized: Missing or malformed token." });
        }

        // Remove "Bearer " prefix and trim any whitespace
        const token = authHeader.replace("Bearer ", "").trim();

        // Verify the token
        const decoded = Jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token." });
        }

        // Attach decoded user data to the request object
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token format.", error: error.message });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired.", error: error.message });
        }
        return res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
    }
};
