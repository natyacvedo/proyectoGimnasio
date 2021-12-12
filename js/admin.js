import {
  campoObligatorio,
  validarNumeros,
  validarUrl,
  validarFormulario,
} from "./validaciones.js";
import { NuevoProducto } from "./claseProducto.js";

let inputCodigo = document.querySelector("#codigo");
let inputProducto = document.querySelector("#producto");
let inputDescripcion = document.querySelector("#descripcion");
let inputCantidad = document.querySelector("#cantidad");
let inputUrl = document.querySelector("#url");
let formularioProducto = document.querySelector("#formProducto");
let listadoProductos =
  JSON.parse(localStorage.getItem("keyLocalStorage")) || [];
//para crear producto la variable tiene que estar en false, si esta en true quiero modificar el producto existente
let productoExistente = false;
let botonNuevo = document.querySelector("#botonNuevo");

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
botonNuevo.addEventListener("click", limpiarFormulario);

cargaInicial();

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
    if (productoExistente == false) {
      crearProducto();
    } else {
      modificarProducto();
    }
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
  Swal.fire("Producto creado", "Su producto fue creado con éxito", "success");
  crearFila(nuevoProducto);
}

function limpiarFormulario() {
  formularioProducto.reset();
  inputCodigo.className = "form-control";
  inputProducto.className = "form-control";
  inputDescripcion.className = "form-control";
  inputCantidad.className = "form-control";
  inputUrl.className = "form-control";
  productoExistente = false;
}

function guardarLocalStorage() {
  localStorage.setItem("keyLocalStorage", JSON.stringify(listadoProductos));
}

function crearFila(producto) {
  let tablaProductos = document.getElementById("tablaProductos");
  tablaProductos.innerHTML += ` <tr>
  <td class="fw-bold">${producto.codigo}</td>
  <td>${producto.producto}</td>
  <td>${producto.descripcion}</td>
  <td>${producto.cantidad}</td>
  <td>${producto.url}</td>
  <td>
    <button class="btn btn-warning" onclick= "prepararEdicionProducto(${producto.codigo})">Editar</button
    ><button class="btn btn-danger" onclick= "borrarProducto(${producto.codigo})" >Borrar</button>
  </td>
</tr>`;
}

function cargaInicial() {
  if (listadoProductos.length > 0) {
    listadoProductos.forEach((itemObjeto) => {
      crearFila(itemObjeto);
    });
  }
}

window.prepararEdicionProducto = function (codigo) {
  console.log("desde editar");
  console.log(codigo);
  let productoEncontrado = listadoProductos.find((itemObjeto) => {
    return itemObjeto.codigo == codigo;
  });
  console.log(productoEncontrado);
  inputCodigo.value = productoEncontrado.codigo;
  inputProducto.value = productoEncontrado.producto;
  inputDescripcion.value = productoEncontrado.descripcion;
  inputCantidad.value = productoEncontrado.cantidad;
  inputUrl.value = productoEncontrado.url;
  productoExistente = true;
};

function modificarProducto(){
  console.log("modificar producto");
  let posicionProducto = listadoProductos.findIndex((itemProducto) =>{return itemProducto.codigo == inputCodigo.value})
  console.log(posicionProducto)
  listadoProductos[posicionProducto].producto = inputProducto.value;
  listadoProductos[posicionProducto].descripcion = inputDescripcion.value;
  listadoProductos[posicionProducto].cantidad = inputCantidad.value;
  listadoProductos[posicionProducto].url = inputUrl.value;
  guardarLocalStorage();
  modificarTabla();
  cargaInicial();
  Swal.fire("Producto modificado", "Su producto fue modificado con éxito", "success");
  limpiarFormulario();
}

function modificarTabla(){
  let tbodyProductos = document.querySelector("#tablaProductos");
  tbodyProductos.innerHTML = "";
}

window.borrarProducto = function(codigo){
  
  let arregloNuevo = listadoProductos.filter((item) => {return item.codigo != codigo})
  listadoProductos = arregloNuevo;
  guardarLocalStorage();
  modificarTabla();
  cargaInicial();
  Swal.fire("Producto eliminado", "Su producto fue eliminado con éxito", "success");
}
