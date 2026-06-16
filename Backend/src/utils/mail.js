import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagerlink.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

  const emailHtml = mailGenerator.generate(options.mailgenContent);

  // const transportor = nodemailer.createTransport({
  //   host: process.env.MAILTRAP_SMTP_HOST,
  //   port: process.env.MAILTRAP_SMTP_PORT,
  //   auth: {
  //     user: process.env.MAILTRAP_SMTP_USER,
  //     pass: process.env.MAILTRAP_SMTP_PASS,
  //   },
  // });

  const transportor = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mail = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transportor.sendMail(mail);
  } catch (error) {
    console.error("Email services failed");
    console.error(error);
  }
};

const emailVerificationMailgenContent = (username, verficatioUrl) => {
  return {
    body: {
      name: username,
      intro: "welcome to our app! we are excited",
      action: {
        instructions:
          "To verify you email please click on the following button",
        button: {
          color: "#6363b7ff",
          text: "Verify",
          link: verficatioUrl,
        },
      },
      outro: "Need help, or have question? just reply to this email ",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "Resetting password request",
      action: {
        instructions: "reset your password click on the following button",
        button: {
          color: "#7ae070ff",
          text: "reset password",
          link: passwordResetUrl,
        },
      },
      outro: "Need help, or have question? just reply to this email ",
    },
  };
};

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};
