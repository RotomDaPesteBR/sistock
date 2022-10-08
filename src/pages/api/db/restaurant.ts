import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = req.body;
    const restaurant = await prisma.user.findUnique({
      where: { id: data },
      select: { restaurantName: true }
    });
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
