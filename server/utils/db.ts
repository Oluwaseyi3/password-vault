import mongoose, { disconnect } from "mongoose";
import { DB_CONNECTION } from "../src/constants";
import logger from "./logger";




export async function connectToDb(){
    try {
        
        await mongoose.connect(DB_CONNECTION || "string")
    } catch (error) {
       logger.error(error, "Error connectiong to database") 
       process.exit(1)
    }
}

export const disconnectFromDB = async() => {
    await mongoose.connection.close()

    logger.info("Disconnect from db")
    return;
}