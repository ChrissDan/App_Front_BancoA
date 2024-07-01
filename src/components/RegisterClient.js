import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterClient = () => {
  const navigate = useNavigate();

  const [client, setClient] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    cuenta: '',
    saldo: '',
    contrasena: ''
  });

  const { nombre, apellido, dni, cuenta, saldo, contrasena } = client;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica que todos los campos estén llenos
    if (nombre.trim() === '' || apellido.trim() === '' || dni.trim() === '' ||
        cuenta.trim() === '' || saldo.trim() === '' || contrasena.trim() === '') {
      alert('Por favor completa todos los campos.');
      return;
    }

    const clientData = {
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      cuenta: parseInt(cuenta, 10), // Convertir a número
      saldo: parseInt(saldo, 10), // Convertir a número
      contrasena: contrasena
    };

    console.log("ClientData to send:", clientData);  // Verifica que los datos a enviar sean correctos

    try {
      await axios.post("http://vps-4209517-x.dattaweb.com:8080/bancoa/api/clientes/register", clientData);
      alert('Registro Exitoso');
      navigate("/internetBanking");
    } catch (error) {
      console.error("Error al registrar:", error);
      alert('Hubo un error al registrar.');
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Aperturar Cuenta</h2>

          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='nombre' className='form-label'>Nombre</label>
              <input
                type='text'
                className='form-control'
                id='nombre'
                name='nombre'
                placeholder='Ingresa tu nombre'
                value={nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='apellido' className='form-label'>Apellido</label>
              <input
                type='text'
                className='form-control'
                id='apellido'
                name='apellido'
                placeholder='Ingresa tu apellido'
                value={apellido}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='dni' className='form-label'>DNI</label>
              <input
                type='text'
                className='form-control'
                id='dni'
                name='dni'
                placeholder='Ingresa tu DNI'
                value={dni}
                onChange={handleInputChange}
                maxLength={8} // Limitar la longitud máxima del input
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='cuenta' className='form-label'>Cuenta</label>
              <input
                type='text'
                className='form-control'
                id='cuenta'
                name='cuenta'
                placeholder='Ingresa tu cuenta'
                value={cuenta}
                onChange={handleInputChange}
                maxLength={10} // Limitar la longitud máxima del input
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='saldo' className='form-label'>Saldo</label>
              <input
                type='text'
                className='form-control'
                id='saldo'
                name='saldo'
                placeholder='Ingresa tu saldo'
                value={saldo}
                onChange={handleInputChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='contrasena' className='form-label'>Contraseña</label>
              <input
                type='password'
                className='form-control'
                id='contrasena'
                name='contrasena'
                placeholder='Ingresa tu contraseña'
                value={contrasena}
                onChange={handleInputChange}
                maxLength={4} // Limitar la longitud máxima del input
              />
            </div>
            <button type='submit' className='btn btn-outline-primary'>Registrar</button>
            <Link className='btn btn-outline-danger mx-2' to='/'>Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterClient;
