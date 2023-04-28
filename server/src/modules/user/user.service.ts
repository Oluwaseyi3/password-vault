import { UserModel } from "./user.model"
import crypto from "crypto"


//this creates a user
export async function createUser( input: {
    hashedPassword: string
    email:string
} ){
    return UserModel.create(
        {
            email: input.email,
            password: input.hashedPassword
        }
    )
}


//this creates a vault
export function generateSalt(){
    return crypto.randomBytes(64).toString("hex")
}
