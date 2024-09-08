import { config } from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

config({ path: '.env' });

const PORT = process.env.PORT;
const DB = process.env.DB_URL as string;

connectDB(DB);

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
  console.log(`mode: ${process.env.NODE_ENV}`);
});
