import Router from "express"
import { currentUser, generaterefreshToken, loginUser, logOutUser, registerUser} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/currentuser",verifyJWT,currentUser);
router.post("/refresh",verifyJWT,generaterefreshToken);
router.post("/logout",verifyJWT,logOutUser);

export default router;