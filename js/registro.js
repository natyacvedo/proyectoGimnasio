import { campoRequerido, validarNumeros, validarGeneral, validarContraseña } from './validacionesRegistro.js'
import { Usuario } from "./usuarioClass.js";

let campoNombre = document.querySelector('#nombre');
let campoEmail = document.querySelector('#email');
let campoTelefono = document.querySelector('#telefono');
let campoContraseña = document.querySelector('#contraseña');
let formularioUsuario = document.querySelector('#formUsuario');

let listaUsuarios = JSON.parse(localStorage.getItem('arregloUsuariosKey')) || [];
let usuarioExistente = false; // si usuarioExistente es false quiero crear, si es true quiero modificar un producto existe.

campoNombre.addEventListener('blur', () => { campoRequerido(campoNombre) });
campoEmail.addEventListener('blur', () => { campoRequerido(campoEmail) });
campoTelefono.addEventListener('blur', () => { validarNumeros(campoTelefono) });
campoContraseña.addEventListener('blur', () => { validarContraseña(campoContraseña) });
formularioUsuario.addEventListener('submit', guardarUsuario);


cargaInicial();

function guardarUsuario(e) {
    e.preventDefault();
    if (validarGeneral(campoNombre, campoEmail, campoTelefono, campoContraseña)) {
        if (usuarioExistente == false) {
            crearUsuario();
        } else {
            modificarUsuario();
        }
    }
}

function crearUsuario() {
    let usuarioNuevo = new Usuario(campoNombre.value, campoEmail.value, campoTelefono.value, campoContraseña.value);
    listaUsuarios.push(usuarioNuevo);
    console.log('usuarioNuevo', usuarioNuevo);
    limpiarFormulario();
    guardarLocalStorage();
    crearFila(usuarioNuevo);
}

function limpiarFormulario() {
    formularioUsuario.reset();
    campoNombre.className = 'form-control';
    campoEmail.className = 'form-control';
    campoTelefono.className = 'form-control';
    campoContraseña.className = 'form-control';
    usuarioExistente = false;
}

function guardarLocalStorage() {
    localStorage.setItem('arregloUsuariosKey', JSON.stringify(listaUsuarios));
}

function crearFila(usuario) {
    let tablaUsuarios = document.querySelector("#tablaUsuarios");
    tablaUsuarios.innerHTML += ` <tr>
    <td>${usuario.nombre}</td>
    <td>${usuario.email}</td>
    <td>${usuario.telefono}</td>
    <td>${usuario.contraseña}</td>
    <td>
    <button class="btn btn-danger" onclick="borrarUsuario(${usuario.telefono})">Borrar</button>
    </td>
  </tr>`;
}


function cargaInicial() {
    if (listaUsuarios.length > 0) {
        listaUsuarios.forEach((itemUsuario) => { crearFila(itemUsuario) });
    }
}

function modificarUsuario() {
    let posicionObjetoBuscado = listaUsuarios.findIndex((itemUsuario) => { return itemUsuario.nombre == itemUsuario.nombre });
    // listaUsuarios[posicionObjetoBuscado].nombre = campoNombre.value;
    listaUsuarios[posicionObjetoBuscado].email = campoEmail.value;
    listaUsuarios[posicionObjetoBuscado].telefono = campoTelefono.value;
    listaUsuarios[posicionObjetoBuscado].contraseña = campoContraseña.value;
    guardarLocalStorage();
    borrarTabla();
    cargaInicial();
    limpiarFormulario()
}

function borrarTabla() {
    let tbodyUsuarios = document.querySelector("#tablaUsuarios");
    tbodyUsuarios.innerHTML = " ";
}


window.borrarUsuario = function (telefono) {
    let arregloNuevo = listaUsuarios.filter((item) => { return item.telefono != telefono });
    console.log(arregloNuevo);
    listaUsuarios = arregloNuevo;
    guardarLocalStorage();
    borrarTabla();
    cargaInicial();
}