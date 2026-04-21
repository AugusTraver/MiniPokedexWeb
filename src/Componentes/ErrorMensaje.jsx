function ErrorMensaje({ mensaje }) {
  if (!mensaje) return null;

  return <p className="error">{mensaje}</p>;
}

export default ErrorMensaje;