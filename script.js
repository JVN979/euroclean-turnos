const URL = "https://script.google.com/macros/s/AKfycbxSBwEKb6C_VjQC1HlVmDbC_FZRFPN1W_4bLGbJT8CBZgIp9wsRm9saBrvkhx_HHYpk/exec";

const picker = new Pikaday({
  field: document.getElementById("fecha"),
  format: "YYYY-MM-DD",
  toString(date, format) {
    return date.toISOString().split("T")[0];
  }
});

function reservarTurno() {
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const nombre = document.getElementById("nombre").value;
  const vehiculo = document.getElementById("vehiculo").value;
  const observaciones = document.getElementById("observaciones").value;

  if (!fecha || !hora || !nombre || !vehiculo) {
    document.getElementById("respuesta").innerText = "⚠️ Completá todos los campos obligatorios.";
    return;
  }

  const formData = new FormData();
  formData.append("fecha", fecha);
  formData.append("hora", hora);
  formData.append("nombre", nombre);
  formData.append("vehiculo", vehiculo);
  formData.append("observaciones", observaciones);

  fetch(URL, {
    method: "POST",
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "ok") {
        document.getElementById("respuesta").innerText = "✅ ¡Turno reservado con éxito!";
      } else {
        document.getElementById("respuesta").innerText = "❌ Ese turno ya está ocupado. Probá otro.";
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById("respuesta").innerText = "⚠️ Error al enviar. Revisá la conexión.";
    });
}
