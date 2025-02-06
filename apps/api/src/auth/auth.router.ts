import { Router } from "express";
import { register } from "./auth.controller";
//import validateSchema from "@package/middlewares/validator.middleware";
import { registerSchema } from "./auth.validator";
import  validateSchema from "../middlewares/validator.middleware";

const router = Router();

router.post("/register", validateSchema(registerSchema),  register);

export { router };
