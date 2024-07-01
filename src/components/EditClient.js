// src/components/EditClient.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditClient = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [client, setClient] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    cuenta: '',
    saldo: '',
    contrasena: ''
  });

  useEffect(() => {
    loadClient();
  }, []);

  const loadClient = async () => {
    try {
      const result = await axios.get(`http://vps-4209517-x.dattaweb.com:8080/bancoa/api/clientes/id/${id}`);
      setClient(result.data);
    } catch (error) {
      console.error('Error fetching client data:', error);
      alert('Hubo un error al obtener los datos del cliente.');
    }
  };

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://vps-4209517-x.dattaweb.com:8080/bancoa/api/clientes/editar/${id}`, client);
      navigate("/ClientList");
    } catch (error) {
      console.error("Error updating client:", error);
      alert('Hubo un error al actualizar el cliente.');
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Actualizar Cliente</h2>

          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='nombre' className='form-label'>Nombre</label>
              <input
                type='text'
                className='form-control'
                id='nombre'
                name='nombre'
                placeholder='Ingresa el nombre'
                value={client.nombre}
                onChange={handleChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='apellido' className='form-label'>Apellido</label>
              <input
                type='text'
                className='form-control'
                id='apellido'
                name='apellido'
                placeholder='Ingresa el apellido'
                value={client.apellido}
                onChange={handleChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='dni' className='form-label'>DNI</label>
              <input
                type='text'
                className='form-control'
                id='dni'
                name='dni'
                placeholder='Ingresa el DNI'
                value={client.dni}
                onChange={handleChange}
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
                placeholder='Ingresa la cuenta'
                value={client.cuenta}
                onChange={handleChange}
                maxLength={10} // Limitar la longitud máxima del input
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='saldo' className='form-label'>Saldo</label>
              <input
                type='number'
                className='form-control'
                id='saldo'
                name='saldo'
                placeholder='Ingresa el saldo'
                value={client.saldo}
                onChange={handleChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='contrasena' className='form-label'>Contraseña</label>
              <input
                type='text'
                className='form-control'
                id='contrasena'
                name='contrasena'
                placeholder='Ingresa la contraseña'
                value={client.contrasena}
                onChange={handleChange}
                maxLength={4} // Limitar la longitud máxima del input
              />
            </div>
            <button type='submit' className='btn btn-outline-primary'>Actualizar</button>
            <Link className='btn btn-outline-danger mx-2' to='/ClientList'>Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditClient;
