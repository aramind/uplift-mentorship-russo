import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
  console.log(`The server is available at http://localhost:${PORT}`);
});