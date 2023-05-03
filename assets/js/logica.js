var url = "https://digimon-api.vercel.app/api/digimon"
//llenado tabla
var table = document.querySelector("#table")
fetch(url)
  .then(response => response.json())
  .then(datos => {
    let contador = 1
    for (item of datos) {
      table.innerHTML += `
        <tr onmouseover="showPopup(event, '${item.img}', '${item.name}', '${item.level}')">
          <th scope="row" style="vertical-align: middle;">${contador}</th>
          <th scope="row" style="vertical-align: middle;">${item.name}</th>
          <td style="vertical-align: middle;">${item.level}</td>
          <td style="vertical-align: middle;"><img src="${item.img}" alt="${item.name}" style="max-width: 50px;"></td>
        </tr>
      `;
      // coloca la tarjeta con digimon
      if (contador==1) {
        contenido1.innerHTML = `
        <div class="tarjeta text-center">
          <div class="card" style="width: 22rem;">
            <img src="${item.img}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.level}</p>
              </div>
          </div>
        </div>  
      `;
      }
      contador++; // Incrementar el contador 
    }
  })
//capta el moviemiento del raton sobre la tabla
function showPopup(event, imgSrc, tnom, tniv) {
  var td = event.target.closest("tr").querySelector("td:last-child");
  /* agranda la imagen en la tabla
  td.innerHTML = `
  <img src="${imgSrc}" width="100px"/>
  `;
  */
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
}
//el raton esta fuera de la tabla
table.addEventListener("mouseout", function (event, imgSrc, tnom, tniv) {
  var td = event.target.closest("tr").querySelector("td:last-child");
  //td.innerHTML = ``;
})
//busqueda
$("#buscar input").on("keyup", function() {
  cont=1
  var input = $(this).val().toLowerCase();
  $("#table tbody tr").each(function() {
    var row = $(this);
    if (row.text().toLowerCase().indexOf(input) !== -1) {
      if (cont==1) {
        // solo informacion interna para obtener el numero de la primera fila de la tabla, despues de la busqueda
        // obtener los valores de las celdas de la fila
          var valores = $(this).text().split(",");
          console.log(this)
          //console.log($(this).text().split(",")[0]); 
          texto1=row.text()
          texto2=texto1.split("\n")
          console.log(texto2)
          numero=parseInt(texto2[1])
        //
        fetch(url)
        .then(response => response.json())
        .then(datos => {
          let contador = 1
          for (item of datos) {
            // coloca la tarjeta con digimon
            if (contador==numero) {
              contenido1.innerHTML = `
              <div class="tarjeta text-center">
                <div class="card" style="width: 22rem;">
                  <img src="${item.img}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${item.name}</h5>
                      <p class="card-text">${item.level}</p>
                    </div>
                </div>
              </div>  
              `;
            }
            contador++; // Incrementar el contador 
          }
        })
      }
      cont=cont+1
      row.show();
    } else {
      row.hide();
    }
  });
});

