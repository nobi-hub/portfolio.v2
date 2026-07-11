const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

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
      return res.json({ message: 'Message sent successfully.' });
    } catch (error) {
      console.error('Email send error:', error);
      return res.status(500).json({ error: 'Unable to send email. Check server logs.' });
    }
  }

  console.log('Contact form submission:', mailData);
  return res.json({ message: 'Message received. Email service is not configured.' });
});

app.use(express.static(path.join(__dirname, '.')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  if (!emailConfigIsReady) {
    console.log('Email is not configured. Set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, and EMAIL_TO in .env.');
  }
});
