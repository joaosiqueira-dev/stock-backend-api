import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../server";
import bcrypt from 'bcrypt'

interface CreateUserBody {
    name: string
    email: string
    password: string
}

interface LoginUserBody {
    email: string
    password: string
}

interface UpdateUserBody extends Partial<CreateUserBody> {}

export async function createUser(request: FastifyRequest<{Body: CreateUserBody}>, reply: FastifyReply) {
    try {
        const { name, email, password } = request.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({ data: { name, email, password: hashedPassword }})
        return reply.code(201).send({id: user.id, name: user.name, email: user.email})
    } catch (err: any) {
        if (err.code === "P2002") {
            return reply.status(409).send({
                message: "Este e-mail já está em uso", 
            })
        }

        return reply.status(500).send({
            message: "Erro interno ao criar usuário" 
        })
    }
}

export async function loginUser(request: FastifyRequest<{Body: LoginUserBody}>, reply: FastifyReply) {
    try {
        const { email, password } = request.body

        const user = await prisma.user.findUnique({ where: { email }})
            if(!user) return reply.code(401).send({ message: "E-mail ou senha incorretos" })
            
        const isValid = await bcrypt.compare(password, user.password)
            if(!isValid) return reply.code(401).send({ message: "E-mail ou senha incorretos" })
                
        const token = request.server.jwt.sign({ id: user.id, email: user.email}, {expiresIn: process.env.JWT_EXPIRES_IN })
        return reply.code(200).send({ token, user: { id: user.id, name: user.name, email: user.email } })
    } catch (err: any) {
        return reply.status(500).send({
            message: "Erro interno ao realizar login" 
        })
    }
}

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
    try {

        const userId = request.user.id 
        const user = await prisma.user.findUnique({ where: { id: userId } })
        if(!user) return reply.code(404).send({message: "Usuário não encontrado"})
            return reply.send({ id: user.id, name: user.name, email: user.email })
    } catch (err: any) {
        return reply.status(500).send({
            message: "Erro interno ao encontrar usuário" 
        })
    }
}

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
    const userType = request.user as { id: string, email: string }
    const userId = userType.id
    const data = request.body as UpdateUserBody

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10)
    }

    try {
        const user = await prisma.user.update({ where: { id: userId }, data })
        return reply.send({ id: user.id, name: user.name, email: user.email })
    } catch (err) {
        return reply.code(404).send({ message: "Usuário não encontrado" })
    }
}

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id
    try {
        await prisma.user.delete({ where: { id: userId } })
        return reply.code(204).send()
    } catch {
        return reply.code(404).send({message: "Usuário não encontrado"})
        }
}

//user auths