import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  console.log(await getSession(context));
  return {
    props: {
      session: await getSession(context)
    }
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await getSession();
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
