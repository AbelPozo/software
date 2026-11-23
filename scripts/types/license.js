export class License {

    //Guarda la información de la licencia
    constructor(id, software, version, price, key, featured, discount) {
        this.id = id;
        this.software = software;
        this.version = version;
        this.price = price;
        this.key = key;
        this.featured = featured;
        this.discount = discount;
    }
    
    //Muestra la información del producto en la página
    Render(parent) {

        //Crea el contenedor del producto
        let product =document.createElement("div");

        //Relaciona cada programa con su imagen
        let images = {
            "Windows": "windows.png",
            "Microsoft Office": "office.png",
            "Kaspersky": "kaspersky.png",
            "Photoshop": "photoshop.png",
            "WinRAR": "winrar.png",
            "Norton": "norton.png",
            "AutoCAD": "autocad.png",
            "ESET": "eset.png",
            "Avast": "avast.png",
            "CorelDRAW": "coreldraw.png"
        };

        //Crea la imagen del producto
        let image = document.createElement("img");
        image.src = "./images/" + images[this.software];
        image.alt = this.software;
        image.className = "product-image";

        //Crea los elementos con la información del producto
        let title = document.createElement("h3");
        title.textContent = this.software;

        let version = document.createElement("p");
        version.textContent = "Version: " + this.version;

        let price = document.createElement("p");
        price.textContent = "Price: " + this.price + " €";

        let discount = document.createElement("p");
        discount.textContent = "Discount: " + this.discount + "%";

        //Crea el botón de compra
        let buyButton = document.createElement("button");
        buyButton.textContent = "Buy";

        //Conecta el botón con la función Buy()
        buyButton.addEventListener("click", () => this.Buy());

        //Añade los elementos al contenedor del producto
        product.appendChild(image);
        product.appendChild(title);
        product.appendChild(version);
        product.appendChild(price);
        product.appendChild(discount);
        product.appendChild(buyButton);

        //Añade el producto al elemento padre
        parent.appendChild(product);
    }

    //Muestra la clave de licencia en una ventana emergente
    Buy() {
        alert("Your license key is: " + this.key);
    }
}