const nodemailer = require('nodemailer');
const config = require('../config/objectConfig');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmail_user_app,
        pass: config.gmail_pass_app
    }
});

// exports.sendMail = async (destino, subject, html, attachments)=>{
//     return await transport.sendMail({
//         from: 'Ecommerce <ecommerce.pruebas.backend@gmail.com>',
//         to: destino,
//         subject,
//         html,
//         attachments
//     });
// };

const generateResetPasswordLink = (email) => {
    const token = jwt.sign({ email }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
    return `http://localhost:8080/api/sessions/resetPassword?token=${token}`;
};

exports.sendMail = async (destino) => {
    const resetPasswordLink = generateResetPasswordLink(destino);
    const html = `
        <h1>Hola! Olvidaste tu contraseña</h1>
        <p>Accedé al siguiente link para recuperarla:</p>
        <a href="${resetPasswordLink}">${resetPasswordLink}</a>`;

    return await transport.sendMail({
        from: 'Ecommerce <ecommerce.pruebas.backend@gmail.com>',
        to: destino,
        subject: "Reset Password!",
        html
    });
};
