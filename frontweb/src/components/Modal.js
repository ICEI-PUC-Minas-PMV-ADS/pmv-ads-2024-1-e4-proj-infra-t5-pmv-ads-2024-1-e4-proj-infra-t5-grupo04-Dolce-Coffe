import React from 'react';


function CustomModal({ isOpen, onClose }) {
  const handleRemoveItem = () => {
    // Lógica para remover item
  };

  const handleCheckout = () => {
    // Lógica para fazer checkout
  };

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Carrinho de Compras</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {/* Conteúdo do modal */}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleRemoveItem}>Remover Item</button>
            <button type="button" className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
