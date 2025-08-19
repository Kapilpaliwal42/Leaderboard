import cors from 'cors';
import express, { urlencoded } from 'express';
import router from './routes/routes.js';
import dotenv from 'dotenv';
import DBConnect from "./db.js/DBConnect.js"
dotenv.config();
const port = process.env.PORT || 5000;

const allowedOrigins = ['https://leaderboard-frontend-ggp8.onrender.com'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

const app = express();
try {
    await DBConnect();
    console.log("Database connected successfully");
    app.use(cors());
    app.use(express.json());
    app.use(urlencoded({ extended: true }));
    app.use("/api/v1", router);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

} catch (error) {
    console.error("Database connection failed:", error);
}
