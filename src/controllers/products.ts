import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../server";

interface CreateProductBody {
    name: string
    quantity: number
    minQuantity: number
    category: string
    userId: string
}

interface UpdateBodyType extends Partial<CreateProductBody> {}

interface ProductParams {
    id: string
}

export async function createProduct(request: FastifyRequest, reply: FastifyReply) {
    const { name, quantity, minQuantity, category } = request.body as CreateProductBody
    const product = await prisma.produto.create({ data: { name, quantity, minQuantity, category, userId: request.user.id}})
    return reply.code(201).send(product)
}

export async function getProducts(request: FastifyRequest, reply: FastifyReply) {
    const products = await prisma.produto.findMany({where: {
        userId: request.user.id
    }})
    return reply.send(products)
}

export async function getProductById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as ProductParams
    const product = await prisma.produto.findFirst({ where: {id, userId: request.user.id} })
    if(!product) return reply.code(404).send({ message: "Produto não encontrado" })
    return reply.code(200).send(product)
}

export async function updateProduct(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as ProductParams
    const {name, quantity, minQuantity, category } = request.body as Partial<UpdateBodyType>
    try {
        const product = await prisma.produto.update({ where: {id}, data: {
            ...(name && { name }),
            ...(quantity !== undefined && { quantity }),
            ...(minQuantity !== undefined && { minQuantity }),
            ...(category && { category })
        }})
        return reply.code(200).send(product)
    } catch {
        return reply.code(404).send({message: "Produto não atualizado"})
    }
}

export async function deleteProduct(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }
    try {
        await prisma.produto.delete({ where: {id} })
        return reply.code(204).send()
    } catch {
        return reply.code(404).send({message: "Não foi possível deletar o produto"})
    }
}