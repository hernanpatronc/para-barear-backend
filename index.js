const express = require("express");
const fs = require("fs");
const app = express();

const bares = JSON.parse(fs.readFileSync('bares.json',{encoding: 'utf-8'}));

// Cada bar va a tener (por ahora) un nombre, una ubicacion y zona

app.get('/',(req,res)=>{
    res.send("Hola mundo");
})

app.get('/bares',(req,res)=>{
    // me devuelva todos los bares paginados (con limit y skip). Si no hay limit, imponer un limit de 20, y si no hay skip un skip de 0
    // tengo que poder filtrar por zona

})


app.get('/bares/add',(req,res)=>{
    // en el req.query van a estar los datos del bar (push)
})


app.get('/bares/:id',(req,res)=>{

})

app.listen(3000,()=>{
    console.log("App listening on port 3000")
})