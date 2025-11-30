import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import connectDB from './database/connectDB.js';
import router from './routes/task.routes.js';


const app = express();
const PORT = 7000;

await connectDB();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Welcome to the To-do List API!');
});

app.use('/api/v1/tasks', router);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

