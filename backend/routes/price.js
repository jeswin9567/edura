const express = require('express');
const router = express.Router();
const PaymentOption = require('../model/price');

router.post('/add-payment-option', async (req, res) => {
  const { amount, frequency } = req.body;
  try {
    const paymentOption = new PaymentOption({ amount, frequency });
    await paymentOption.save();
    res.status(201).json({ message: 'Payment option added successfully', paymentOption });
  } catch (error) {
    res.status(500).json({ message: 'Error adding payment option', error });
  }
});

module.exports = router;
