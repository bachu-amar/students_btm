import Users from "@/models/user.model";
import { UserTypes } from "@/typings/login";
import { Request, Response } from "express";
// import connection  from '@/databases/mysql';

type Result = {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
};


export const getUsers = async (req: Request, res: Response) => {
  const ress = await Users.find();
  res.status(200).json(ress);
};

export const getUser = async (req: Request, res: Response) => {
    const ress = await Users.findById(req.params.id);
    res.status(200).json(ress);
  };

export const getdelete = async(req: Request, res: Response) =>{
    const result = await Users.findByIdAndDelete(req.params.id);
    res.send("Deleted Successfully")
};

export const update_user= async(req:Request,res:Response)=>{
    const { firstname, lastname, mobile_number, email, password } = req.body;
    const result = await Users.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({ result, ...req.body});
}

export const createUser = async (req: Request, res: Response) => {
  console.log("Body", req.body);
  const { firstname, lastname, mobile_number, email, password } = req.body;
  const ress = await Users.create(req.body);
  res.status(200).json(ress);
  // const q = `INSERT INTO registration VALUES('${firstname}', '${lastname}', ${mobile_number}, '${email}', '${password}')`
  // connection.query(q,(error: any,result: any)=>{
  //     if(error){
  //         res.status(500).json(error)
  //     }
  //     res.status(200).json({
  //         result,

  //         ...req.body});
  // })
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error during login' });
    }

    
  };
  

  // const q = `SELECT * FROM registration WHERE email = "${email}" and password = '${password}'`;
  // if(email&&password){
  //     connection.query(q,(error,result)=>{
  //         if (error) {
  //             console.error(error);
  //             res.status(500).send("An error occurred");
  //         } else {
  //             if (result.length > 0) {
  //                 res.send("Login success");
  //             } else {
  //                 res.send("Login failed");
  //             }
  //         }
  //     })
  // }else{
  //     res.send("Please enter email and password")
  // }

