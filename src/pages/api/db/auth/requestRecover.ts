import { randomBytes } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next/types';
import nodemailer from 'nodemailer';

import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email } = req.body.data;

    const user = await prisma.User.findUnique({
      where: { email },
      select: { id: true }
    });

    if (user) {
      const token = randomBytes(32).toString('hex');

      const date = new Date();

      const expires = new Date(date.setHours(date.getHours() + 2));

      await prisma.RecoverToken.updateMany({
        where: { userId: user.id },
        data: { active: false }
      });

      const recoverToken = await prisma.RecoverToken.create({
        data: { token, expires, active: true, userId: user.id }
      });

      if (recoverToken) {
        const mailTransport = nodemailer.createTransport({
          host: 'smtpout.secureserver.net',
          secure: true,
          secureConnection: false, // TLS requires secureConnection to be false
          tls: {
            ciphers: 'SSLv3'
          },
          requireTLS: true,
          port: 465,
          auth: {
            user: process.env.GODADDY_USER,
            pass: process.env.GODADDY_PASSWORD
          }
        });

        const mailOptions = {
          from: 'Sistock <noreply@sistock.com.br>',
          to: email,
          subject: 'Redefinição de senha',
          html: `
            <header>
              <div style="width: 100%; height: 10rem; background: #20aaff; text-align: center;">
                <img src="https://www.sistock.com.br/logo.png" alt="Sistock" style="height: 100%">
              </div>
            </header>
            <div style="width: 100%; height: 10rem; padding-top: 2rem; text-align: center;">
              <p>Redefinição de senha</p>
              <div>Clique no link abaixo para redefinir sua senha</div>
              <br>
              <a href="https://sistock.com.br/recover/${token}">Redefinir senha</a>
            </div>
            <footer style="display: table; width: 100%;">
              <div style="width: 100%; height: 10rem; background: #fafafa; text-align: center; vertical-align: middle; display: table-cell;">Sistock 2022</div>
            </footer>
          `
        };

        mailTransport
          .sendMail(mailOptions)
          .then(() => {
            res.status(200).json('Email de recuperação enviado');
          })
          .catch(err => {
            res.status(500).json({ error: err });
          });
      } else {
        res.status(500).json({ error: 'failed to load data' });
      }
    } else {
      res.status(500).json({ error: 'Usuario não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
