import {
  campoObligatorio,
  validarNumeros,
  validarUrl,
  validarFormulario,
} from "./validacionesRegistro.js";
import { NuevoProducto } from "./claseProducto.js";


let inputCodigo = document.querySelector("#codigo");
let inputProducto = document.querySelector("#producto");
let inputDescripcion = document.querySelector("#descripcion");
let inputCantidad = document.querySelector("#cantidad");
let inputUrl = document.querySelector("#url");
let formularioProducto = document.querySelector("#formProducto");
let listadoProductos = JSON.parse(localStorage.getItem("keyLocalStorage")) || [];


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

function guardarProducto(e) {
  e.preventDefault();
  if (
    validarFormulario(
      inputCodigo,
      inputProducto,
      inputDescripcion,
      inputCantidad,
      inputUrl
    )
  ) {
    crearProducto();
  }
}

function crearProducto() {
  let nuevoProducto = new NuevoProducto(
    inputCodigo.value,
    inputProducto.value,
    inputDescripcion.value,
    inputCantidad.value,
    inputUrl.value
  );
  listadoProductos.push(nuevoProducto);
  limpiarFormulario();
  guardarLocalStorage();
}

function limpiarFormulario() {
  formularioProducto.reset();
  inputCodigo.className = "form-control";
  inputProducto.className = "form-control";
  inputDescripcion.className = "form-control";
  inputCantidad.className = "form-control";
  inputUrl.className = "form-control";
}

function guardarLocalStorage(){
  localStorage.setItem("keyLocalStorage", JSON.stringify(listadoProductos))
}