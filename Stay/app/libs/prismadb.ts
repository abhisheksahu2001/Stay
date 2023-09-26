import { PrismaClient } from "@prisma/client";

declare global {
    var prisma : PrismaClient | undefined

}
const PrismaInstance = () =>{
    return new PrismaClient();
}

type PrismaClientSingleton = ReturnType<typeof PrismaInstance>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const client = globalForPrisma.prisma ?? PrismaInstance()

if(process.env.NODE_ENV !== 'production' ) globalThis.prisma == client
console.log(globalThis.prisma)

export default client;