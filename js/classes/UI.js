import { paginacion, resultado } from "../selectores.js";
import { cargarBusqueda, generadorPaginas, numsToK, totalPaginas } from "../funciones.js";

let iterador;
export let paginaActual = 1;

export default class UI{

    mostrarResultados(imagenes){

        this.limpiarHTML(resultado);

        imagenes.forEach(imagen => {

            const {downloads, likes, views, largeImageURL, previewURL} = imagen;

            resultado.innerHTML += `
                <div class="w-full md:w-1/2 lg:w-1/4">
                    <div class="h-auto rounded-lg m-4 shadow-lg bg-white">
                        <div class="space-x-2 text-sm mt-2">
                            <img class="w-full rounded-t-lg" src="${previewURL}">
                            <p class="text-gray-600 font-light text-xs mt-2"><span class="font-bold">Visto:</span> ${numsToK(views)}</p>
                            <div class="px-2 mt-2 text-xs border-l-4 border-blue-400">
                                <p class="font-medium text-gray-600"><span class="font-bold text-blue-600">${likes}</span> Me Gustas</p>
                                <p class="font-medium text-gray-600"><span class="font-bold text-blue-600">${numsToK(downloads)}</span> Descargas</p>
                            </div>
                        </div>

                        <div class="">
                            
                        </div>

                        <div class="flex justify-center space-x-2 pb-4">
                            <button class="focus:outline-none hover:bg-green-800 duration-100 rounded-full bg-green-600 text-green-100 font-semibold text-sm mt-4 py-1 px-4" href="_blank">Descargar</button>
                            <a 
                                class="focus:outline-none hover:bg-blue-800 duration-100 hover:duration-100 rounded-full bg-blue-600 text-blue-100 font-semibold text-sm mt-4 py-1 px-4" 
                                href="${largeImageURL}" 
                                target="_blank" 
                                rel="noopener noreferrer">Ver Imagen
                            </a>
                        </div>
                    </div>
                </div>
            `    

        });
    
        this.limpiarHTML(paginacion)
        this.imprimirPaginador();

    }

    imprimirPaginador(){
        iterador = generadorPaginas(totalPaginas);

        while(true){
            const {value, done} = iterador.next();
            if(done) return;

            // Caso contrario genera botones para el paginador
            const numerador = document.createElement('A');
            numerador.href = '#';
            numerador.dataset.pagina = value;
            numerador.textContent = value;
            numerador.classList.add('mx-2','siguiente', 'bg-white', 'text-gray-600', 'rounded-lg', 'shadow-md', 'font-bold', 'text-sm', 'my-2', 'px-4', 'py-1');

            numerador.onclick = () => {
                paginaActual = value;
                cargarBusqueda();
            }

            paginacion.appendChild(numerador);   
        }

    }


    mostrarAlerta(contenedor, mensaje, tipo){

        const existeAlerta = document.querySelector('.bg-red-100');

        if(!existeAlerta){

            const alerta = document.createElement('DIV');
            alerta.textContent = mensaje;
            let condicionCumplida = false;
            
            if(tipo === 'error'){
                alerta.classList.add('bg-red-100','border', 'rounded-full', 'border-red-400', 'text-center', 'text-red-400','text-md', 'py-2', 'my-4');
                condicionCumplida = true;
            }

            contenedor.appendChild(alerta);
    
            if(condicionCumplida){
                setTimeout(() => {
                    alerta.remove();
                }, 2300);
            }

        }

    }

    limpiarHTML(contenedor){
        while(contenedor.firstChild){
            contenedor.removeChild(contenedor.firstChild);
        }
    }

}