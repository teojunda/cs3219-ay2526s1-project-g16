import express from 'express';
import { 
    helloWorld,
    createUser,
} from '../controller/user-controller.ts';

const router = express.Router();

// Define a GET route for the root URL ('/') and link it to the getHomePage controller
router.get('/helloworld', helloWorld);

router.post("/register", createUser);

export default router;