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
            <div style="display: table; width: 100%; background: #fafafa;">
              <div style="display: table-cell; vertical-align: middle; text-align: center;">
                <div style="margin:0px auto;max-width:640px;background:transparent">
                  <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent" align="center" border="0">
                    <tbody>
                      <tr>
                        <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;">
                          <div aria-labelledby="mj-column-per-100" class="m_6020279825772921234mj-column-per-100" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="word-break:break-word;font-size:0px;padding:0px" align="center">
                                    <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px" align="center" border="0">
                                      <tbody>
                                        <tr>
                                            <td style="width:138px">
                                              <a href="https://www.sistock.com.br/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.sistock.com.br/">
                                                <img alt="" title="" src="https://www.sistock.com.br/logoalt.png" style="height: 10rem;" class="CToWUd" data-bit="iit">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style="max-width:640px;margin:0 auto;border-radius:4px;overflow:hidden">
                  <div style="margin:0px auto;max-width:640px;background:#ffffff">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff" align="center" border="0">
                      <tbody>
                        <tr>
                          <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 50px">
                            <div aria-labelledby="mj-column-per-100" class="m_6020279825772921234mj-column-per-100" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                  <tr>
                                    <td style="word-break:break-word;font-size:0px;padding:0px" align="left">
                                      <div style="color:#737f8d;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:16px;line-height:24px;text-align:left">
                                        <h2>Redefinição de senha</h2>
                                        <div>Clique no botão para redefinir sua senha</div>
                                        <br />
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                            <td align="center">   
                                              <a href="https://sistock.com.br/recover/${token}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                                                <div style="width: 100%; background: #1363DF; max-width: 280px; text-align: center; padding-top: 1rem; padding-bottom: 1rem; color: white; text-decoration: none; border-radius: 10px;">
                                                  Redefinir senha
                                                </div>
                                              </a>
                                            </td>
                                          </tr>
                                        </table>
                                        <br />
                                        <div>Ou acesse o link abaixo</div>
                                        <a href="https://sistock.com.br/recover/${token}" style="word-break: break-all;">https://sistock.com.br/recover/${token}</a>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div style="margin:0px auto;max-width:640px;background:transparent">
                  <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent" align="center" border="0">
                    <tbody>
                      <tr>
                        <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px">
                          <div aria-labelledby="mj-column-per-100" class="m_6020279825772921234mj-column-per-100" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%">
                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="word-break:break-word;font-size:0px;padding:0px" align="center">
                                    <div style="color:#99aab5;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:12px;line-height:24px;text-align:center">
                                      Enviado por <span class="il">Sistock</span>
                                      <!-- •
                                      <a href="https://www.sistock.com.br/" style="color:#1eb0f4;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://click.discord.com/ls/click?upn%3DqDOo8cnwIoKzt0aLL1cBeHN2Bg5UBi6nJegCqE7rzswec30BdfDZLIuq6fJ2wlEZEaIJ_pcYWH95Laj4Y5v-2F8vUG-2Fe4e89SFDc-2FEE1RfqvcOcKO9Opph3XRsjCLnTni-2FW5OwPtxJxkKdgxS6oc5TCp6u9mlmk6IFqUzn3fSaV6OmqA97lIygvH6YFGL0AQkc57e-2FyGk4rUFI-2B4f2HM-2Fm7jcgjHJyXy15V2wO4iWdJfmb1RJtQWdiJDRPCBsytGmuSb1gxpZW3K4AqdJwDMCPCPR0fWh0hXL8Ui4f6vBiyl0EgR-2Fe7Nsjb87XoSY16ijNaweFOi0x2aPEIaz-2BjsQGyRH5wCw-3D-3D&amp;source=gmail&amp;ust=1670411708784000&amp;usg=AOvVaw2CSolh0R6mWiXoIC4PdzHi">Confira nosso blog</a>
                                      • <a href="https://www.sistock.com.br/" style="color:#1eb0f4;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://click.discord.com/ls/click?upn%3DqDOo8cnwIoKzt0aLL1cBeHLasbud5D3vi74o1Q-2B2VLcLLCDOodJpEqop-2Fc-2F5Wr6ZYzP7_pcYWH95Laj4Y5v-2F8vUG-2Fe4e89SFDc-2FEE1RfqvcOcKO9Opph3XRsjCLnTni-2FW5OwPtxJxkKdgxS6oc5TCp6u9mn5Wyl310p1mQJc2FJcxvu4KkRz3EfmMJ-2FQeOPNSnEgvOn6YCsGhlHkgH-2Fen8roQgNI1DCdNrEyGyoZ5p8mGpy-2Fob9CQOA0xeJtiCfhDaq14jQloQbBl3AkuPFhdHT5BqB-2BEh5-2BZfEWLhscWIh-2B9AGUso-2FFA65NesH19f8Wai6oUf0fcqupHeiohMIOQtBsWaA-3D-3D&amp;source=gmail&amp;ust=1670411708784000&amp;usg=AOvVaw33-JR3R7oZgL0Pr6N4nrTU">@<span class="il">discord</span></a>
                                    </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px" align="center"><div style="color:#99aab5;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:12px;line-height:24px;text-align:center">
                                      444 De Haro Street, Suite 200, San Francisco, CA 94107-->
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="word-break:break-word;font-size:0px;padding:0px" align="left">
                                    <div style="color:#000000;font-family:Whitney,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:13px;line-height:22px;text-align:left">
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
