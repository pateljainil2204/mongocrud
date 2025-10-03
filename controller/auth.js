import jwt from "jsonwebtoken"
import auth from "../models/authmodel.js"
import bcrypt from "bcrypt"

const register = async ( req, res ) => {
  const { username, password } = req.body;

  try{
    const existinguser = await auth.findOne({ username });
    if(existinguser) {
        return res.status(400).json({ message: "username already exist" });
    }
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new auth({ username, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "register successful" }); 
  } catch (error) {
     return res.status(400).json({ error: error.message }); 
  }
};

const login = async ( req, res ) => {
    const { username, password } = req.body;

    try {
       const user = await auth.findOne({ username });
    if (!user) {
    return res.status(400).json({ error: "Invalid username or password" });
    }
      const isMatch = bcrypt.compare(password, user.password);
      if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" }); 
    } 
      const payload = { id: user._id, username: user.username };
      const token = jwt.sign(payload, "aaa", { expiresIn: "1y" });
      return res.json({ message: "Login successful", token });
      } catch (error) {
       res.status(400).json({ error: error.message });
    }
};

export { register, login };