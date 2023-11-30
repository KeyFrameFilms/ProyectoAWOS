import express from "express";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";  // Importa las rutas del carrito
import db from "./config/db.js";

const app = express();
  
// Settings
app.set('PORT', process.env.PORT || 3000);

// View Engine
app.set('view engine', 'pug');
app.set("views", "./src/views");

// urlencoded
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static("./src/public"));

// Routes
app.use("/auth", userRoutes);
app.use("/cart", cartRoutes);  // Agrega las rutas del carrito

// Database connection
try {
  await db.authenticate();
  console.log(" ------------------   Connection to MySQL was accepted  ------------------");

  await db.sync();
  console.log(" ------------------    Synchronization with MySQL finished  ------------------");
} catch (err) {
  console.log(err);
}

const port = app.get('PORT');
app.listen(port, () => {
  console.log(`El servidor está funcionando en el puerto: ${port}`);
});
