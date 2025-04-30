// utils/sendEmail.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Ifeaborkosi@gmail.com',
    pass: 'gffa wjgq dtzq ixsi' 
  }
});

const sendGiftCardNotification = async () => {
    await transporter.sendMail({
      from: '"Gift Castle" <Ifeaborkosi@gmail.com>',
      to: 'Ifeaborkosi@gmail.com',
      subject: '📩 New Gift Card Submission',
      html: `
        <div style="background-color: #f4f4f9; color: #333333; padding: 20px; font-family: Arial, sans-serif; border-radius: 10px; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center;">
            <img src="https://i.postimg.cc/1RdVy7gs/favicon-96x96.png" alt="Gift Castle Logo" style="width: 120px; margin-bottom: 20px;" />
          </div>
          <h2 style="color: #696fdd;">🎁 Gift Card Wave Notification</h2>
          <p style="color: #444444;">Hey Admin,</p>
          <p style="color: #444444;">A <strong>new gift card</strong> has just been submitted on the platform.</p>
          <hr style="border: 1px solid #d1d5db;">
          <p style="color: #444444;">To view the details and manage gift cards, visit the admin page.</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://gcw.onrender.com/admin" style="background-color: #696fdd; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; display: inline-block;">Go to Admin</a>
          </div>
          <p style="color: #b7b9bc; font-size: 12px; text-align: center; margin-top: 20px;">This is an automated message from Gift Castle.</p>
        </div>
      `
    });
  };
  

module.exports = sendGiftCardNotification;
