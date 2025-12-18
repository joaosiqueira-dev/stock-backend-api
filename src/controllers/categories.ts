// import { FastifyRequest, FastifyReply } from "fastify";
// import { prisma } from "../server";

// interface UpdateCategoryBody {
//     nome?: string
//     produtos?: 
//     { connect?: {id: string}[]
//     disconnect?: {id: string}[] }
// }

// interface CategoryParams {
//     id: string
// }

// interface CreateCategoryBody {
//     nome: string
// }

// export async function createCategory(request: FastifyRequest, reply: FastifyReply) {
//     const { nome } = request.body as CreateCategoryBody
//     const category = await prisma.categoria.create({ data: { nome }})
//     return reply.code(201).send(category)
// }

// export async function getCategories(request: FastifyRequest, reply: FastifyReply) {
//     const categories = await prisma.categoria.findMany({ 
//         include: { produtos: true }
//     })
//     return reply.code(200).send(categories)
// }

// export async function getCategoryById(request: FastifyRequest, reply: FastifyReply) {
//     const { id } = request.params as CategoryParams
//     const category = await prisma.categoria.findUnique({ where: {id}, include: {
//         produtos: true
//     } })
//     if (!category) return reply.code(404).send({ message: "Categoria não encontrada" })
//     return reply.code(200).send(category)
// }

// export async function updateCategory(request: FastifyRequest, reply: FastifyReply) {
//     const { id } = request.params as CategoryParams
//     const { nome, produtos } = request.body as Partial<UpdateCategoryBody>
//     const categoria = await prisma.categoria.update({ where: {id}, data: {
//         ...(nome && { nome }),
//         ...(produtos && { produtos }),
// },
//     include: { produtos: true }
// })
//     return reply.send(categoria)
// }

// export async function deleteCategory(request: FastifyRequest, reply: FastifyReply) {
//     const { id } = request.params as CategoryParams
//     await prisma.categoria.delete({ where: {id} })
//     return reply.code(204).send()
// }