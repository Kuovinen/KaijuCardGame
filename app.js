const express = require('express');
const {readFileSync}=require('fs');
const path=require('path');
const app = express();


app.use(express.static('./public'))
/*
app.get('/about',(req,res)=>{
   res.sendFile(path.join(__dirname+'/public/test.html'));
});*/
app.get('/about',(req,res)=>{
    app.use(express.static('./public/about'))
 });
app.listen(5000, ()=>{
    console.log('\x1b[36m%s\x1b[0m','Port:5000');
    console.log('\x1b[36m%s\x1b[0m','Server status:|ONLINE|');
});


