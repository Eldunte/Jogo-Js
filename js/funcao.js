var div = "manipulada";
// atribuir o nome da div que quer mostrar e ocultar
 
function AparecerDiv(){ // função aparecer
    document.getElementById(div).style.display = "block";
    // usamos o style.display para manupular o css da div e mostrar ela
}
 
function OcultarDiv(){  // função ocultar
    document.getElementById(div).style.display = "none";
    // usamos o style.display para manupular o css da div e ocultar ela
}