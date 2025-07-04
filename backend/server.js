import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

app.use("/api/product",productRouter)
app.use("/images", express.static("uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

connectDB();

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//mongodb+srv://atlas-sample-dataset-load-6800cb5e6290024446e1da7e:<db_password>@cluster0.wfb94tc.mongodb.net/?