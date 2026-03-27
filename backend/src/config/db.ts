import dotenv from 'dotenv';
import { PrismaClient } from "../generated/prisma";
dotenv.config();

const createPrismaClient = () => {
    return new PrismaClient({
        log:
          process.env.NODE_ENV === 'development'
            ? ['query', 'info', 'warn', 'error']
            : ['error'],
        datasources: {
            db: {
                url: process.env.DB_URI,
            },
        }
      })
}