import React, { useState, useEffect } from 'react';
import logo from './assets/img/logo.svg';
import './assets/css/Ventas.css';
import Swal from 'sweetalert2';
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
      Swal.fire({
        icon: 'error',
        title: 'Campo vacio!',
        text: 'Todos los campos son obligatorios.'
      })
      return;
    } else if (contrasena !== confirmarContrasena) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseñas invalidas!',
        text: 'Contraseñas no coinciden. Por favor, verifica y vuelve a intentarlo.'
      })
      return;
    } else if (contrasena.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña invalida!',
        text: 'Contraseña inválida la contraseña debe tener al menos 8 caracteres.'
      })
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
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Contraseña modificada con éxito.',
        });
        window.location.href = 'https://vanidosa-spa.onrender.com/';
      })
      .catch(error => {
        // Manejar el error de la solicitud
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Ha ocurrido un error. Por favor, inténtalo de nuevo.',
        });
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
