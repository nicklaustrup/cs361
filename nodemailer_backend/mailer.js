const nodemailer = require('nodemailer');

// Function to create a transporter
async function createTransporter(transporterConfig) {
    return nodemailer.createTransport(transporterConfig);
}

// Function to send an email
const sendEmail = async (transporterConfig, to, subject, text) => {
    const transporter = await createTransporter(transporterConfig);
    const mailOptions = {
        from: transporterConfig.auth.user,
        to,
        subject,
        text
    };
    
    return transporter.sendMail(mailOptions).then(info=>{
        console.log(`Outbound message | To: ${to} | Preview Email: ${nodemailer.getTestMessageUrl(info)}`)});
    

};

// Function to send emails to a list
const sendEmails = async (transporterConfig, emailList, subject, message) => {
    const results = [];
    for (const email of emailList) {
        try {
            const result = await sendEmail(transporterConfig, email, subject, message);
            results.push({ email, status: 'sent', result });
            
        } catch (error) {
            console.error(`Error sending email to ${email}:`, error);
            results.push({ email, status: 'failed', error: error.message });
        }
    }
    return results;
};

module.exports = { sendEmails };