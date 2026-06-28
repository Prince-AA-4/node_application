import express from "express";
import dotenv from "dotenv";
import sequelize from './config/db.config.js';
import './database/models/association.js';
import userRoutes from './route/user.route.js';
import postRoutes from './route/post.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// to link your frontend to your backend, you need to set up "Cors"
//   run npm install cors and set it up like this
//   app.use(
//     cors({
//       origin: Client url(the frontend url),
//       credentials: true
//   }));
  
// keep your frontend url in the .env and use the process() object to expose it like this
// process.env.${environment variable}. Mostly, the client url is stored using CLIENT_URL.
// But if you choose to use a different variable, you replace CLIENT_URL with that. it will be 
// like process.env.CLIENT_URL



app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
// app.use('/api/v1/post', postRoutes);


const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(` Server is running on port http://localhost:${port}`);
    });
    await sequelize.authenticate();
    console.log("Database connected sucessfully")
    console.log('tables created and synced successfully')
  } catch (error) {
    console.log("Error connecting database: ", error)
  }
}

startServer();