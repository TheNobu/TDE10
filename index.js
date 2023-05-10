const express = require("express");

const server = express();

server.use(express.json());


let products = [
   { 
    id: 1,
    nome: "SF5",
    descricao: "Comprar",
    isDone: false
   },
   {
    id: 2,
    nome: "KOF XV",
    descricao: "Comprar",
    isDone: false
   }
]

server.get("/tasks",(req,res)=>{
    res.json({
        products
    })
})
server.post("/tasks",(req,res)=>{
    console.log(req.body)
    const newProducts = {
        id: products.length + 1,
        nome: req.body.nome,
        descricao: req.body.descricao,
        isDone: req.body.isDone
    }
    products.push(newProducts);
    res.json({
        products:newProducts
    })
})
server.put("/tasks/:id",(req,res)=>{
    const id = Number(req.params.id)
    const product = products.find((product)=>{
        return product.id == id;
    })
    product.nome = req.body.nome;
    product.descricao = req.body.descricao;
    product.isDone = req.body.isDone;
    res.json({
        product
    })
})
server.delete("/tasks/:id",(req,res)=>{
    const id = Number(req.params.id);
    products = products.filter((product)=>{
        return product.id != id;
    })
    res.status(204).send();
})

const port = 8080;
server.listen(port,()=>{
    console.log(`Servidor is running on port ${port}`);
})