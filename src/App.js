import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Admin from './components/Admin';
import UserList from './components/UserList';
import InternetBanking from './components/InternetBanking';
import RegisterClient from './components/RegisterClient';
import MiBancaLogin from './components/MiBancaLogin';
import ClientList from './components/ClientList';
import Dashboard from './components/Dashboard';
import EditUser from './components/EditUser';
import EditClient from './components/EditClient';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path='/userList' element={<UserList />} />
        <Route path='/internetBanking' element={<InternetBanking />} />
        <Route path='/registerClient' element={<RegisterClient />} />
        <Route path='/miBancaLogin' element={<MiBancaLogin />} />
        <Route path='/clientList' element={<ClientList />} />
        <Route path='/dashboard/:dni' element={<Dashboard />} />
        <Route path='/editUser/:id' element={<EditUser/>}/>
        <Route path='/editClient/:id' element={<EditClient/>}/>
      </Routes>
    </Router>
  );
};

export default App;
