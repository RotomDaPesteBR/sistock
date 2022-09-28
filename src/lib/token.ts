import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export default async (req, res) => {
    const secret = process.env.NEXT_AUTH_SECRET;
    const token = await getToken({
      req: req,
      secret: secret,
      raw: true,
    });
  const payload = jwt.verify(token, process.env.NEXT_AUTH_SECRET);
  console.log(payload);
};