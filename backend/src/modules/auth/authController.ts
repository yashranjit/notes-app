import { Response, Request } from "express";
import { loginSchema, registerSchema } from "../../utils/validationSchemas.js";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../../config/envConfig.js";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const parsedBody = registerSchema.safeParse(req.body);

  // if the input is invalid
  if (!parsedBody.success) {
    return res.json({
      message: "Invalid input",
      error: parsedBody.error.flatten(),
    });
  }

  // if input is valid
  const { name, email, password } = parsedBody.data;
  try {
    // u can rely on db errors but good practice is doing a precheck
    // and handle db error
    const userExists = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (userExists) {
      return res.json({ message: "user already exists" });
    }
    // if user is not present:
    const hashedPassword = await bcrypt.hash(password, 10);
    const [newUser] = await db
      .insert(users)
      .values({ name, email, password: hashedPassword })
      .returning({
        userId: users.id,
        userName: users.name,
        userEmail: users.email,
      });

    const token = jwt.sign({ userId: newUser.userId }, JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.json({
      token,
      userName: newUser.userName,
      userEmail: newUser.userEmail,
      message: "Registration successful",
    });
  } catch (err) {
    return res.json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const parsedBody = loginSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res.json({
      message: "Invalid input",
      error: parsedBody.error.flatten(),
    });
  }

  const { email, password } = parsedBody.data;
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!user) {
      return res.json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.json({
      message: "Login successful",
      token,
      userName: user.name,
      userEmail: user.email,
    });
  } catch (err) {
    return res.json({ message: "Internal server error" });
  }
};
