import React, { useState, useEffect } from 'react';
import logo from './assets/img/logo.svg';
import './assets/css/Ventas.css';

function App() {

  const [token, setToken] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  useEffect(() => {
    // Obtener el token de la URL cuando el componente se monta
    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get('token');

    if (tokenFromURL) {
      setToken(tokenFromURL);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación de contraseñas
    if (contrasena.trim() === '' || confirmarContrasena.trim() === '') {
      window.alert('Campos vacíos...\nTodos los campos son obligatorios.');
      return;
    } else if (contrasena !== confirmarContrasena) {
      window.alert('Contraseñas no coinciden.\nPor favor, verifica y vuelve a intentarlo.');
      return;
    } else if (contrasena.length < 8) {
      window.alert('Contraseña inválida.\nLa contraseña debe tener al menos 8 caracteres.');
      return;
    }

    // Continuar con el proceso de reestablecimiento de contraseña
    const usuario = {
      Contrasena: contrasena,
      token: token,
    };

    const url = 'https://api-proyecto-5hms.onrender.com/api/olvidocontrasena';

    fetch(url, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        // Hacer algo con la respuesta del servidor
        console.log(data);
        window.alert('Contraseña modificada con éxito.');
      })
      .catch(error => {
        // Manejar el error de la solicitud
        console.error('Error:', error);
        window.alert('Ha ocurrido un error. Por favor, inténtalo de nuevo.');
      });
  };
  
  return (
    <>
      <div className="container-recover-pass">
        <div className="content-recover-pass">
          <div className='container-logo'>
            <img className="content-logo" src={logo} alt="Logo de la empresa" />
          </div>
          <p>REESTABLECER CONTRASEÑA</p>
          <form id="formulario" className="input-inicio" onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Contraseña Nueva"
              id="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            /><br/>
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              id="confircontrasena"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
            />
            <div className='container-bottom'>
              <button className="btn btn-primary bnt-loguear" id="registrar" type="submit" form="formulario">
                Reestablecer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
