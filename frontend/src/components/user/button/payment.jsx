import React, { useState } from 'react';
import PaymentOptionsModal from '../paymentop';

const BuyPremiumButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <div>
      <button onClick={handleShowModal}>Buy Premium</button>
      {showModal && <PaymentOptionsModal closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default BuyPremiumButton;
