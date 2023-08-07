const transport = require("./nodemailer.transporter");

const sendEmail = () => {
  return new Promise((resolve, reject) => {
    try {
      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: "jahidhasan6484@gmail.com",
        subject: "Account Verification",
        html: "Test email",
      };

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error while sending email:", error);
          reject({ error });
        } else {
          console.log("Email sent successfully:", info.response);
          resolve({ info, verificationToken });
        }
      });
    } catch (error) {
      console.error("Error while rendering the EJS template:", error);
      reject({ error });
    }
  });
};

module.exports = {
  sendEmail,
};
