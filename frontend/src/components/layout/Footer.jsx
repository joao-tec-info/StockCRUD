import React from 'react';

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        <small>© {new Date().getFullYear()} Gerenciador de Estoque</small>
      </div>
    </footer>
  );
}
