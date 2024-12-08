const express = require("express");
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const router = express.Router();
const sendgridApiKey = process.env.SENDGRID_KEY;

sgMail.setApiKey(sendgridApiKey);

router.post('/booking', (req, res) => {
    const {
        fullName,
        email,
        phone,
        carType,
        pickUpDate,
        dropOffDate,
        pickUpPlace,
        dropOffPlace,
        description,
    } = req.body;

    const msg = {
        to: 'dmd@diplomatscarhire.com',
        from: 'sales@diplomatscarhire.com',
        subject: 'New Car Booking Request',
        html: `
            <h2>New Booking Details</h2>
            <table style="border-collapse: collapse; width: 100%;">
                <tr><th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Field</th><th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Details</th></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd;">Full Name</td><td style="padding: 8px; border: 1px solid #ddd;">${fullName}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd;">Phone</td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd;">Car Type</td><td style="padding: 8px; border: 1px solid #ddd;">${carType}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd;">Pick-Up Date</td><td style="padding: 8px; border: 1px solid #ddd;">${pickUpDate}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd;">Drop-Off Date</td><td style="padding: 8px; border: 1px solid #ddd;">${dropOffDate}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd;">Pick-Up Place</td><td style="padding: 8px; border: 1px solid #ddd;">${pickUpPlace}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd;">Drop-Off Place</td><td style="padding: 8px; border: 1px solid #ddd;">${dropOffPlace}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd;">Description</td><td style="padding: 8px; border: 1px solid #ddd;">${description}</td></tr>
            </table>
        `,
    };

    sgMail
        .send(msg)
        .then(() => {
            res.status(200).json({ message: 'Email sent successfully' });
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Error sending email' });
        });
});

module.exports = router;
