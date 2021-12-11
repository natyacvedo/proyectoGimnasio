export function campoRequerido(input) {
    // console.log('Desde la funcion campo requerido')
    if (input.value.trim().length > 0) {
        // console.log('aqui esta todo bien');
        input.className = 'form-control is-valid';
        return true;
    } else {
        // console.log('aqui muestro un error');
        input.className = 'form-control is-invalid';
        return false;
    }
}

export function validarNumeros(input) {
    // vamos a crear una expresion regular
    let patron = /^[0-9]{10,15}$/;
    // el metodo test devuelve true, false
    // expresionregular.test(texto a validar)
    if (patron.test(input.value)) {
        // cumple con la expresion regular
        input.className = 'form-control is-valid';
        return true;
    } else {
        input.className = 'form-control is-invalid';
        return false;
    }
}

export function validarContraseña(input) {
    // Minimum eight characters, at least one letter and one number:
    let patron = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/
    if (patron.test(input.value)) {
        input.className = 'form-control is-valid';
        return true;
    }
    else {
        alert("La constraseña debe tener minimo 6 caracteres, al menos una letra o un numero");
        input.className = 'form-control is-invalid';
        return false;
    }
}

export function validarGeneral(campoNombre, campoEmail, campoTelefono, campoContraseña) {
    // prevenir el actualizar del submit
    // let alerta = document.querySelector('#msjAlerta');
    if (campoRequerido(campoNombre) &&
        campoRequerido(campoEmail) &&
        validarNumeros(campoTelefono) &&
        validarContraseña(campoContraseña)) {
        // alerta.className = 'alert alert-danger my-5 d-none';
        return true;
    } else {
        console.log('los datos estan mal');
        // alerta.className = 'alert alert-danger my-5';
        return false;
    }
}
