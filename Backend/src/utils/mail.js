import Mailgen from "mailgen";
import nodemailer from "nodemailer";

// Create transporter ONCE
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

const sendEmail = async (options) => {
  try {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Task Manager",
        link: "https://taskmanagerlink.com",
      },
    });

    const emailTextual = mailGenerator.generatePlaintext(
      options.mailgenContent,
    );

    const emailHtml = mailGenerator.generate(options.mailgenContent);

    const mail = {
      from: process.env.EMAIL_USER,
      to: options.email,
      subject: options.subject,
      text: emailTextual,
      html: emailHtml,
    };

    await transporter.sendMail(mail);

    console.log("Email sent successfully to", options.email);
  } catch (error) {
    console.error("Email service failed:");
    console.error(error.message);
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our app! We are excited to have you.",
      action: {
        instructions:
          "To verify your email please click on the following button:",
        button: {
          color: "#6363b7",
          text: "Verify Email",
          link: verificationUrl,
        },
      },
      outro: "Need help or have questions? Just reply to this email.",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "Password reset request received.",
      action: {
        instructions: "Click the button below to reset your password:",
        button: {
          color: "#7ae070",
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro: "Need help or have questions? Just reply to this email.",
    },
  };
};

export {
  sendEmail,
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
};
