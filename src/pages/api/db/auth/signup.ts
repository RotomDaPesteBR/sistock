import { hash } from 'argon2';
import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const { name, email, password, establishmentName } = req.body.data;

      const encrypted = await hash(password);

      const User = await prisma.User.create({
        data: {
          name,
          email,
          password: encrypted,
          establishmentName
        }
      });
      if (User) {
        // createSign('');
        // const iv = randomBytes(32).toString('hex');
        res.status(200).json('Conta criada com sucesso');
      }
    }
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
