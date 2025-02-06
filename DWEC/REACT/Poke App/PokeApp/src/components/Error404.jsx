import React from 'react';
import { Link } from 'react-router-dom';

function Error404() {
  return (
    <div className="error-404">
      <h2>Error 404 - Página no encontrada</h2>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link to="/">Volver a la página de inicio</Link>
    </div>
  );
}

export default Error404;