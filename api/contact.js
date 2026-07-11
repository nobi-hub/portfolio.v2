const nodemailer = require('nodemailer');

if (process.env.NODE_ENV !== 'production') {
  try {
    require('dotenv').config();
  } catch (error) {
    console.warn('dotenv not loaded:', error.message);
  }
}

const emailConfigIsReady = Boolean(
  process.env.EMAIL_HOST &&
  process.env.EMAIL_PORT &&
  process.env.EMAIL_USER &&
  process.env.EMAIL_PASS &&
  process.env.EMAIL_TO
);

let transporter = null;

if (emailConfigIsReady) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please complete all required fields.' });
  }

  const mailData = {
    from: `${name} <${email}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER || 'no-reply@example.com',
    subject: 'New portfolio contact form message',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  if (transporter) {
    try {
      await transporter.sendMail(mailData);
      return res.status(200).json({ message: 'Message sent successfully.' });
    } catch (error) {
      console.error('Email send error:', error);
      return res.status(500).json({ error: 'Unable to send email. Check server logs.' });
    }
  }

  console.log('Contact form submission:', mailData);
  return res.status(200).json({ message: 'Message received. Email service is not configured.' });
};