/*
  Warnings:

  - You are about to drop the column `atualizadoEm` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `categoriaId` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `criadoEm` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `preco` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the `Categoria` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoria` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Produto" DROP CONSTRAINT "Produto_categoriaId_fkey";

-- AlterTable
ALTER TABLE "public"."Produto" DROP COLUMN "atualizadoEm",
DROP COLUMN "categoriaId",
DROP COLUMN "criadoEm",
DROP COLUMN "descricao",
DROP COLUMN "imagem",
DROP COLUMN "preco",
ADD COLUMN     "categoria" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Categoria";
