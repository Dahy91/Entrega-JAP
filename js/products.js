const ORDER_ASC_BY_PRICE = "Max";
const ORDER_DESC_BY_PRICE = "Min";
const ORDER_BY_PROD_SOLDCOUNT = "Cant.";
var currentProductArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function(a, b) {
            if (a.cost < b.cost) { return -1; }

            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function(a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_SOLDCOUNT) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

//se crea una variable y una funcion para mostrar el listado de productos 


function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductArray.length; i++) {
        let product = currentProductArray[i];

        //para ordenar

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {


            //corregidos los div para que coincidan con el estilos de category y tengan responsividad 17/08/2020
            htmlContentToAppend += `
        <a href="product-info.html" class="products list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">` + product.name + `</h4>
                    <small class="text-muted">` + product.soldCount + ` artículos</small>
                </div>
                <div class="d-flex w-100 justify-content-between">
                    <p class="mb-1">Precio: ` + product.cost + `<span> ` + product.currency + `</span></p>
                    
                </div>
                <p class="mb-1">` + product.description + `</p>
            </div>
        </div>
        </a>   
    `
        }
        document.getElementById("listcontainerproducts").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productArray) {
    currentsortCriteria = sortCriteria;

    if (productArray != undefined) {
        currentProductArray = productArray;
    }

    currentProductArray = sortProducts(currentsortCriteria, currentProductArray);

    //product
    showProductsList();
}


// desafiate
function searchProducts() {
    const productSearch = document.querySelector('#searchProduct');
    let texto = productSearch.value.toLowerCase();
    document.getElementById("listcontainerproducts").innerHTML = ``;

    for (let producto of productsArray) {
        let name = producto.name.toLowerCase();
        let description = producto.description.toLowerCase();

        if (name.indexOf(texto) !== -1) {
            document.getElementById("listcontainerproducts").innerHTML += `
            <a href="product-info.html" class="products list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">` + producto.name + `</h4>
                    <small class="text-muted">` + producto.soldCount + ` artículos</small>
                </div>
                <div class="d-flex w-100 justify-content-between">
                    <p class="mb-1">Precio: ` + producto.cost + `<span> ` + producto.currency + `</span></p>
                    
                </div>
                <p class="mb-1">` + producto.description + `</p>
            </div>
        </div>
        </a>
            `;
        } else {
            if (description.indexOf(texto) !== -1) {
                document.getElementById("listcontainerproducts").innerHTML += `
                <a href="product-info.html" class="products list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + producto.name + `</h4>
                        <small class="text-muted">` + producto.soldCount + ` artículos</small>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                        <p class="mb-1">Precio: ` + producto.cost + `<span> ` + producto.currency + `</span></p>
                        
                    </div>
                    <p class="mb-1">` + producto.description + `</p>
                </div>
            </div>
            </a>
                `;
            }

        }

    }

}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT, resultObj.data);
        }
    });


    document.getElementById("productSortAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("productSortDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("productSortByCount").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }

        showProductsList();
    });

    document.getElementById('searchProduct').addEventListener("keyup", function() {

        searchProducts();

    });
});