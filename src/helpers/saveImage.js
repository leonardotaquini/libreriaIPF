import { __dirname } from "../index.js";

export const saveImage = async (file) => {

    if(!file || Object.keys(file).length === 0){
        return 'No se ha seleccionado ninguna imagen';
    }

    const rutaDeGuardado = `${__dirname}\\images\\${file.portada.name}`;
    try{
        await file.portada.mv(rutaDeGuardado);
        return rutaDeGuardado;
    }catch(error){
        console.log(error);
        return;
    }



}