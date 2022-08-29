const express = require('express');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const app = express();
const port = 3000;

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => { res.status(200).render('index'); });

app.get('/projects', async (req, res) => {
    let repoURL = 'https://api.github.com/users/jakebuhite/repos';
    try {
        const gitResults = await axios.get(repoURL);
        res.status(200).render('projects', {data: gitResults.data});
    } catch (err) {
        console.error(err);
        res.status(400).send("Error: Please try again");
    }
});

app.get('/contact', (req, res) => { res.status(200).render('contact'); });
app.post('/contact', (req, res) => { res.status(200).render('contact'); });

app.get('/resume', (req, res) => {
    const path = './public/buhite-resume.pdf'
    if (fs.existsSync(path)) {
        res.contentType("application/pdf");
        fs.createReadStream(path).pipe(res);
    } else {
        res.status(500);
        res.send('File not found');
    }
});

// 404
app.get('*', function(req, res){ res.status(404).render('404'); });
  
// Start server
app.listen(port, () => { console.log(`App listening on port ${port}`) });