import { hash } from 'argon2';
import { NextApiRequest, NextApiResponse } from 'next/types';

import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { token, password } = req.body.data;

    const recoverToken = await prisma.RecoverToken.findUnique({
      where: { token },
      select: { token: true, expires: true, userId: true }
    });

    const date = new Date();
    const expireDate = new Date(recoverToken.expires);

    const diff = (expireDate.getTime() - date.getTime()) / 36e5;

    const valid = diff <= 2;

    if (recoverToken && valid && password !== '') {
      const encrypted = await hash(password);

      const user = await prisma.User.update({
        where: { id: recoverToken.userId },
        data: { password: encrypted }
      });
      if (user) {
        res.status(200).json('Senha redefinida com sucesso');
      } else {
        res.status(500).json({ error: 'Erro' });
      }
    } else {
      res.status(500).json({ error: 'Token invalido ou expirado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
