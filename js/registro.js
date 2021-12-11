import { campoRequerido, validarNumeros, validarGeneral, validarContraseña } from './validaciones.js'
import { Usuario } from "./usuarioClass.js";

//traigo el elemento que necesito del html
let campoNombre = document.querySelector('#nombre');
let campoEmail = document.querySelector('#email');
let campoTelefono = document.querySelector('#telefono');
let campoContraseña = document.querySelector('#contraseña');
let formularioUsuario = document.querySelector('#formUsuario');

// si hay algo en localstorage quiero guardarlo en el arreglo sino quiero que sea un arreglo vacio
let listaUsuarios = JSON.parse(localStorage.getItem('arregloUsuariosKey')) || [];
let usuarioExistente = false; // si usuarioExistente es false quiero crear, si es true quiero modificar un usuario existe.
let btnNuevo = document.querySelector("#btnNuevo");

//asociar un evento a un elemento del html
campoNombre.addEventListener('blur', () => { campoRequerido(campoNombre) });
campoEmail.addEventListener('blur', () => { campoRequerido(campoEmail) });
campoTelefono.addEventListener('blur', () => { validarNumeros(campoTelefono) });
campoContraseña.addEventListener('blur', () => { validarContraseña(campoContraseña) });
formularioUsuario.addEventListener('submit', guardarUsuarios);
btnNuevo.addEventListener("click", limpiarFormulario);

// llamo a carga inicial
cargaInicial();

function guardarUsuarios(e) {
    // verificar que todos los datos sean validados
    e.preventDefault();
    if (validarGeneral(campoNombre, campoEmail, campoTelefono, campoContraseña)) {
        if (usuarioExistente == false) {
            //crear un usuario
            crearUsuario();
        } else {
            // modificar un usuario
            modificarUsuario();
        }
    }
}

// CREAR USUARIO
function crearUsuario() {
    // crear un objeto usuario
    let usuarioNuevo = new Usuario(campoNombre.value, campoEmail.value, campoTelefono.value, campoContraseña.value);
    // guarda el objeto dentro del arreglo de usuarios
    listaUsuarios.push(usuarioNuevo);
    console.log('usuarioNuevo' + usuarioNuevo);
    //limpiar el formulario
    limpiarFormulario();
    //guardar el arreglo de usuarios dentro de localstorage
    guardarLocalStorage();
    // mostrar un cartelito al usuario
    // Swal.fire(
    //     'Usuario creado',
    //     'Su usuario fue correctamente cargado',
    //     'success'
    // )
    // cargar el usuario en la tabla 
    crearFila(usuarioNuevo);
}

////////////  Limpiar informacion de los campos en html

function limpiarFormulario() {
    //limpiamos los value de un formulario
    formularioUsuario.reset();
    // resetear las clases
    campoNombre.className = 'form-control';
    campoEmail.className = 'form-control';
    campoTelefono.className = 'form-control';
    campoContraseña.className = 'form-control';

    // Tarea modificar todos los className del formulario
    // resetear la variable booleana
    usuarioExistente = false;
}

function guardarLocalStorage() {
    console.log('listaUsuarios', listaUsuarios)
    localStorage.setItem('arregloUsuariosKey', JSON.stringify(listaUsuarios));
}

function crearFila(usuario) {
    let tablaUsuarios = document.querySelector("#tablaUsuarios");
    console.log('tablaUsuarios', tablaUsuarios)
    tablaUsuarios.innerHTML += ` <tr>
    <td>${usuario.nombre}</td>
    <td>${usuario.email}</td>
    <td>${usuario.telefono}</td>
    <td>${usuario.contraseña}</td>
    <td>
    <button class="btn btn-warning" onclick="prepararEdicionUsuario('${usuario.nombre}')">Editar</button>
    <button class="btn btn-danger" onclick="borrarUsuario(${usuario.nombre})">Borrar</button>
  </td>
  </tr>`;
}

function cargaInicial() {
    if (listaUsuarios.length > 0) {
        //crear las filas
        listaUsuarios.forEach((itemUsuario) => { crearFila(itemUsuario) });
    }
}

window.prepararEdicionUsuario = function (nombre) {
    console.log("desde editar");
    // buscar el usuario en el arreglo 
    let usuarioBuscado = listaUsuario.find((itemUsuario) => { return itemUsuario.nombre == nombre });
    console.log(usuarioBuscado);
    // mostrar el usuario en el formulario
    campoNombre.value = usuarioBuscado.nombre;
    campoEmail.value = usuarioBuscado.email;
    campoTelefono.value = usuarioBuscado.telefono;
    campoContraseña.value = usuarioBuscado.contraseña;
    // cambio mi variable usuarioExistente
    usuarioExistente = true;
}

function modificarUsuario() {
    // encontrar la posicion del elemento que quiero modificar dentro del arreglo de usuarios
    let posicionObjetoBuscado = listaUsuario.findIndex((itemUsuario) => { return itemUsuario.nombre == campoNombre.value });
    //modificar los valores dentro del arreglo
    listaUsuarios[posicionObjetoBuscado].email = campoEmail.value;
    listaUsuarios[posicionObjetoBuscado].telefono = campoTelefono.value;
    listaUsuarios[posicionObjetoBuscado].contraseña = campoContraseña.value;
    // actualizar localstorage
    guardarLocalStorage();
    // actualizar la tabla
    borrarTabla();
    cargaInicial();
    // mostrar un cartelito al usuario
    Swal.fire(
        'Usuario modificado',
        'Su usuario fue correctamente actualizado',
        'success'
    );
    // limpiar el formulario
    limpiarFormulario()
}

function borrarTabla() {
    let tbodyUsuarios = document.querySelector("#tablaUsuarios");
    tbodyUsuarios.innerHTML = " ";
}

window.borrarUsuario = function (nombre) {
    console.log('nombre', nombre);
    // buscar posicion del elemento en el arreglo y borrarlo
    let arregloNuevo = listaUsuarios.filter((item) => { return item.nombre != nombre });
    // console.log(arregloNuevo);
    // actualizar el arreglo originar y el localstorage 
    listaUsuarios = arregloNuevo;
    guardarLocalStorage();
    // actualizar la tabla
    borrarTabla();
    cargaInicial();
    // mostrar cartel al usuario
    Swal.fire(
        'Usuario eliminado',
        'Su usuario fue correctamente eliminado del sistema',
        'success'
    );
}