const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');

dotenv.config();
const URI = 'mongodb://localhost/pachaJujuy';
const app = express();
mongoose.set('strictQuery', false);
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

mongoose
  .connect(URI)
  .then(() => console.log('DB Connection Successful!'))
  .catch((err) => {
    console.log(err);
  });

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Backend server is running on port', PORT);
});
