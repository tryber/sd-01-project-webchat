export default function formatDate() {
  const data = new Date();
  const dia = data.getDate().toString();
  const diaF = dia.length === 1 ? '0' + dia : dia;
  const mes = (data.getMonth() + 1).toString();
  const mesF = mes.length === 1 ? '0' + mes : mes;
  const anoF = data.getFullYear();
  const hora = data.getHours();
  const minuto = data.getMinutes();
  const segundos = data.getSeconds();
  const response = `${diaF}/${mesF}/${anoF} às ${hora}:${minuto}:${segundos}`;
  return response;
}
