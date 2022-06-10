const http = require('http');
const https = require('https');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    https.get('https://time.com/', (response) => { 
        let data = '';
        response.on('data', (chunk) => {
              data += chunk.toString();
        });
        response.on('end', () => {
            let lines = data.split('\n');
            let rawArray = lines.filter(line => line.includes('latest-stories__item-headline'));
            let finalTitles = []
            rawArray.forEach(element => {
                finalTitles.push({title: element.split('">')[1].split('</')[0]})
            });
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(finalTitles));
        });
    })
});

server.listen(PORT, () => {
    console.log('Server is running on port 3000');
});