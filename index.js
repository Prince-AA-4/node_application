import express from "express";
import dotenv from "dotenv";
import sequelize from './config/db.config.js';
import './database/models/association.js';
import userRoutes from './route/user.route.js';
import postRoutes from './route/post.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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