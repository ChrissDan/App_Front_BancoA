// src/components/ClientList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    const result = await axios.get("http://vps-4209517-x.dattaweb.com:8080/bancoa/api/clientes");
    setClients(result.data);
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Estás seguro de que quieres eliminar este usuario?');
    if (confirmed) {
      try {
        await axios.delete(`http://vps-4209517-x.dattaweb.com:8080/bancoa/api/clientes/eliminar/${id}`);
        alert('Cliente eliminado correctamente.');
        loadClients(); // Recargar la lista de usuarios después de eliminar
      } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        console.error('id:', clients.id);
        alert('Hubo un error al eliminar el Cliente. Intente nuevamente.');
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className='py-4'>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Clientes</h2>
          <button 
            className='btn btn-secondary'
            onClick={() => navigate('/')}
          >
            Menu Principal
          </button>
        </div>
        <table className='table border shadow'>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Nombre</th>
              <th scope='col'>Apellido</th>
              <th scope='col'>DNI</th>
              <th scope='col'>Cuenta</th>
              <th scope='col'>Saldo</th>
              <th scope='col'>Contraseña</th>
              <th scope='col'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              clients.map((client, index) => (
                <tr key={index}>
                  <th scope='row'>{client.id}</th>
                  <td>{client.nombre}</td>
                  <td>{client.apellido}</td>
                  <td>{client.dni}</td>
                  <td>{client.cuenta}</td>
                  <td>{client.saldo}</td>
                  <td>{client.contrasena}</td>
                  <td>
                                      
                    <Link 
                      className='btn btn-outline-primary mx-2'
                      to={`/editClient/${client.id}`}
                    >
                      Edit
                    </Link>

                    <button 
                      className='btn btn-danger mx-2'
                      onClick={() => handleDelete(client.id)}
                      >
                        Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
