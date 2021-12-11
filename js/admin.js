import {campoObligatorio, validarNumeros, validarUrl, validarFormulario} from "./validaciones.js"

//traigo los elementos a los que quiero aplicarle un evento
let inputCodigo = document.querySelector("#codigo");
let inputProducto = document.querySelector("#producto");
let inputDescripcion = document.querySelector("#descripcion");
let inputCantidad = document.querySelector("#cantidad");
let inputUrl = document.querySelector("#url");
let formularioProducto = document.querySelector("#formProducto");

//aplico el evento al elemento que traje
inputCodigo.addEventListener("blur", () => {
  campoObligatorio(inputCodigo);
});
inputProducto.addEventListener("blur", () => {
  campoObligatorio(inputProducto);
});
inputDescripcion.addEventListener("blur", () => {
  campoObligatorio(inputDescripcion);
});
inputCantidad.addEventListener("blur", () => {
  validarNumeros(inputCantidad);
});
inputUrl.addEventListener("blur", () => {
  validarUrl(inputUrl);
});
formularioProducto.addEventListener("submit", guardarProducto);

function guardarProducto(e){
e.preventDefault()
if(validarFormulario(inputCodigo, inputProducto, inputDescripcion, inputCantidad, inputUrl)){
    crearProducto();

}

}

function crearProducto(){
    console.log("crear producto")
}
