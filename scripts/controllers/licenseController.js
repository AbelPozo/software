import { License } from "../types/license.js";

class LicenseController {

    //Recibe los datos y crea los objetos License
    constructor (data) {
        this.licenses = data.map(item => {
            return new License(
                item.id,
                item.software,
                item.version,
                item.price,
                item.key,
                item.featured,
                item.discount

            );
        });
    }

    //Muestras las primeras licencias destacadas
    RenderFeatured(count, parent) {
        let featured = this.licenses.filter(license => license.featured);

        featured.slice(0, count).forEach(license => {
            license.Render(parent);
        });
    }

    //Muestras las licencias con descuento ordenadas de mayor a menor
    RenderOffers(count, parent) {
        let offers = this.licenses
            .filter(license => license.discount > 0)
            .sort((a, b) => b.discount - a.discount);
        
        offers.slice(0, count).forEach(license => {
            license.Render(parent);
        });
    }

    //Muestra las últimas versiones de cada software
    RenderLatest(count, parent) {
        let latest = []

        //Busca la versión más reciente de cada programa
        this.licenses.forEach(license => {
            let existing = latest.find(item => item.software === license.software);

            if (!existing) {
                latest.push(license);
            } else if (parseFloat(license.version) > parseFloat(existing.version)) {
                let index = latest.indexOf(existing);
                latest[index] = license;
            }
        });

        //Muestra el número de licencias solicitado
        latest.slice(0, count).forEach(license => {
            license.Render(parent);
        });
    }

    //Muestra las licencias que coinciden con los filtros
    RenderFiltered(search, software, parent) {

        //Filtra las licencias según el texto introducido
        let filtered = this.licenses.filter(license => {

            let matchesSearch =
                license.software.toLowerCase().includes(search.toLowerCase()) ||
                license.version.toLowerCase().includes(search.toLowerCase());

            //Comprueba si coincide con el programa seleccionado
            let matchesSoftware =
                software === "" || license.software === software;

            return matchesSearch && matchesSoftware;
        });

        //Muestra las licencias encontradas
        filtered.forEach(license => {
            license.Render(parent);
        });
    }

    //Muestra las licencias en orden aleatorio
    RenderAll(count, parent) {
        let randomLicenses = [...this.licenses];

        //Mezcla las licencias aleatoriamente
        randomLicenses.sort(() => Math.random() - 0.5);

        randomLicenses.slice(0, count).forEach(license => {
            license.Render(parent);
        });
    }
}

export { LicenseController };