export function campoObligatorio(input) {
  if (input.value.trim().length > 0) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarNumeros(input) {
  let expresion = /^[0-9]{1,3}$/;
  if (expresion.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarUrl(input) {
  let expresion = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (expresion.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarFormulario(
  inputCodigo,
  inputProducto,
  inputDescripcion,
  inputCantidad,
  inputUrl
) {
  let alerta = document.querySelector("#msjAlerta");
  if (
    campoObligatorio(inputCodigo) &&
    campoObligatorio(inputProducto) &&
    campoObligatorio(inputDescripcion) &&
    validarNumeros(inputCantidad) &&
    validarUrl(inputUrl)
  ) {
    alerta.className = "alert alert-danger my-5 d-none";
    return true;
  } else {
    alerta.className = "alert alert-danger my-5";
    return false;
  }
}
