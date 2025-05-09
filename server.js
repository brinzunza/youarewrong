import express from 'express';
import bodyParser from 'body-parser';
import { exec } from 'child_process';

import('dotenv').then(dotenv => dotenv.config());

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

function analyzeArgumentInPython(argument, callback) {
    exec(`python3 nlp.py "${argument}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return callback('An error occurred while generating a response.');
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return callback('An error occurred while generating a response.');
        }
        callback(stdout.trim());
    });
}

app.post('/api/argument', (req, res) => {
    const argument = req.body.argument;
    analyzeArgumentInPython(argument, (response) => {
        res.json({ response });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 