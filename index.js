const express = require ('express');
//dados de conexao com o banco
const { MongoClient, ObjectId } = require('mongodb');
// const DB_URL = "mongodb://localhost:27017";
const DB_URL = "mongodb+srv://admin:u7S5IKf1dY7NGnX5@cluster0.qrhq309.mongodb.net";
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

//Obter dados do banco
app.get("/dados", async (req,res)=>{
    const clientes = await collection.find().toArray();
    res.send(clientes)
});


//obter dados por id
app.get("/dados/:id", async (req,res)=>{

    const id = req.params.id
    const clientes = await collection.findOne({ _id: new ObjectId(id) });
    res.send(clientes);

});

//Adicionar dados no banco
app.post("/dados", async (req,res)=>{
    const cliente = req.body
    await collection.insertOne(cliente)
    res.send(cliente)
});

//Atualizar um registro
app.put("/dados/:id", async (req, res)=>{
    const id = req.params.id
    const body = req.body

    await collection.updateOne(
        { _id: new ObjectId(id)},
        { $set: body}
    );
     //console.log(id, body)

    res.send(body)
});

//Deletar um registro

app.delete("/dados/:id", async (req, res)=>{
    const id = req.params.id
    const body = req.body
    console.log(id, body)   
    await collection.deleteOne({ _id:new ObjectId(id)} )
    res.send("Dados deletados com sucesso!")
   
});


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



app.listen(port, ()=>{console.log(`Servidor rodando na porta: ${port}`)})

} main ()