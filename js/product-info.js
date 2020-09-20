//definir variables globales 
var product = {};
var Com = {};
var productRelac = {};


/* mostrar las imagenes de productos*/
/*function showProductImagesGallery(array) {

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
        document.getElementById("productImageGallery").innerHTML = htmlContentToAppend;
    }
}*/

/* para mostrar los comentarios*/
var comments = [];
let htmlContentToAppend = "";

function showComments() {
    htmlContentToAppend = "";
    for (let i = 0; i < comments.length; i++) {
        let comment = comments[i];

        htmlContentToAppend += `
        <div class="row">
            <div class="col">
            <div style= " margin-botton: 20px;">

            <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${comment.user}</h5>
            <small class="text-muted">  <span class="fa fa-star checked"></span> ${comment.score} /5 </small>
            </div>

            <div class="d-flex w-100 justify-content-between">
            <small class="mb-1">Fecha: ${comment.dateTime}</small>
            </div>
              
            <p class="mb-1"> ${comment.description}</p>
           
            </div>             
            </div>
        </div>
       
        `

        document.getElementById("comments").innerHTML = htmlContentToAppend;
    }

}

/*ingresar nuevo comentario y valoracion al listado*/
var stars = {};

document.getElementById('star1').addEventListener("click", function() {
    stars = 1;
});
document.getElementById('star2').addEventListener("click", function() {
    stars = 2;
});
document.getElementById('star3').addEventListener("click", function() {
    stars = 3;
});
document.getElementById('star4').addEventListener("click", function() {
    stars = 4;
});
document.getElementById('star5').addEventListener("click", function() {
    stars = 5;
});

var commentSend = {};

function sendComment(array) {
    var contenido = "";
    let htmlContentToAppend = document.getElementById('productComments').value;

    if (stars == undefined) {
        document.getElementById("errorEstrellas").innerHTML = `<p class="error text-danger">Ups! no marcó su evaluación</p>`;
        document.getElementById("errorEstrellas").style.color = "red";
        document.getElementById("errorEstrellas").disabled = false;

    } else {
        document.getElementById("errorEstrellas").innerHTML = "";
        if (htmlContentToAppend == "") {
            contenido += `<p class="error text-danger">Ups! su comentario está en blanco</p>`
            document.getElementById('errorComment').innerHTML = contenido;
            document.getElementById("productComments").style.borderColor = " red ";

        } else {
            document.getElementById('errorComment').innerHTML = "";
            document.getElementById("productComments").style.borderColor = "";
            let date = new Date();
            let fullDate = date.getDate() + '-' + date.getMonth() + 1 + '-' + date.getFullYear() +
                ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            let comentario = {
                user: document.getElementById("logged").innerHTML,
                score: stars,
                dateTime: fullDate,
                description: htmlContentToAppend,
            };
            comments.push(comentario);
            showComments();

        }
    }
}
//funcion creada para mostrar los productos relacionados 
function showRelatedProducts(array1, array2) {
    var imagen1 = {};
    var imagen2 = {};

    imagen1 = `
     <a href="product-info.html" class="list-group-item list-group-item-action">
     <div class="row w-25">
     <div class="col-6">
     <img src="` + array2[array1.relatedProducts[0]].imgSrc + ` " class="img-thumbnail">
     </div>
     <div class="col-6">
     <h6>` + array2[array1.relatedProducts[0]].name + `</h6>
     <p>` + array2[array1.relatedProducts[0]].currency + ` ` + array2[array1.relatedProducts[0]].cost + `</p>
     </div>
     </div>
     </a>
     `

    imagen2 = `
     <a href="product-info.html" class="list-group-item list-group-item-action">
     <div class="row w-25">
     <div class="col-6">
     <img src="` + array2[array1.relatedProducts[1]].imgSrc + ` " class="img-thumbnail">
     </div>
     <div class="col-6">
     <h6>` + array2[array1.relatedProducts[1]].name + `</h6>
     <p>` + array2[array1.relatedProducts[1]].currency + ` ` + array2[array1.relatedProducts[1]].cost + `</p>
     </div>
     </div>
     </a>
     `



    document.getElementById("productsRelated1").innerHTML = imagen1;
    document.getElementById("productsRelated2").innerHTML = imagen2;


}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

/*manejar el json para producto*/
document.addEventListener("DOMContentLoaded", function(e) {
    stars = undefined
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productsCountHTML = document.getElementById("productsCount");



            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost + " " + product.currency;
            productsCountHTML.innerHTML = product.soldCount;


            //Muestro las imagenes en forma de galería
            //showProductImagesGallery(product.images);
        }
    });

    /*json para comentarios*/
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultCom) {
        if (resultCom.status === "ok") {
            comments = resultCom.data;

            document.getElementById('btn-show-comments').addEventListener('click', function(e) {
                    e.preventDefault();
                    if (document.getElementById('comments').style.display == 'none') {
                        document.getElementById('comments').style.display = 'block';
                    } else {
                        document.getElementById('comments').style.display = 'none'
                    }

                })
                //Muestro los comentarios
            showComments(comments);
        }
    });



    /*Json para obtener los productos relacionados */
    getJSONData(PRODUCTS_URL).then(function(resultPro) {
        if (resultPro.status === "ok") {
            productRelac = resultPro.data;

            showRelatedProducts(product, productRelac);

        }
    });

});