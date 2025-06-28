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

  const formBody = new URLSearchParams();
  formBody.append("fecha", fecha);
  formBody.append("hora", hora);
  formBody.append("nombre", nombre);
  formBody.append("vehiculo", vehiculo);
  formBody.append("observaciones", observaciones);

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: formBody.toString()
  })
    .then(res => res.text())
    .then(text => {
      if (text.trim() === "ok") {
        document.getElementById("respuesta").innerText = "✅ ¡Turno reservado con éxito!";
      } else if (text.trim() === "ocupado") {
        document.getElementById("respuesta").innerText = "❌ Ese turno ya está ocupado.";
      } else {
        document.getElementById("respuesta").innerText = "⚠️ Respuesta inesperada.";
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById("respuesta").innerText = "⚠️ Error al enviar. Revisá la conexión.";
    });
}
