import "dotenv/config";
import { envSchema } from "../utils/validationSchemas.js";

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.log(parsedEnv.error.flatten());
  process.exit(1);
}
const PORT = parsedEnv.data.PORT;
const DATABASE_URL = parsedEnv.data.DATABASE_URL;
const JWT_SECRET = parsedEnv.data.JWT_SECRET;
export { PORT, DATABASE_URL, JWT_SECRET };
