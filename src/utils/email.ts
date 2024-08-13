/* eslint-disable @typescript-eslint/ban-ts-comment */
import nodemailer, { Transporter } from 'nodemailer';
import { EmailOptions } from '../api/v1/interfaces/IEmail.js';
import { config } from 'dotenv';

config({ path: './.env' });

const { SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD } = process.env;

export default async function emailService(options: EmailOptions) {
  const transporter = nodemailer.createTransport<Transporter>({
    // @ts-ignore

    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    tls: true,
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  });
  console.log(SMTP_HOST, SMTP_PORT);

  await transporter.sendMail({
    from: 'Quizer <info@aminebadi.ir>',
    to: options.email,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
}
