const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    res.send('Hello from Event Near')
})

app.listen(3001, ()=>{
    console.log('SERVER UP AND RUNNING ON 3001')
})