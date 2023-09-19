import { Router } from "express";
import { createUser ,getAll,getUser} from "@/controllers/users.controller";
 
const router = Router();

// http://localhost:8080/users/
router.post('/',createUser)
router.get('/:all', getAll)
router.get('/:mobile',getUser)
// router.put('/:mobile')
// router.delete('/:mobile')
 

export default router;
