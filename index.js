const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");

const {properties, mandatoryProperties} = require("./bar");

app.use(cors());

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
    const search = req.query.search;
    let baresFiltrados = zona ? bares.filter(bar=>bar.zona === zona) : bares;
    baresFiltrados = search ? baresFiltrados.filter(bar=>bar.nombre.toLowerCase().includes(search.toLowerCase())) : baresFiltrados;
    res.json(baresFiltrados.slice(skip,skip+limit).map(elemento=>{
        return {
            id: elemento.id,
            nombre: elemento.nombre,
            zona: elemento.zona,
            logo: elemento.logo
        }
    }))
})


app.get('/bares/add',(req,res)=>{
    // en el req.query van a estar los datos del bar (push)
    const bar = {};
    for (let property of properties){
        bar[property] = req.query[property];
    }
    bares.push(bar);
    fs.writeFileSync('bares.json',JSON.stringify(bares),{encoding: 'utf-8'})
    res.send('Bar agregado')
})

app.get('/bares/:id/modify',(req,res)=>{
    // en el req.query van a estar los datos del bar (push)
    const bar = {};
    for (let property of properties){
        bar[property] = req.query[property];
    }
    
    bares[req.params.id] = bar;
    fs.writeFileSync('bares.json',JSON.stringify(bares),{encoding: 'utf-8'})
    res.send('Bar modificado')
})


app.get('/bares/:id',(req,res)=>{
    const bar = bares.find(bar=>bar.id == req.params.id)
    res.json(bar)
})

app.listen(3000,()=>{
    console.log("App listening on port 3000")
})