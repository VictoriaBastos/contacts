import { Contact } from "../models/contactSchema";
import { Request, Response } from "express";
import Joi from 'joi'


class contactController {

    getContacts = async (req: Request,res: Response) => {
        try{
            const contacts = await Contact.find({});
            res.status(200).send(contacts);
        }catch(err){
            console.log("contactController.getContacts, err:", err);
        }
    };

    getContactById = async (req: Request,res: Response) => {
        const id = req.params.id;
        try{
            const contact = await Contact.findById({_id:id});
            if(!contact){
                return res.status(404).send("Contact not found");
            }
            const { name, phoneNumber} = contact;
            res.status(200).send({contact:{name, phoneNumber}});
        }catch(err){
            console.log("contactController.getContacts, err:", err);
        }
    };
    
    postContacts = async (req: Request,res: Response) => {
        const schema = Joi.object({
            name: Joi.string().required(),
            phoneNumber: Joi.string().required()
        })

        const { error, value: { name, phoneNumber} } = schema.validate(req.body, { allowUnknown: false });

        if( error ){
            console.log("contactController.postContacts; schema.validate; error:", error);
        }
        try{
            const newContact = await Contact.create({name, phoneNumber});
            res.status(201).json({message: "Contact created successfully", contact: {name, phoneNumber}});
        }catch(error){
            console.log("contactController.postContacts, err:", error);
        }
    };
    
    patchContacts = async (req: Request,res: Response) => {
        const schema = Joi.object({
            name: Joi.string().optional(),
            phoneNumber: Joi.string().optional()
        })

        const { error, value: { name, phoneNumber} } = schema.validate(req.body, { allowUnknown: false });

        if( error ){
            console.log("contactController.postContacts; schema.validate; error:", error);
        }
        try{
            const id = req.params.id
            const contact = await Contact.findByIdAndUpdate({ _id: id }, { name, phoneNumber }, { new:true }).lean()
    
            if(!contact){
                return res.status(404).send("Contact not found");
            }
            res.status(200).json({message: "Contact updated successfully", contact:{name, phoneNumber}});
        }catch(err){
            console.log("contactController.patchContacts, err:", err);
        }
    };
    
    deleteContacts = async (req: Request,res: Response) => {
        const id = req.params.id;
        try{
            const contact = await Contact.findByIdAndDelete(id);
    
            if(!contact){
                return res.status(404).send("Contact not found");
            }

            const { name, phoneNumber} = contact;
            res.status(200).json({message: "Contact deleted successfully", contact:{name, phoneNumber}});
        }catch(err){
            console.log("contactController.deleteContacts, err:", err);
        }
    };
        
}

export const ContactController = new contactController();
