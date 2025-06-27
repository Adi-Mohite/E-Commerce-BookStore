import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import cors from "cors";
import paymentRoute from "./route/payment.route.js";
import adminRoutes from "./route/admin.route.js"
import orderRoute from "./route/order.route.js"
import feedbackRoute from "./route/feedback.route.js"


const app = express()

app.use(cors());
app.use(express.json());
app.use("/api", paymentRoute);


app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT=process.env.PORT || 4000;
const dbURI=process.env.MongodbURI;

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));


  app.use("/book",bookRoute);
  app.use("/user",userRoute);
  app.use("/admin", adminRoutes);
  app.use("/admin", orderRoute);
  app.use("/api/feedback", feedbackRoute);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})