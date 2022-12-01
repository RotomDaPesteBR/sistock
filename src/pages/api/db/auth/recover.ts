import { NextApiRequest, NextApiResponse } from 'next/types';
import nodemailer from 'nodemailer';

// import prisma from '../../../../lib/prisma';

const email = 'mielsen.gamer2005@gmail.com';

const token = 'A59F0EJ5GHN7WVC3SM4WVMGBC3SDF563BSD';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // await prisma.account.findMany();
  try {
    /* const transporter = nodemailer.createTransport({
      service: 'Godaddy',
      host: 'smtpout.secureserver.net',
      secure: true,
      tls: {
        ciphers: 'SSLv3'
      },
      requireTLS: true,
      port: 465,
      debug: true,
      auth: {
        user: 'sistockdev@sistock.com.br',
        pass: 'SistockDEV01-'
      }
    });

    const message = {
      from: 'Sistock <sistockdev@sistock.com.br>',
      to: 'mielsen.gamer2005@gmail.com',
      subject: 'Redefinição de senha',
      text: '<p>Redefinição de senha</p><a href="https://sistock.com.br">Sistock</a>'
    };

    transporter
      .sendEmail(message)
      .then(() => {
        console.log('Email sent successfully');
        res.status(200).json('Email sent successfully');
      })
      .catch(err => {
        console.log('Failed to send email');
        console.error(err);
        res.status(500).json(err);
      }); */

    const mailTransport = nodemailer.createTransport({
      host: 'smtpout.secureserver.net',
      secure: true,
      secureConnection: false, // TLS requires secureConnection to be false
      tls: {
        ciphers: 'SSLv3'
      },
      requireTLS: true,
      port: 465,
      debug: true,
      auth: {
        user: 'sistockdev@sistock.com.br',
        pass: 'SistockDEV01-'
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
        <div style="width: 100%; height: 30rem; padding-top: 2rem; text-align: center;">
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
        console.log('Email sent successfully');
      })
      .catch(err => {
        console.log('Failed to send email');
        console.error(err);
      });

    res.status(200).json('ok');
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
