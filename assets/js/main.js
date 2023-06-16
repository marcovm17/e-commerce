//* URL base
const baseUrl = 'https://ecommercebackend.fundamentos-29.repl.co/';
//* imprimir productos en la web
const productsList = document.querySelector('#products-container');
//* Mostrar y ocultar carrito
const navToggle = docoment.querySelector(".nav__button--togle");
const navCar = document.querySelector(".nav__car");
//* Carrito de compras
const car = document.querySelector("#car");
const carList = document.querySelector('#car__list');
//* Vaciar carrito
const emptyCarButton = document.querySelector("#empty--car");
//* Car counter
const carCounter = document.querySelector("#car--conunter");
//* Array carrito
//? Necesitamos tener un array que reciba los elementos que debo  introducir en el carrito de compras.
let carProducts = [];
//* Ventana modal
const modalContainer = document.querySelector("modal-container");
const modalElement = document.querySelector("#modal-element");
let modalDetails = [];

navToggle.addEventListener("click", () => {
    navCar.classList.toggle("nav__car--visible")
});

eventListenersLoader();

function eventListenersLoader(){
    //*cuando se presione el boton "Add to car"
    productsList.addEventListener("click", addProduct)
    //* cuando se presione el boton "Delete"
    car.addEventListener("click", deleteProduct);
    //* Cuando se de click al boton 'Empty Car'
    emptyCarButton.addEventListener("click", emptyCar)

    //* Listeners Modal
    //* Cuando se de click al boton de ver detalles
    productsList.addEventListener("click", modalProduct);
    //* Cuando se de click al boton de cerrar modal.
    modalContainer.addEventListener("click", closeModal);
}

//* hacer peticion a la API de productos;
//* 1. crear una funcoi con la peticion;

function getProducts() {
    axios.get(baseUrl)
        .then((response) => {
            const products = response.data
            printProducts(products)
        })
        .catch((error) => {
            console.log(error)
        })
}
getProducts()

//* 2. renderizar los productos capturados en la API en mi HTML.

function printProducts(products) {
    let html = '';
    for(let product of products) {
        html += `
            <div class='products__element'>
                <img src='${product.image}' alt='products_img' class='products__img'>
                <p class='products__name'>${product.name}</p>
                <div class='products__div'>
                    <p class='products__price'>USD ${product.price.toFixed(2)}</p>
                    <p class="products__price">${product.price.toFixed(2)}</p>    
                </div>
                <div class='products__div products__div--flex'>
                    <button data-id='${product.id}' class='products__button'>
                        <ion-icon name="add-outline" class="add_car"></ion-icon>
                    </button>
                    <button data-id="${product.id}" data-description="$product.description}" class="products__button products__button--search products__details">
                        <ion-icon name="search-outline></ion-icon>
                    </button>    
                </div>
            </div>
        `
    }
    productsList.innerHTML = html
}

//* Agregar los productos al carrito
//* 1. Capturar la informacion del producto al que se de click
function addProduct(event){
    //* Metodo contains => valida si existe un elemento dentro de la clase
    if(event.target = event.target.parentElement.parentElement
        const product = event.target.parentElement.parentElement
        //* parentElement => nos ayuda acceder al padre inmediatamente superior del elemento
        carProductsElements(product)
        )
}

//* 2. Debemos transformar la informacion HTML a un array de objetos
//* 2.1 debo validar si el elemento seleccionado ya se encuentra del array del carrito (carProducts).
//*     si existe, le debo de sumar una unidad para que no se repita.
function carProductsElements(product){
    const infoProduct = {
        id: product.querySelector('button').getAttribute('data-id'),
        image: product.querySelector('img').src,
        name: product.querySelector('p').textContent,
        price: product.querySelector('.products__div .products__price').textContent,
        quantity: 1
        // textContent nos permite pedir el texto que contiene un elemento.
    }

    //* Agregar el objeto de infoProduct al array de carProducts, pero hay que validar si el elemento existe o no.
    //? El primer if valida si por lo menos un elemento que se encuentra en carProducts es igual al que quiero enviarle en infoProducts.
    if(carProducts.some(product => product.id === infoProduct.id )) { //True or False

        const productIncrement = carProducts.map(product => {
            if(product.id === infoProduct.id){
                product.quantity++
                return product
            } else {
                return product
            }
        })
        carProducts = [ ...productIncrement ]
    } else {
        carProducts = [ ...carProducts, infoProduct ]
    }
    carElementsHTML();
}

function carElementsHTML() {

    let carHTML = '';
    for (let product of carProducts){
        carHTML += `
        <div class="car__products">
            <img src="${product.image}">
            </div>
            <div class="car__product__description">
                <p>${product.name}</p>
                <p>Precio: ${product.price}</p>
                <p>Cantidad: ${product.quantity}</p>
            </div>
            <div class="car__product__button">
                <button class="delete__product" data-id="${product.id}">
                    Delete
                </button>
            </div>
        </div>
        <hr>
        `
    }
    carList.innerHTML = carHTML;

    let value = carProducts.length
    carCounter.innerHTML = `<p>${value}</p>`
}

