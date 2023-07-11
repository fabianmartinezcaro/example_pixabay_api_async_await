import { validarBusqueda } from "../funciones.js";
import { formulario } from "../selectores.js";


export default class App{

    constructor(){

        this.initApp();

    }

    initApp(){

        document.addEventListener('DOMContentLoaded', () => {
        
            formulario.addEventListener('submit', validarBusqueda);

        })

    }

}