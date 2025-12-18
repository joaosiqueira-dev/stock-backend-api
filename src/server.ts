import dotenv from 'dotenv'
import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { authUser, deleteInfoUser, getuserInfo, registerUser, updateInfoUSer } from './routes/userRoute'
import fastifyJwt from '@fastify/jwt'
// import { handleCategories, handleDeleteCategory, handleGetCategory, handleUpdateCategory, registerCategory } from './routes/categoryRoute'
import { handleGetProduct, handlerUpdateProduct, listProducts, registerProduct, removeProduct } from './routes/productsRoute'
import cors from '@fastify/cors'

dotenv.config()
export const prisma = new PrismaClient

export const app = Fastify({ logger: true })

app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET as string
})

app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
})

export const verifyJWT = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify()
        const user = request.user as { id: string, email: string }
    } catch {
        reply.status(401).send({ message: "Token inválido ou ausente" })
    }
}

registerUser()
authUser()
getuserInfo()
updateInfoUSer()
deleteInfoUser()

registerProduct()
listProducts()
handleGetProduct()
handlerUpdateProduct()
removeProduct()

// registerCategory()
// handleCategories()
// handleGetCategory()
// handleUpdateCategory()
// handleDeleteCategory()

const port = Number(process.env.PORT) || 3333

app.listen({ port, host: "0.0.0.0" }).then(() => {
    console.log("Server rodando na porta 3333")
})