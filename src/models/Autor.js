import {Schema, model} from "mongoose";

const autorSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    biografia: {
        type: String,
        required: true
    },
    libros: [{
        type: Schema.Types.ObjectId,
        ref: "Libro"
    }]
});

export const Autor = model("Autor", autorSchema);


//metodos

export const getAutores = async () => {
    try {
        const autores = await Autor.find().populate({
            path: "libros",
            select: "titulo"
        });
        return autores;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAutorById = async (id) => {
    try {
        const autor = await Autor.findById(id).populate({
            path: "libros",
            select: "titulo"
        });
        return autor;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const createAutor = async (autor) => {
    try {
        const newAutor = await Autor.create(autor);
        return newAutor;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateAutor = async (id, autor) => {
    try {
        const updatedAutor = await Autor.findByIdAndUpdate(id, autor);
        return updatedAutor;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteAutor = async (id) => {
    try {
        const deletedAutor = await Autor.findByIdAndDelete(id);
        return deletedAutor;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export const addLibroToAutor = async (id, libro) => {
    try {
        const autor = await Autor.findById(id);
        autor.libros.push(libro);
        const updatedAutor = await autor.save();
        return updatedAutor;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteLibroToAutor = async (id, libro) => {
    try {
        const autor = await Autor.findById(libro.autor).populate({
            path: "libros",
            select: "titulo",
        });

        autor.libros = autor.libros.filter( item => item._id.toHexString() !== id);
        return autor;
        // const updatedAutor = await autor.save();
        // return updatedAutor;
        
    } catch (error) {
        
    }
}

