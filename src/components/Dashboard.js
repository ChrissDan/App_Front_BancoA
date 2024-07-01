import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Dashboard = () => {
  const { cuenta } = useParams();
  const { dni } = useParams();
  const [fromCuenta, setFromCuenta] = useState('');
  const [cliente, setCliente] = useState(null);
  const [amount, setAmount] = useState(0);
  const [transferCuenta, setTransferCuenta] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCliente();
  }, [dni]);

  const fetchCliente = async () => {
    try {
      console.log(`Fetching client data for dni: ${dni}`);
      const result = await axios.get(`http://vps-4209517-x.dattaweb.com:8080/bancoa/api/clientes/dni/${dni}`);
      console.log('Client data:', result.data);
      console.log('Client cuenta:', result.data.cuenta);
      setFromCuenta(result.data.cuenta);
      console.log('Client fromCuenta:', fromCuenta);
      setCliente(result.data);
    } catch (error) {
      console.error('Error fetching client data:', error);
      setMessage('Error al obtener los datos del cliente. Intente nuevamente.');
    }
  };

  const handleAmountChange = (e) => {
    setAmount(Number(e.target.value));
  };

  const handleTransferCuentaChange = (e) => {
    setTransferCuenta(e.target.value);
  };

  const depositar = async () => {
      // Validaciones
    if (amount <= 0) {
      setMessage('Ingrese un monto válido para depositar.');
      return;
    }
    
    try {
      await axios.put(`http://vps-4209517-x.dattaweb.com:8080/bancoa/api/clientes/update-saldo/${dni}`, null, { params: { amount } });
      setMessage('Depósito exitoso.');
      setAmount(0); // Limpiar el input de monto
      fetchCliente();
    } catch (error) {
      setMessage('Error al depositar. Verifica los datos e intenta nuevamente.');
    }
  };

  const retirar = async () => {

      // Validaciones
    if (amount <= 0) {
      setMessage('Ingrese un monto válido para retirar.');
      return;
    }

    if (amount > cliente.saldo) {
      setMessage('Fondos insuficientes para realizar el retiro.');
      return;
    }

    try {
      await axios.put(`http://vps-4209517-x.dattaweb.com:8080/bancoa/api/clientes/retirar-saldo/${dni}`, null, { params: { amount } });
      console(amount);
      setMessage('Retiro exitoso.');
      setAmount(0); // Limpiar el input de monto
      fetchCliente();
    } catch (error) {
      setMessage('Error al retirar. Verifica los datos e intenta nuevamente.');
    }
  };

  const transferir = async () => {
    // Validaciones
    if (amount <= 0 || !transferCuenta.trim()) {
      setMessage('Ingrese un monto válido y una cuenta de destino.');
      return;
    }
  
    if (amount > cliente.saldo) {
      setMessage('Fondos insuficientes para realizar la transferencia.');
      return;
    }

    // Validación de banco
    if (transferCuenta.startsWith('215')) {
      try {
        await axios.put(`http://vps-4209517-x.dattaweb.com:8080/bancoa/api/clientes/transferir-saldo/${fromCuenta}/${transferCuenta}`, null, { params: { amount } });
        setMessage('Transferencia exitosa.');
        setAmount(0); // Limpiar el input de monto
        setTransferCuenta(''); // Limpiar el input de cuenta de transferencia
        fetchCliente();
      } catch (error) {
        setMessage('Error al transferir. Verifica los datos e intenta nuevamente.');
        setAmount(0); // Limpiar el input de monto
        setTransferCuenta(''); // Limpiar el input de cuenta de transferencia
      }
      console.log('Banco A');
    } else if (transferCuenta.startsWith('510')) {
      setMessage('Su cuenta pertenece al Banco C. Realice una Transferencia Interbancaria');
      console.log('Banco C');
      setAmount(0); // Limpiar el input de monto
      setTransferCuenta(''); // Limpiar el input de cuenta de transferencia
    } else if (transferCuenta.startsWith('190')) {
      setMessage('Su cuenta pertenece al Banco B. Realice una Transferencia Interbancaria');
      console.log('Banco B');
      setAmount(0); // Limpiar el input de monto
      setTransferCuenta(''); // Limpiar el input de cuenta de transferencia
    }
    
  };

  const transferirInterbancaria = async () => {
    // Validaciones
    if (amount <= 0 || !transferCuenta.trim()) {
      setMessage('Ingrese un monto válido y una cuenta de destino.');
      return;
    }
  
    if (amount > cliente.saldo) {
      setMessage('Fondos insuficientes para realizar la transferencia.');
      return;
    }

    if (transferCuenta.startsWith('190')) {
      try {
        const bancoDestinoUrl = "http://192.168.18.29:8080"; // URL del Banco B
        const response = await axios.put(`http://localhost:8080/bancoa/api/clientes/transferir-interbancaria`, null, {
          params: {
            fromCuenta: fromCuenta,
            toCuenta: transferCuenta,
            amount: amount,
            bancoDestinoUrl: bancoDestinoUrl
          }
        });
        setMessage('Transferencia Interbancaria exitosa al Banco B');
        setAmount(0);
        setTransferCuenta('');
        fetchCliente();
        console.log(response.data);
      } catch (error) {
        setMessage('Error al transferir interbancariamente.');
        console.error("Error al transferir interbancariamente:", error);
      }
    } else if (transferCuenta.startsWith('510')) {
      try {
        const bancoDestinoUrl = "http://banco-c.com"; // URL del Banco C
        const response = await axios.put(`http://banco-a.com/api/clientes/transferir-interbancaria`, null, {
          params: {
            fromCuenta: fromCuenta,
            toCuenta: transferCuenta,
            amount: amount,
            bancoDestinoUrl: bancoDestinoUrl
          }
        });
        setMessage('Transferencia Interbancaria exitosa al Banco C');
        setAmount(0);
        setTransferCuenta('');
        fetchCliente();
        console.log(response.data);
      } catch (error) {
        setMessage('Error al transferir interbancariamente.');
        console.error("Error al transferir interbancariamente:", error);
      }
    }
  };
  

  if (!cliente) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="py-4">
        <h2>Bienvenido, {cliente.nombre} {cliente.apellido}</h2>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Saldo: {cliente.saldo}</h3>
          <Link className='btn btn-outline-danger mx-2' to='/'>Salir</Link>
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Monto</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            placeholder="Ingrese el monto"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary mx-2" onClick={depositar}>Depositar</button>
          <button className="btn btn-warning mx-2" onClick={retirar}>Retirar</button>
        </div>
        <div className="mb-3">
          <label htmlFor="transferCuenta" className="form-label">Cuenta del Cliente Destinatario</label>
          <input
            type="text"
            className="form-control"
            id="transferCuenta"
            placeholder="Ingrese la cuenta del cliente destinatario"
            value={transferCuenta}
            onChange={handleTransferCuentaChange}
            maxLength={10} // Limitar la longitud máxima del input
          />
        </div>
        <button className="btn btn-danger mx-2" onClick={transferir}>Transferir</button>
        <button className="btn btn-secondary mx-2" onClick={transferirInterbancaria}>Transferencia Interbancaria</button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Dashboard;
