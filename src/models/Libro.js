import { Schema, model } from "mongoose";
import { addLibroToAutor, deleteLibroToAutor } from "./Autor.js";
import { uploadImageToCloudinary } from "../helpers/uploadImage.js";

const libroSchema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  autor: {
    type: Schema.Types.ObjectId,
    ref: "Autor",
  },
  isbn: {
    type: String,
    required: true,
  },
  editorial: {
    type: String,
    required: true,
  },
  fechaPublicacion: {
    type: Date,
    required: true,
  },
  portada: {
    type: String,
    required: true,
  },
  genero: {
    type: String,
    required: true,
  },
});

export const Libro = model("Libro", libroSchema);

//metodos

export const getLibros = async () => {
  try {
    const libros = await Libro.find().populate({
      path: "autor",
      select: "nombre",
    });
    return libros;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getLibroById = async (id) => {
  try {
    const libro = await Libro.findById(id).populate({
      path: "autor",
      select: "nombre",
    });
    return libro;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createLibro = async (libro) => {
  try {
    const { autor, portada } = libro;
    const imageUrl = await uploadImageToCloudinary(portada);
    libro.portada = imageUrl;
    const newLibro = await Libro.create(libro);
    addLibroToAutor(autor, newLibro);
    return newLibro;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateLibro = async (id, libro) => {
  try {
    const updatedLibro = await Libro.findByIdAndUpdate(id, libro);
    return updatedLibro;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteLibro = async (id) => {
  try {
    const libro = await Libro.findById(id);
    await deleteLibroToAutor(id, libro);
    const deletedLibro = await Libro.findByIdAndDelete(id);
    return deletedLibro;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getLibroByISBN = async (isbn) => {
  try {
    const libro = await Libro.findOne({ isbn }).populate({
      path: "autor",
      select: "nombre",
    });
    return libro;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getLibroByTitulo = async (titulo) => {
  try {
    const libro = await Libro.findOne({
      titulo: { $regex: new RegExp(titulo, "i") },
    }).populate({
      path: "autor",
      select: "nombre",
    });
    return libro;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getLibroByAnyWord = async (word) => {
  try {
    const consulta = {
      $or: [
        { titulo: { $regex: word, $options: "i" } },
        { isbn: { $regex: word, $options: "i" } },
        { editorial: { $regex: word, $options: "i" } },
        { genero: { $regex: word, $options: "i" } },
      ],
    };
    const libros = await Libro.find(consulta).populate({
      path: "autor",
      select: "nombre",
    });
    return libros;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getLibroByGenero = async (genero) => {
  try {
    const libros = await Libro.find({ genero: {$regex: new RegExp(genero, 'i')} }).populate({
      path: "autor",
      select: "nombre",
    });
    return libros;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
