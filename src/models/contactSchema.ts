import { Schema, model } from "mongoose";

interface IContact {
    name: string,
    phoneNumber: string
}

const contactSchema = new Schema<IContact>({
    name:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    }
})

export const Contact = model<IContact>('Contact', contactSchema);