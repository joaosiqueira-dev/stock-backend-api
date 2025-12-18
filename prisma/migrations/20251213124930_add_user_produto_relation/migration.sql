/*
  Warnings:

  - You are about to drop the column `categoria` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `estoqueMin` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `User` table. All the data in the column will be lost.
  - Added the required column `category` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minQuantity` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Produto" DROP COLUMN "categoria",
DROP COLUMN "estoqueMin",
DROP COLUMN "nome",
DROP COLUMN "quantidade",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "minQuantity" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "nome",
ADD COLUMN     "name" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Produto" ADD CONSTRAINT "Produto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
