import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = req.body;
    console.log(data);
    const user = await prisma.User.update({
      where: { id: data.user },
      data: {
        name: data.nome,
        email: data.email,
        password: data.senha,
        image: data.imagem,
        restaurantName: data.restaurantName,
        cpf: data.CPF
      }
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
