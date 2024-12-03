document.addEventListener("DOMContentLoaded", cargarMenu);

let pedido = [];
let menu = {};

function cargarMenu() {
  fetch('http://localhost:5000/obtener_menu')
    .then(response => response.json())
    .then(data => {
      menu = data;
      mostrarCategorias();
    })
    .catch(error => console.error('Error al cargar el menú:', error));
}

function mostrarCategorias() {
  const categoriasDiv = document.querySelector(".categoria");
  categoriasDiv.innerHTML = "<h3>Selecciona una categoría:</h3>";
  for (let categoria in menu) {
    categoriasDiv.innerHTML += `<button onclick="mostrarOpciones('${categoria}')">${categoria}</button>`;
  }
}

function mostrarOpciones(categoria) {
  const opcionesDiv = document.getElementById("opciones");
  opcionesDiv.innerHTML = `<h3>${categoria}</h3>`;
  for (let plato in menu[categoria]) {
    const disponible = menu[categoria][plato];
    opcionesDiv.innerHTML += `
      <div>
        <input type="checkbox" id="${plato}" value="${plato}" ${!disponible ? 'disabled' : ''} onclick="seleccionar('${categoria}', '${plato}')">
        <label for="${plato}" style="${!disponible ? 'color: red;' : ''}">${plato} ${!disponible ? '(No disponible)' : ''}</label>
      </div>`;
  }
}

function seleccionar(categoria, plato) {
  const checkbox = document.getElementById(plato);
  if (checkbox.checked) {
    pedido.push(`${categoria}: ${plato}`);
  } else {
    pedido = pedido.filter(p => p !== `${categoria}: ${plato}`);
  }
}

function enviarPedido() {
  if (pedido.length > 0) {
    fetch('http://localhost:5000/enviar_pedido', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre: nombre, pedido: pedido })
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message || "Pedido enviado correctamente");
      pedido = []; // Limpia el pedido
      document.getElementById("opciones").innerHTML = "";
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un error al enviar el pedido.');
    });
  } else {
    alert("No has seleccionado ningún artículo.");
  }
}
