import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container text-center mt-5">
      <h1>Banco A</h1>
      <div className="mt-4">
        <Link className="btn btn-primary mx-2" to="/internetBanking">Banca por Internet</Link>
        <Link className="btn btn-primary mx-2" to="/login">Admin</Link>
        <Link className="btn btn-primary mx-2" to="https://test-vercel-six-henna.vercel.app/">Banco B</Link>
        <Link className="btn btn-primary mx-2" to="https://www.youtube.com/">YouTube</Link>
        <Link className="btn btn-primary mx-2" to="https://www.facebook.com/">Facebook</Link>
      </div>
    </div>
  );
};

export default Home;
