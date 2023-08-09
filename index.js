require('dotenv').config();

const express=require('express');
const app=express();
var cors = require('cors');
const axios = require('axios');

const port=process.env.port || 3000;

const TOKEN = process.env.TOKEN;
const CHAT_ID=process.env.CHAT_ID;
const URI_API=`https://api.telegram.org/bot${ TOKEN }/sendMessage`;

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
});
app.use(express.text());

app.use(cors())
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });


app.post('/', (req,res)=>{
    if(req.method === 'OPTIONS') {
        return res.status(200).json(({
            body: "OK"
        }))
    }
    
    axios.post(URI_API,{
        chat_id:CHAT_ID,
        parse_mode:'html',
        text:req.body
    })
})



