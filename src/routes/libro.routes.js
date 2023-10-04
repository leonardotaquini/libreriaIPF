import { Router } from "express";
import { getLibrosCtrl, getLibroByIdCtrl, createLibroCtrl, updateLibroCtrl, deleteLibroCtrl, getLibroByISBNCtrl } from "../controllers/libro.controller.js";
import { libroSchema } from "../validations/index.js";
import { validate } from "../middlewares/validation.js";

const router = Router();

router.get("/", getLibrosCtrl);
router.get("/:id", getLibroByIdCtrl);
router.get("/isbn/:isbn", getLibroByISBNCtrl);
router.post("/", libroSchema, validate, createLibroCtrl);
router.put("/:id", libroSchema, validate,  updateLibroCtrl);
router.delete("/:id", deleteLibroCtrl);

export { router as libroRoutes };