import { Router } from "express";
import * as LOGIN from "@/controllers/login.controller";
 
const router = Router();
//  /auth/register
//  /auth/login

router.get('/users',LOGIN.getUsers)
router.get('/users/:id',LOGIN.getUser)
router.post('/register',LOGIN.createUser)
router.post('/login', LOGIN.login)
router.delete('/users/:id',LOGIN.getdelete)
router.put('/users/:id',LOGIN.update_user)

 

export default router;
