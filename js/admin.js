campoObligatorio = (input) => {
  //console.log("Desde la funcion campoObligatorio")
  if (input.value.trim().length > 0) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

validarNumeros = (input) => {
  let expresion = /^[0-9]{1,3}$/;
  if (expresion.test(input.value)) {
    input.className = "form-control is-valid";
    console.log("oknumeros");
    return true;
  } else {
    input.className = "form-control is-invalid";
    console.log("no son numeros")
    return false;
  }
};

validarUrl = (input) => {
  let expresion = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (expresion.test(input.value)) {
    input.className = "form-control is-valid";
    console.log("desde validar url")
    return true;
  } else {
    input.className = "form-control is-invalid";
    console.log("no es una url")
    return false;
  }
};

function validarFormulario(e) {
  e.preventDefault();
  console.log("desde la funcion validar formulario");
  let alerta = document.querySelector("#msjAlerta");
  if(
    campoObligatorio(inputCodigo) &&
    campoObligatorio(inputProducto) &&
    campoObligatorio(inputDescripcion) &&
    validarNumeros(inputCantidad) &&
    validarUrl(inputUrl)
  ) {
    console.log("los datos estan listos");
    alerta.className = "alert alert-danger my-5 d-none";
  } else {
    console.log("los datos estan mal");
    alerta.className = "alert alert-danger my-5";
  }
}

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
formularioProducto.addEventListener("submit", validarFormulario);
