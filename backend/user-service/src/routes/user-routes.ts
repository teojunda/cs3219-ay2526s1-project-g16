import express from 'express';
import { 
    loginUser,
    createUser,
} from '../controller/user-controller.ts';

const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

export default router;