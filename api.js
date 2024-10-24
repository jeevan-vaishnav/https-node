"Strict-Transport-Security"

const https = require('node:https');
const fs = require('node:fs');

const options = {
    key:fs.readFileSync('server-key.pem'),
    cert : fs.readFileSync('server-cert.pem')
}

const apiHandler = (req,res) => {
    if(req.url === '/api' && req.method ==='GET'){
        console.log('if')
        res.writeHead(200,
            {
                'Content-Type':'application/json',
                'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
        });
        res.end(JSON.stringify({message:'Secure Hello World!'}))
        
    }else{
        console.log('else')
        res.writeHead(404);
        res.end('Not Found')
    }
}

https.createServer(options,apiHandler).listen(3000,()=>{
    console.log('HTTPS API server running on port 3000');
})