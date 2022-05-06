import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "./../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ab203c604e1e80",
    pass: "803862a4ea17ad",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Matheus Paes <mhpaes97@gmail.com>",
      subject,
      html: body
    });
  }
}
