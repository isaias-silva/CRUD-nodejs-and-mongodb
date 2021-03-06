import express from 'express'
import bodyParser from 'body-parser'
import mongoose from './db'
import userSchema from './user'

const server = express()
const port = process.env.PORT || 8080
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Acess-Control-Allow-Headers', 'Origin,X-Requrested-With ,Content-Type, Accept,Autorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATH,DELETE,GET')
        return res.status(200).send({});
    }
    next();
})
//uso de json
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json())

//index   
server.get('/', (req, res) => {
    res.send('index')
})
//READ
server.get('/users', async (req, res) => {
    const users = mongoose.model('users', userSchema, 'users')
    const docs = await users.find({}).lean().exec()
    res.send(docs)
})
//CREATE
server.post('/insert', async (req, res) => {
    console.log(req.body)
    let username = req.body.username
    let email = req.body.email
    const users = mongoose.model('users', userSchema, 'users')
    const user = new users({ username, email })
    try {
        await user.save()
        res.json({ message: "inserted" })
    } catch (err) {
        res.send(err)
    }
})
//DELETE
server.delete('/delete/:id', async (req, res) => {
    const users = mongoose.model('users', userSchema, 'users')
    const docs = await users.find({}).lean().exec()
    for (let i in docs) {
        if (req.params.id == docs[i]._id) {
            await users.deleteOne({ _id: req.params.id })
            res.json({ message: "deleted" })
        }
    }
    res.send('não encontrado')
})
//UPDATE
server.put('/edit/:id', async (req, res) => {
    const { username, email } = req.body
    const users = mongoose.model('users', userSchema, 'users')
    const docs = await users.find({}).lean().exec()
    for (let i in docs) {
        if (req.params.id == docs[i]._id) {
            await users.updateOne({ _id: req.params.id }, { username: username, email: email })
            res.json({ message: "saved" })
        }
    }
})
server.use((req, res, next) => {
    res.status(404)
    next()
})
server.use((req, res) => {
    res.send('not found')
})
server.listen(port, () => { console.log(`on in ${port}`) })