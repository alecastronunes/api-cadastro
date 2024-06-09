import cors from 'cors'
import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())//Usando JSON no express
app.use(cors())


//Criando um usuário
app.post('/usuarios', async(req, res) => {
   
    await prisma.user.create({
        data:{
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })

    res.status(201).json(req.body)
})

//Listando os usuários
app.get('/usuarios', async(req, res) => {
    let users = []

    if(req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                age: req.query.age,
                email: req.query.email
            }
        })
    }else {
        const users = await prisma.user.findMany()
    }

    
    res.status(200).json(users)
})

//Editando os usuários
app.put('/usuarios/:id', async(req, res) => {
    
   
    await prisma.user.update({
        where: {
            id:req.params.id
        },
        data:{
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })

    res.status(201).json(req.body)
})


//Deletando os usuários
app.delete('/usuarios/:id', async(req, res) => {
    await prisma.user.delete({
        where: {
            id:req.params.id,
        },
    })

    res.status(200).json({message: 'Usuário deletado com sucesso!!!'})
})

app.listen(3000)
