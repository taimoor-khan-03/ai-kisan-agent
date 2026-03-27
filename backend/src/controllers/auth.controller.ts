import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { Request , Response } from "express"
import { Prisma } from '@prisma/client/extension';


export const rgister = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try{
        const userExists = await Prisma.user.findUnique({ where: { email } });  
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

    } catch (error) {       
        res.status(500).json({ message: 'Server error (backend register)' });
    }
}