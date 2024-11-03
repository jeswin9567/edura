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


// Payment options retrieval route
router.get('/view/payment-options', async (req, res) => {
  try {
    const paymentOptions = await PaymentOption.find({}, 'amount frequency'); // Select only amount and frequency
    res.json(paymentOptions);
  } catch (error) {
    console.error('Error fetching payment options:', error);
    res.status(500).json({ message: 'Server error. Failed to fetch payment options.' });
  }
});

// to see the prices

router.get('/prices', async (req, res) => {
  try {
    const paymentOptions = await PaymentOption.find();
    res.status(200).json(paymentOptions);
  } catch (error) {
    console.error('Error fetching payment options:', error);
    res.status(500).json({ error: 'Failed to fetch payment options' });
  }
});

// Route to get details of a specific price by ID
router.get('/vprices/:id', async (req, res) => {
  try {
    const price = await PaymentOption.findById(req.params.id);
    if (!price) {
      return res.status(404).json({ error: 'Price not found' });
    }
    res.status(200).json(price);
  } catch (error) {
    console.error('Error fetching price details:', error);
    res.status(500).json({ error: 'Failed to fetch price details' });
  }
}); 


// In routes/paymentOptions.js
router.put('/prices/:id', async (req, res) => {
  try {
    const updatedPrice = await PaymentOption.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPrice);
  } catch (error) {
    console.error('Error updating price:', error);
    res.status(500).json({ error: 'Failed to update price' });
  }
});


module.exports = router;


// module.exports = router;
