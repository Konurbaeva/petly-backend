const sgMail = require('@sendgrid/mail');
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
    try {
        const email = {...data, from: "olexiy.solotvinskiy@gmail.com"}
        await sgMail.send(email);
        console.log('Email send successfull');
    } catch (error) {
        console.log('send error', error);
    }
}
module.exports = {
    sendEmail
}