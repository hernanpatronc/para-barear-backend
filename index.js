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
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const zona = req.query.zona;
    const baresFiltrados = zona ? bares.filter(bar=>bar.zona === zona) : bares
    res.json(baresFiltrados.slice(skip,skip+limit))
})


app.get('/bares/add',(req,res)=>{
    // en el req.query van a estar los datos del bar (push)
    const bar = {
        nombre: req.query.nombre,
        ubicacion: req.query.ubicacion,
        zona: req.query.zona
    }
    bares.push(bar);
    fs.writeFileSync('bares.json',JSON.stringify(bares),{encoding: 'utf-8'})
    res.send('Bar agregado')
})

app.get('/bares/:id/modify',(req,res)=>{
    // en el req.query van a estar los datos del bar (push)
    const bar = {
        nombre: req.query.nombre,
        ubicacion: req.query.ubicacion,
        zona: req.query.zona
    }
    bares[req.params.id] = bar;
    fs.writeFileSync('bares.json',JSON.stringify(bares),{encoding: 'utf-8'})
    res.send('Bar modificado')
})


app.get('/bares/:id',(req,res)=>{
    const bar = bares[req.params.id]
    res.json(bar)
})

app.listen(3000,()=>{
    console.log("App listening on port 3000")
})