const express = require('express');
const gateway = require('fast-gateway');

const app = express();
const port = 9091;

const server = gateway({
    routes:[
        {
            prefix:"/user",
            target:"http://localhost:8081/",
            hooks:{},
        },
        {
            prefix:"/emergency",
            target:"http://localhost:8082/",
            hooks:{},
        },
        {
            prefix:"/repair",
            target:"http://localhost:8083/",
            hooks:{},
        },
        {
            prefix:"/payment",
            target:"http://localhost:8084/",
            hooks:{},
        },
        {
            prefix:"/insurance",
            target:"http://localhost:8085/",
            hooks:{},
        }
    ]
});


// app.use(server.middleware());


app.listen(port, () =>{
    console.log('APT Gateway running on port 9091');
});