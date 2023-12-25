import express from 'express'
import 'dotenv/config'

const app = express()

app.use(express.json())

app.get('/api/', (req, res) => {
    res.send({ hello: 'Hello Bitch :P' })
})

app.listen(process.env.PORT, () => console.log(`Connection alive on http://localhost:${process.env.PORT}/api`))
