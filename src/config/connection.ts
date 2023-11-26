import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config()

const MONGO_URI = process.env.MONGO_URI;

export const connection = async () => {
    try{
        await connect(MONGO_URI || "")
    }catch(err){
        console.log(err)
    }
}