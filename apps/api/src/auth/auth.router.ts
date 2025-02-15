import { Router } from "express";
import { login, register, profile, logout } from "./auth.controller";
//import validateToken  from "../middlewares/validator-token.middleware";
//import validateSchema from "@package/middlewares/validator.middleware";
import { loginSchema, registerSchema } from "./auth.validator";
import  validateSchema from "../middlewares/validator.middleware";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
//router.get("/profile", validateToken, profile);

export { router };
