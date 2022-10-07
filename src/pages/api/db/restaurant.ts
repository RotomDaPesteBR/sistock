import { NextApiRequest, NextApiResponse } from 'next/types';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const email = 'mielsen.gamer2005@gmail.com';
    const restaurant = await prisma.user.findUnique({
      where: { email },
      select: { restaurantName: true }
    });
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
