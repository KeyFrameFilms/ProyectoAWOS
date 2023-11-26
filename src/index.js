import express from "express";
import userRoutes from "./routes/userRoutes.js";  
import db from "./config/db.js";

const app = express();




//Settings
app.set('PORT', process.env.PORT || 3000)
// View Engine
app.set('view engine', 'pug');
app.set("views", "./src/views")
// urlencoded
app.use(express.urlencoded({ extended: true }))
// cookie-parser
//app.use(cookieParser());
// morgan - logger
//app.use(morgan('dev'));

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(express.static("./src/public"));

app.use("/auth", userRoutes);

try {
  await db.authenticate();
  console.log(" ------------------   Connection to MySQL was accepted  ------------------");

  await db.sync();
  console.log(" ------------------    Synchronization with MySQL finished  ------------------");
} catch (err) {
  console.log(err);
}


const port = 3000;
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto: ${port}`);
});

