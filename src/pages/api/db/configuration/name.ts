import { verify } from 'argon2';
import { NextApiRequest, NextApiResponse } from 'next/types';
// import { createSign } from 'crypto';

import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const { data } = req.body;
      const account = await prisma.User.findUnique({
        where: {
          id: data.user
        },
        select: {
          password: true
        }
      });
      if (await verify(account.password, data.password)) {
        await prisma.User.update({
          where: { id: data.user },
          data: {
            name: data.name
          }
        });
        res.status(200).json(`Nome editado com sucesso`);
      } else {
        res.status(500).json({ error: 'Senha invalida' });
      }
    } else {
      res.status(500).json({ error: 'failed to load data' });
    }
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
