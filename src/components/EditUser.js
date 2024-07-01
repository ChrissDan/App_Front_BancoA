import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    loadUser();
  }, [id]);

  const loadUser = async () => {
    try {
      console.log(`Fetching user data for id: ${id}`);
      const result = await axios.get(`http://vps-4209517-x.dattaweb.com:8080/bancoa/api/users/${id}`);
      console.log('User data:', result.data);
      setUser(result.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Hubo un error al obtener los datos del usuario.');
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://vps-4209517-x.dattaweb.com:8080/bancoa/api/users/editar/${id}`, user);
      navigate("/UserList");
    } catch (error) {
      console.error("Error updating user:", error);
      alert('Hubo un error al actualizar el usuario.');
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Actualizar Usuario</h2>

          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='username' className='form-label'>Username</label>
              <input
                type='text'
                className='form-control'
                id='username'
                name='username'
                placeholder='Ingresa tu username'
                value={user.username}
                onChange={handleChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>Contraseña</label>
              <input
                type='text'
                className='form-control'
                id='password'
                name='password'
                placeholder='Ingresa tu contraseña'
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <button type='submit' className='btn btn-outline-primary'>Actualizar</button>
            <Link className='btn btn-outline-danger mx-2' to='/UserList'>Cancelar</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
