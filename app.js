import express from 'express';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/', (req, res) => {
  res.sendDate(
    `Hello from the simple server! You requested ${req.url} with method ${req.method}`
  );
});

app.listen(port, () => {
  console.log(`Simpe Server listening on port ${port}`);
});
