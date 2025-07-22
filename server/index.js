import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
import userRoute from "./routes/userRoutes.js"


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", userRoute);

const PORT = process.env.PORT || 7000;
const mongoURL = process.env.MONGO_URL;

// mongoose.connect(mongoURL)
//   .then(() => {
//     console.log("DB Connetted Successfully!");
//     app.listen(PORT, () => {
//       console.log(`Server is running on PORT: ${PORT}`)
//     });
//   })
//   .catch((error) => console.log(error));

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("DB Connected Successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });

  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Optional: Exit the process if DB fails to connect
  }
};

connectDB();
