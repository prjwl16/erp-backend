// services/productService.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export async function createProduct(data) {
    return await prisma.product.create({ data });
}

export async function getProductById(id) {
    return await prisma.product.findUnique({ where: { id } });
}

export async function updateProduct(id, data) {
    return await prisma.product.update({ where: { id }, data });
}

export async function deleteProduct(id) {
    return await prisma.product.delete({ where: { id } });
}
