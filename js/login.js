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
        <p class="error text-danger">Introduzca un email válido</p>
        `
        document.getElementById("usuario").style.borderColor = " red ";

        valido = false;
    } else {
        contenido = "";
    }
    if (y == "" || y == null) {
        contenido1 += `
        <p class="error text-danger">Contraseña inválida</p>
      `
        document.getElementById("password").style.borderColor = " red ";
        valido = false;
    } else {
        contenido1 = "";
    }
    document.getElementById("erroruser").innerHTML = contenido;
    document.getElementById("errorpassword").innerHTML = contenido1;

    return valido;
}

var miStorage = window.sessionStorage;


function validateLogin() {
    var usuario = document.getElementById("usuario").value;
    /*var password = document.getElementById("password").value;*/

    //para  el usuario deberás almacenarlo en la pantalla de autenticación 18/08/2020 
    var checkBox = document.getElementById("Recuerdame").checked;
    if (checkBox) {
        localStorage.setItem("keyUsuario", usuario);
        miStorage.removeItem("keyUsuario");
        alert("localStorage: " + localStorage.getItem("keyUsuario"));

    } else {

        miStorage.setItem("keyUsuario", usuario);
        localStorage.removeItem("keyUsuario");

        alert("sessionStorage: " + miStorage.getItem("keyUsuario"));
    }


    // por acá se mantiene el redireccionamiento
    if (dataLogin() == false) {
        return dataLogin();
    } else {
        return window.location.href = "index2.html";
    }
}


document.addEventListener("DOMContentLoaded", function(e) {});