const express = require ('express');
//dados de conexao com o banco
const { MongoClient } = require('mongodb');
const DB_URL = "mongodb://localhost:27017";
const DB_NAME = "teste"

async function main () {
//conectando com o banco
console.log("Conectando com o banco de dados...")
const client =  await MongoClient.connect(DB_URL)
const db = client.db(DB_NAME)
const collection = db.collection("cliente")
console.log("Banco de dados conectado com sucesso!")
//rodando servidor
const app = express()
app.use(express.json())
const port = 3000


//rotas

app.get("/dados", async (req,res)=>{
    const clientes = await collection.find().toArray();
    res.send(clientes)
});

app.get("/dados/:_id",async(req,res)=>{

    const { _id } = req.params
    await collection.findOne(_id);
    res.send("ok")

})

app.post("/dados", async (req,res)=>{
    const dados = req.body
    await collection.insertOne(dados)
    res.send(dados)
});

app.delete("/dados:_id",async (req,res)=>{
    const dados =req.params._id
    await collection.findOneAndDelete(dados)
    res.send("Dados deletados")
})


/*app.post("/dados", async (req,res)=>{
    const dados_cliente = {
        nome: req.body.nome,
        idade: req.body.idade,
        naturalidade: req.body.naturalidade        
    }
    await collection.insertOne(dados_cliente)
    res.send("Dados inseridos com sucesso!")
    console.log(req.body)  
});*/

app.delete("/dados/:_id",async (req,res)=>{

    const cod_cliente = {idade: req.params._id}
    console.log(cod_cliente)
    await collection.findOneAndDelete({cod_cliente})

    /*const { _id } = req.params._id;
    const user = await collection.findOneAndDelete({_id})*/
    res.json(cod_cliente)
    res.send("Usuário deletado com sucesso")

});





app.listen(port, ()=>{console.log(`Servidor rodando na porta: ${port}`)})

} main ()