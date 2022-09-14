const nodemailer = require("nodemailer");

class Email {
  constructor(user, otp) {
    this.to = user.email.emailId;
    this.otp = otp;
    this.name = `${user.firstName} ${user.lastName}`;
    this.from = process.env.EMAIL_FROM;
  }

  newTransporter() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async send(subject) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: this.to,
      subject,
      text: `OTP : ${this.otp}`,
    };
    await this.newTransporter().sendMail(mailOptions);
  }
}
module.exports = Email;
