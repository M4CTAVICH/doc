import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserByUsername, createUser } from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  try {
    const { username, password, role, name } = req.body;
    const existing = await getUserByUsername(username);
    if (existing)
      return res.status(400).json({ error: "Username already exists" });
    const password_hash = await bcrypt.hash(password, 10);
    const user = await createUser({
      username,
      password_hash,
      role,
      name,
    });
    res.status(201).json({
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    if (!user)
      return res.status(401).json({ error: "Invalid username or password" });
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid)
      return res.status(401).json({ error: "Invalid username or password" });
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "8h" }
    );
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
