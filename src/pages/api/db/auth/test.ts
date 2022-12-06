import { NextApiRequest, NextApiResponse } from 'next/types';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
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
        user: process.env.GODADDY_USER,
        pass: process.env.GODADDY_PASSWORD
      }
    });

    const mailOptions = {
      from: `noreply@sistock.com.br`,
      to: `mielsen.gamer2005@gmail.com`,
      subject: `This is a Test Subject`,
      text: `Hi Bharat    

    Happy Halloween!

    If you need any help, please contact us.
    Thank You. And Welcome!

    Support Team
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
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
