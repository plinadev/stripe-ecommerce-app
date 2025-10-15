import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import checkoutRoutes from "./routes/checkout.routes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || "3001";

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api", checkoutRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
