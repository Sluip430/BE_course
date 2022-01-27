const sendGrid = require('@sendgrid/mail');
const API_KEY = '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';
sendGrid.setApiKey(API_KEY);

const sendMessage = async (url : any) =>{
    await sendGrid.send({
        to: 'olegcigulev@gmail.com',
        from: 'miha1488plet@gmail.com',
        subject: 'Testing sandGrid',
        text: 'Viatcheslav sand this mail!',
        html: `<h1>You Image was sucsesfull upload. Url = ${url}</h1>`
    });
}

module.exports = { sendMessage };
