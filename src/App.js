import React from 'react';
import logo from './assets/img/logo.svg';
import './assets/css/Ventas.css';

function App() {
  return (
    <>
      <div className="container-recover-pass">

        <div className="content-recover-pass">

          <div className='container-logo'>
            <img className="content-logo" src={logo} alt="Logo de la empresa" />
          </div>

          <p>REESTABLECER CONTRASEÑA</p>

          <form id="formulario" className="input-inicio">
            <input type="text" placeholder="Contraseña Nueva"
              id="contrasena"
            /><br/>
            <input type="text" placeholder="Confirmar Contraseña"
              id="confircontrasena"
            />
          </form>

          <div className='container-bottom'>
          <button className="btn btn-primary bnt-loguear" id="registrar" type="submit" value="Registrar">
            Reestablecer
          </button>
          </div>

        </div>

      </div>
    </>
  );
}

export default App;
