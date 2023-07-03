const twilio = require('twilio');
const config = require('../config/objectConfig');

const twilio_account_sid = config.twilio_account_sid; 
const twilio_auth_token = config.twilio_auth_token;
const twilio_phone_number = config.twilio_phone_number;

const cliente = twilio(twilio_account_sid, twilio_auth_token);

exports.sendSms = (nombre, apellido) => cliente.messages.create({
    body: `Gracias por tu compra ${nombre} ${apellido}`,
    from: twilio_phone_number,
    to: config.my_phone_number
});

exports.sendWhatsapp = (nombre, apellido) => cliente.messages.create({
    body: `Gracias por tu compra ${nombre} ${apellido}`,
    from: `whatsapp:+14155238886`,
    to: `whatsapp:${config.my_phone_number}`
});
