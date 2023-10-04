import { Router } from "express";
import { autorSchema } from '../validations/index.js';
import { validate } from '../middlewares/validation.js';
import { createAutorCtrl, deleteAutorCtrl, getAutoresCtrl, getAutorByIdCtrl, updateAutorCtrl } from '../controllers/autor.controller.js';
const router = Router();

router.get("/", getAutoresCtrl);
router.get("/:id", getAutorByIdCtrl);
router.post("/", autorSchema, validate, createAutorCtrl);
router.put("/:id", autorSchema, validate, updateAutorCtrl);
router.delete("/:id", deleteAutorCtrl);


export {router as autorRoutes};