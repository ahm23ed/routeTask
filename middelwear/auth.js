import jwt from "jsonwebtoken";
import { userModel } from "../DB/models/user.model.js"
export const auth = () => {
return async (req, res, next) => {
    try {
    const { authorization } = req.headers;
    if (!authorization?.startsWith(process.env.BearerKey)) {
        return res.status(401).json({ message: "Invalid token or Bearer key" });
        }
        const token = authorization.split(process.env.BearerKey)[1];
        const decoded = jwt.verify(token, process.env.TOKENSIGNATURE);
        console.log(decoded.isLoggedIn);
        if (!decoded?.id || !decoded.isLoggedIn) {
        
            return res.status(401).json({ message: "Invalid payload in token" });
        }
        const user = await userModel.findById(decoded.id).select("email name code password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user; 
        next();
        } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(500).json({ message: "Authentication error", error: error.message });
        }
    };
    };
