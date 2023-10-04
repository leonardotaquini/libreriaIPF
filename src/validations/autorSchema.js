import { checkSchema } from "express-validator";

export const autorSchema = checkSchema({
    nombre: {
        in: ["body"],
        notEmpty: true
    },
    apellido: {
        in: ["body"],
        notEmpty: true
    },
    biografia: {
        in: ["body"],
        notEmpty: true
    }
})