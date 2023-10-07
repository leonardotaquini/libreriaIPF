import { getLibros, getLibroById, createLibro, updateLibro, deleteLibro, getLibroByISBN } from '../models/Libro.js';


export const getLibrosCtrl = async (req, res) => {
    try {
        const libros = await getLibros();
        res.status(200).json(libros);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

export const getLibroByIdCtrl = async (req, res) => {
    try {
        const libro = await getLibroById(req.params.id);
        res.status(200).json(libro);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

export const createLibroCtrl = async (req, res) => {
    try {     
        const libro = { ...req.body, portada: req.files.portada };
        const newLibro = await createLibro(libro);
        res.status(201).json(newLibro);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

export const updateLibroCtrl = async (req, res) => {
    try {
        const libro = await updateLibro(req.params.id, req.body);
        res.status(200).json(libro);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

export const deleteLibroCtrl = async (req, res) => {
    try {
        const libro = await deleteLibro(req.params.id);
        res.status(200).json(libro);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

export const getLibroByISBNCtrl = async (req, res) => {
    try {
        const libro = await getLibroByISBN(req.params.isbn);
        res.status(200).json(libro);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}