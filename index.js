const express = require('express');
const app = express();
const cors = require('cors');

// app.use(cors({
//   origin: ['https://admin.caffecino.az', 'https://caffecino.az', 'http://localhost:5555', 'http://localhost:3999'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true 
// }));

// app.options('*', cors());

app.use(cors())

require('dotenv/config');

const { loginRouter, imgRouter, landingRouter, categoryRouter } = require('./src/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');
const router = require('./src/routes/landing');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/img', imgRouter);
app.use('/auth', loginRouter);

app.use('/landing', landingRouter);
app.use('/category', categoryRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
