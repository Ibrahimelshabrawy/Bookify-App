import express from "express";
import checkConnection from "./DB/connectionDB.js";
import cors from "cors";
import {redisConnection} from "./DB/redis/redis.db.js";
import authRouter from "./modules/Auth/auth.controller.js";
import bookRouter from "./modules/books/book.controller.js";
import favoriteRouter from "./modules/favorites/favorites.controller.js";
const app = express();
const port = process.env.PORT;

const bootstrap = async () => {
  app.use(cors({origin: "*"}));
  app.use(express.json());
  app.get("/", (req, res) => res.send("Hello World!"));

  // Connection DB
  checkConnection();

  // Connection Redis
  redisConnection();

  // static files
  app.use("/uploads", express.static("uploads"));

  // Routers
  app.use("/auth", authRouter);
  app.use("/books", bookRouter);
  app.use("/favorites", favoriteRouter);

  app.use("{/*demo}", (req, res, next) => {
    throw new Error("`The URL ${req.originalUrl} Is Not Found 😥`", {
      cause: 500,
    });
  });

  app.use((err, req, res, next) => {
    // console.error(err.stack);
    res.status(err.cause || 500).json({message: err.message, stack: err.stack});
  });

  app.listen(process.env.PORT, () =>
    console.log(`Saraha app listening on port ${port}!`),
  );
};
export default bootstrap;
