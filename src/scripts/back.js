const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Configuração do Nodemailer (altere com suas credenciais e configurações de e-mail)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Altere para o seu provedor de e-mail
    auth: {
        user: 'mxwlladriano@gmail.com', // Altere para o seu endereço de e-mail
        pass: 'Ma76521879' // Altere para a sua senha de e-mail
    }
});

// Middleware para analisar o corpo da solicitação
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para processar o envio do formulário (não altere esta parte)
app.post('/enviar-contato', (req, res) => {
    const { nome, email, telefone, mensagem } = req.body;

    // Configuração do e-mail
    const mailOptions = {
        from: 'mxwlladriano@gmail.com', // Altere para o seu endereço de e-mail
        to: 'mxwlladriano@gmail.com', // Altere para o endereço de e-mail do destinatário
        subject: 'Contato do Formulário', // Assunto do e-mail
        text: `Nome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}\nMensagem: ${mensagem}` // Corpo do e-mail
    };

    // Enviar e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Erro ao enviar o e-mail');
        } else {
            console.log('E-mail enviado: ' + info.response);
            res.send('E-mail enviado com sucesso');
        }
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
