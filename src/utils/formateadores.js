export function capitalizarTexto(texto) {
  if (!texto) return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export function formatearAltura(altura) {
  return `${altura / 10} m`;
}

export function formatearPeso(peso) {
  return `${peso / 10} kg`;
}