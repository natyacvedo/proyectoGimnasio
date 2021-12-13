let listadoProductos =
  JSON.parse(localStorage.getItem("keyLocalStorage")) || [];
console.log(listadoProductos);

listadoProductos.forEach((item) => {
  crearColumnas(item);
});

function crearColumnas(item) {
  let grilla = document.querySelector("#grilla");
  grilla.innerHTML += `<div class="col-12 col-md-4 col-lg-3 mb-3">
  <div class="card">
    <img src="${item.url}" class="card-img-top" alt="${item.producto}" >
    <div class="card-body">
      <h5 class="card-title">${item.descripcion}</h5>
      <p class="card-text">ggggggg</p>
    </div>
  </div>
</div>`;
}
