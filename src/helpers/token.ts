import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
    id: string;
}

export const getDataFromToken = async (request: NextRequest): Promise<string> => {
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodedToken: DecodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
};