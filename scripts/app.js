import { LicenseController } from "./controllers/licenseController.js";

//Espera a que se cargue el contenido de la página
document.addEventListener("DOMContentLoaded", async () => {
    try {

        //Carga los datos de las licencias desde el archivo JSON
        let response = await fetch("./data/licenses.json");

        //Comprueba que los datos se han cargado correctamente
        if (!response.ok) {
            throw new Error("Error loading licenses");
        }

        let data = await response.json();

        //Crea el controlador con los datos obtenidos
        let controller = new LicenseController(data);

        //Busca los apartados de la página donde aparecerán los productos
        let featuredSection = document.getElementById("featured");
        let offersSection = document.getElementById("offers");
        let latestSection = document.getElementById("latest");
        let allSection = document.getElementById("all");

        //Muestra las licencias destacadas
        controller.RenderFeatured(3, featuredSection);

        //Muestra las tres mejores ofertas
        controller.RenderOffers(3, offersSection);

        //Muestra las tres últimas versiones
        controller.RenderLatest(3, latestSection);

        
        //Busca los controles de filtrado
        let searchInput = document.getElementById("search");
        let softwareFilter = document.getElementById("softwareFilter");

        //Muestra las licencias que coinciden con los filtros
        function updateProducts() {

            //Limpia los productos anteriores
            allSection.innerHTML = "";

            //Aplica los filtros seleccionados
            controller.RenderFiltered(
                searchInput.value,
                softwareFilter.value,
                allSection
            );
        }

        //Actualiza los productos al escribir en el buscador
        searchInput.addEventListener("input", updateProducts);

        //Actualiza los productos al cambiar de programa
        softwareFilter.addEventListener("change", updateProducts);
        
        //Muestra todas las licencias inicialmente en orden aleatorio
        controller.RenderAll(data.length, allSection);

    } catch (error) {

        //Muestra un mensaje si ocurre algún problema
        console.error("Error loading the store:", error);
    }
});