//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


/*Se añade estas dos funciones para la validacion  del login y el redireccionamiento al index2*/
function dataLogin() {
    var x = document.getElementById("usuario").value;
    var contenido = "";
    var y = document.getElementById("password").value;
    var contenido1 = "";
    var valido = true;
    if (x == "" || x == null || x.includes("@") == false) {
        contenido += `
        <p class="text-danger">Debe completar el campo</p>
      `
        valido = false;
    } else {
        contenido = "";
    }
    if (y == "" || y == null) {
        contenido1 += `
        <p class="text-danger">Debe completar el campo</p>
      `
        valido = false;
    } else {
        contenido1 = "";
    }
    document.getElementById("erroruser").innerHTML = contenido;
    document.getElementById("errorpassword").innerHTML = contenido1;
    return valido;
}

function validateLogin() {
    if (dataLogin() == false) {
        return dataLogin();
    } else {
        return location.href = "index2.html";
    }
}


document.addEventListener("DOMContentLoaded", function(e) {});