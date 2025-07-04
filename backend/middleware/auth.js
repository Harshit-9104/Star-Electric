import jwt from 'jsonwebtoken';

// const authMiddleware = async (req, res, next) => {
//     const {token} = req.headers; 
//     if (!token) {
//         return res.json({ message: 'No token provided, authorization denied' });
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.body.userId = decoded.id; // Attach user ID to the request body
//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         console.log(error);
//         return res.json({ message: 'Token is not valid' });
//     }
// }

// const authMiddleware = async (req, res, next) => {
//     const { token } = req.headers;
//     if (!token) {
//         return res.json({ message: 'No token provided, authorization denied' });
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // ✅ Fix: Ensure req.body exists
//         req.body = req.body || {};
//         req.body.userId = decoded.id;

//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         console.log(error);
//         return res.json({ message: 'Token is not valid' });
//     }
// };

// const authMiddleware = async (req, res, next) => {
//     const token = req.headers.token;

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided, authorization denied' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         if (!req.body) req.body = {}; // Make sure body exists

//         req.userId = decoded.id; // Attach userId from token
//         next();
//     } catch (error) {
//         console.log('JWT Error:', error);
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// };

// const authMiddleware = async (req, res, next) => {
//   const token = req.headers.token;

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.body = req.body || {};
//     req.body.userId = decoded.id;
//     next();
//   } catch (error) {
//     console.log("JWT Error:", error);
//     res.status(403).json({ message: "Token is invalid" });
//   }
// };

const authMiddleware = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 🛠️ Attach userId properly
    if (!req.body) req.body = {};
    req.body.userId = decoded.id;

    next();
  } catch (error) {
    console.error("JWT Error:", error);
    res.status(403).json({ message: 'Token is not valid' });
  }
};



export default authMiddleware;