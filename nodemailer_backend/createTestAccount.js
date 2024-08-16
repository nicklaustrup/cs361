const nodemailer = require('nodemailer');

async function createTestAccount() {
    let testAccount = await nodemailer.createTestAccount();
    console.log(testAccount);
}

createTestAccount();