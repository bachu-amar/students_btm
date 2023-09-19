import { UserTypes } from '@/typings/users';
import {  Request, Response } from 'express';


export const students: UserTypes[] = [];

export const createUser = (req: Request, res: Response) => {
    try {
    const userData=req.body as UserTypes
    if(typeof userData.mobile !== 'number'){
        res.status(500).json({
            message:'Mobile Number should a number'
        })
    }
    res.status(200).json(userData)
  } catch (error) {
    res.status(500).json({
        message:'Not Stored'
    })  
  }
};

export const getUser = (req: Request, res: Response) => {
    try {
    const mobile=req.params.mobile
    // res.send(mobile)
    res.send("Sucessfully")
  } catch (error) {
    res.status(500).json({
        message:'Not Stored'
    })
  }
};


export const getAll=(req:Request,res:Response)=>{

  res.json(students);
}
