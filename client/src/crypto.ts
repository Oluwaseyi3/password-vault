 import React from "react";
 import {SHA256} from "crypto-js"
import pbkdf2  from "crypto-js/pbkdf2";


export const hashPassword =(password: string)=> {

    return SHA256(password).toString()

}



export const generateVaultKey = ({ email, hashedPassword, salt}: {hashedPassword: string; email: string; salt: string;})=> {

    return pbkdf2(`${email}:${hashedPassword}`, salt, {
     keySize: 32
    }).toString();
}