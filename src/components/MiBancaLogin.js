import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const MiBancaLogin = () => {
  const navigate = useNavigate();
  
  const [dni, setDni] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleDniChange = (e) => {
    setDni(e.target.value);
  };

  const handleContrasenaChange = (e) => {
    setContrasena(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dni.trim() === '' || contrasena.trim() === '') {
      setError('Por favor completa ambos campos.');
      return;
    }

    const loginData = {
      dni: dni,
      contrasena: contrasena
    };

    console.log("LoginData to send:", loginData);

    try {
      const response = await axios.post("http://vps-4209517-x.dattaweb.com:8080/bancoa/api/clientes/login", loginData);
      alert(response.data);
      alert('Acceso correcto');
      localStorage.setItem('dni', dni); // Guardar DNI en localStorage
      navigate(`/dashboard/${dni}`); // Redirige a la página principal después de iniciar sesión
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError('DNI o Contraseña incorrectos.');
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Inicio de Sesión</h2>

          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='dni' className='form-label'>DNI</label>
              <input
                type='text'
                className='form-control'
                id='dni'
                placeholder='Ingresa tu DNI'
                value={dni}
                onChange={handleDniChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='contrasena' className='form-label'>Contraseña</label>
              <input
                type='password'
                className='form-control'
                id='contrasena'
                placeholder='Ingresa tu contraseña'
                value={contrasena}
                onChange={handleContrasenaChange}
              />
            </div>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <button type='submit' className='btn btn-outline-primary'>Iniciar Sesión</button>
            <Link className='btn btn-outline-danger mx-2' to='/'>Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MiBancaLogin;
