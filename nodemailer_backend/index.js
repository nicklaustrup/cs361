const express = require('express');
const bodyParser = require('body-parser');
const { sendEmails } = require('./mailer');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();


const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

const saveResultsToFile = (results) => {
    const filePath = path.join(__dirname, 'resultsEx.json');
    fs.writeFileSync(filePath, JSON.stringify({ results }, null, 2), 'utf8');
};

// Endpoint to receive email requests
app.post('/send-emails', async (req, res) => {
    console.log("emails: ", req.body);
    const { emails, subject, message } = req.body;

    const transporter = {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'jeanie.kulas@ethereal.email',
            pass: 'qCJtCypgDhxMrwmbje'
        }
    };

    if (!emails || !subject || !message || !transporter) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const results = await sendEmails(transporter, emails, subject, message);
        saveResultsToFile(results);
        res.status(200).json({ results });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Function to read from local JSON file and send request
app.get('/test-local-json', async (req, res) => {
    try {
        const jsonFilePath = path.join(__dirname, 'test-emails.json');
        const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
        const requestData = JSON.parse(jsonData);

        const { emails, subject, message, transporter } = requestData;

        const results = await sendEmails(transporter, emails, subject, message);
        saveResultsToFile(results);
        res.status(200).json({ results });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Email is running on ${port}`);
});