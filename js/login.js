import { campoRequerido, validarGeneral, validarContraseña } from './validacionesLogin'
import { validarNumeros } from './validacionesRegistro';

let campoEmailLogin = document.querySelector('#emailLogin');
let campoPassword = document.querySelector('#password');
let formularioLogin = document.querySelector('#formLogin');

campoEmailLogin.addEventListener('blur', () => { campoRequerido(campoEmailLogin) });
campoPassword.addEventListener('blur', () => { validarContraseña(campoPassword) });
formularioLogin.addEventListener('blur', () => { guardarUsuario(formularioLogin) });


