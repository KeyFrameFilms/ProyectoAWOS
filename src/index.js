import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(express.static("./src/public"));

app.use("/auth", userRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto: ${port}`);
});
