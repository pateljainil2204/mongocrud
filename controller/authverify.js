import jwt from "jsonwebtoken";

function authentication(req, res, next) {
  const authHeader = req.headers["authorization"];
  const key = authHeader && authHeader.split('Bearer ')[1]; 

  if (!key) {
    return res.status(401).json({ error: "token required" });
  }

  jwt.verify(key, "aaa", (err, user) => {    
    if (err) return res.status(403).json({ error: "invalid or expire token" });
    req.user = user; 
    next();
  });
}

export default authentication;
