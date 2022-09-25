const express = require('express');
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())



// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hmlzq1n.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://dbuser1:CC6bvqtd9P8DxJ0M@cluster0.hmlzq1n.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const database = client.db("genius-car");
        const movies = database.collection("services");
        //   service get 
        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = movies.find(query);
            const services = await cursor.toArray();
            // console.log(services)
            res.send(services);
        })

        //    service post 
        app.post('/service', async (req, res) => {
            const newService = req.body;
            const result = await movies.insertOne(newService);
            res.send(result);
        })

        //method delete 
        app.delete('/service/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id: ObjectId(id)}
            const result = await movies.deleteOne(query);
            res.send(result)

        })

        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await movies.findOne(query);
            res.send(service);
        })
    }
    finally {

    }


}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`Example  listening on port ${port}`)
})
