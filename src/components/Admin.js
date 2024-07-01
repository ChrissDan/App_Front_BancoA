// src/components/Admin.js
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Admin</h1>
      <div className="mt-4">
        <Link className="btn btn-secondary mx-2" to="/register">Crear Cuenta</Link>
        <Link className="btn btn-success mx-2" to="/userList">Lista de Usuarios</Link>
        <Link className="btn btn-success mx-2" to="/clientList">Lista de Clientes</Link>
      </div>
    </div>
  );
};

export default Admin;
