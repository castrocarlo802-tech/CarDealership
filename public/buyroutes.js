const express = require('express');
const { Purchase } = require('./buy'); // Make sure this path is correct
const router = express.Router();

// Create a new purchase
router.post('/purchase', async (req, res) => {
try {
const { fullname, address, contact, payment, carName, price } = req.body;

```
    if (!fullname || !address || !contact || !payment || !carName || !price) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newPurchase = await Purchase.create({
        fullname,
        address,
        contact,
        paymentMethod: payment,
        carName,
        price
    });

    res.json({ success: true, message: 'Purchase saved successfully', purchase: newPurchase });
} catch (err) {
    console.error('Error creating purchase:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
}
```

}});

// Get all purchases
router.get('/purchases', async (req, res) => {
try {
const purchases = await Purchase.find().sort({ purchasedAt: -1 });
res.json({ success: true, purchases });
} catch (err) {
console.error('Error fetching purchases:', err);
res.status(500).json({ success: false, message: 'Server error', error: err.message });
}
});

module.exports = router;
