
/* INICIO FUNCIONES QUE BLOQUEA EL INSPECCIONADO DE LA PAGINA */

function blockInspetion(){

    document.addEventListener("contextmenu", function(e){
        e.preventDefault();
      }, false);
      
      document.onkeydown = function (e) {
        if (e.keyCode == 123) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
            return false;
        }
      }
      
}

/* FIN FUNCIONES QUE BLOQUEA EL INSPECCIONADO DE LA PAGINA */





/* INICIO FUNCIONES QUE ELIMINA LOS CARACTERES ESPECIALES DE UN TEXTO */

function deleteCharExpetial(text) {
    return text.replace(/"/g, '&quot;').replace(/'/g, '&#039;').replace(/\n/g, '\\n');
}

/* FIN FUNCIONES QUE ELIMINA LOS CARACTERES ESPECIALES DE UN TEXTO */





/* INICIO FUNCIONES QUE OBTIENE LA URL DE LA PAGINA WEB ACTUAL */

function getUrlWeb(nombre) {
    nombre = nombre.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + nombre + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/* FIN FUNCIONES QUE OBTIENE LA URL DE LA PAGINA WEB ACTUAL */






/* INICIO FUNCIONES DE POST Y GET DEL STORAGE */

function postSessionStorage(key, valor){
    sessionStorage.setItem(key, valor);
}

function getSessionStorage(key) {
    return sessionStorage.getItem(key);
}

/* FIN FUNCIONES DE POST Y GET DEL STORAGE */