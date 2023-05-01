var url = "https://digimon-api.vercel.app/api/digimon"
//llenado tabla
var table = document.querySelector("#table")
fetch(url)
  .then(response => response.json())
  .then(datos => {
    let contador = 1
    for (item of datos) {
      table.innerHTML += `
        <tr onmouseover="showPopup(event, '${item.img}','${item.name}','${item.level}')">
        <th scope="row">${contador}</th>
        <th scope="row">${item.name}</th>
        <td>${item.level}</td>
        <td></td>
        </tr>  
      `
      contador++; // Incrementar el contador 
    }
  })
// llenado tarjeta con logo en primera aparicion
contenido1.innerHTML = `
  <div class="tarjeta text-center">
    <div class="card" style="width: 22rem;">
      <br><br><br><br><br>
      <img src="./assets/img/logo.png" class="card-img-top" alt="...">
      <div class="card-body">
          <br><br>
          <h5 class="card-title"></h5>
          <p class="card-text"></p>
          <br><br>
      </div>
    </div>
  </div>  
`;
//capta el moviemiento del raton sobre la tabla
function showPopup(event, imgSrc, tnom, tniv) {
  var td = event.target.closest("tr").querySelector("td:last-child");
  td.innerHTML = `
  <img src="${imgSrc}" width="100px"/>
  `;
// coloca la tarjeta con digimon
  contenido1.innerHTML = `
  <div class="tarjeta text-center">
    <div class="card" style="width: 22rem;">
      <img src="${imgSrc}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${tnom}</h5>
          <p class="card-text">${tniv}</p>
        </div>
    </div>
  </div>  
  `;
// tarjeta con logo, el raton esta fuera de la tabla
}
table.addEventListener("mouseout", function (event) {
  var td = event.target.closest("tr").querySelector("td:last-child");
  td.innerHTML = ``;
  contenido1.innerHTML = `
<div class="tarjeta text-center">
  <div class="card" style="width: 22rem;">
    <br><br><br><br><br>
    <img src="./assets/img/logo.png" class="card-img-top" alt="...">
    <div class="card-body">
        <br><br>
        <h5 class="card-title"></h5>
        <p class="card-text"></p>
        <br><br>
    </div>
  </div>
</div>  
`;
});
//
//busqueda
$("#buscar input").on("keyup", function() {
  var input = $(this).val().toLowerCase();
  $("#table tbody tr").each(function() {
    var row = $(this);
    if (row.text().toLowerCase().indexOf(input) !== -1) {
      row.show();
    } else {
      row.hide();
    }
  });
});
