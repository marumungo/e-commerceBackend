const nodemailer = require('nodemailer');
const config = require('../config/objectConfig');

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmail_user_app,
        pass: config.gmail_pass_app
    }
});

exports.sendMail = async (destino, subject, html, attachments)=>{
    return await transport.sendMail({
        from: 'Ecommerce <ecommerce.pruebas.backend@gmail.com>',
        to: destino,
        subject,
        html,
        attachments
    });
};
