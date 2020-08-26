const nodemailer = require('nodemailer')

async function sendEmail(email, code) {
    const transport = nodemailer.createTransport({
        host: process.env.MTHost || 'smtp.mailtrap.io',
        port: process.env.MTPort || 2525,
        auth: {
            user: process.env.MTUsername,
            pass: process.env.MTPassword
        }
    })

    const mailOptions = {
        from: 'estatefairy@server.com',
        to: email,
        subject: 'ShoganOnBoarding App Forget Password code',
        text: `code: ${code}`,
        html: `<p>code: <strong>${code}<strong></p>`
    }

    return await transport.sendMail(mailOptions)
}

function getCode() {
    let code = ''

    for (let i = 0; i < 6; i++) {
        code += '' + Math.floor(Math.random() * 10)
    }

    return code
}


module.exports = { getCode, sendEmail }
