export function campoRequerido(input) {
    if (input.value.trim().length > 0) {
        input.className = 'form-control is-valid';
        return true;
    } else {
        input.className = 'form-control is-invalid';
        return false;
    }
}

export function validarNumeros(input) {
    let patron = /^[0-9]{10,15}$/;
    if (patron.test(input.value)) {
        input.className = 'form-control is-valid';
        return true;
    } else {
        input.className = 'form-control is-invalid';
        return false;
    }
}

export function validarContraseña(input) {
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
    if (campoRequerido(campoNombre) &&
        campoRequerido(campoEmail) &&
        validarNumeros(campoTelefono) &&
        validarContraseña(campoContraseña)) {
        return true;
    } else {
        console.log('los datos estan mal');
        return false;
    }
}
