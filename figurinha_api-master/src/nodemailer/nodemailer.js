require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports = async (email, link) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    
    return new Promise((resolve, reject)=>{
        transporter.sendMail({
            from: '"Base Teste" <baseteste23@gmail.com>',
            to: `${email}`,
            subject: "Olá",
            text: "Para ativar sua conta clique no seguinte botão", // plain text body
            html: `<a href='${link}'> Aqui </a>`,
        })
        .then((result)=>{
            resolve(result);
        })
        .catch((error)=>{
            reject(error);
        })
    });
}