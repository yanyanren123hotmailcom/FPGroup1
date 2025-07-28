import express from 'express';
import carRoutes from './src/main/routes/car.routes.js';
import dbRoutes from "./src/main/routes/db.routes.js";
import userRoutes from './src/main/routes/user.routes.js';
import projectRoutes from './src/main/routes/project.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/db', dbRoutes);
app.use('/cars', carRoutes);

app.use('/user',userRoutes);
app.use('/invest',projectRoutes);
const PORT = 3000;

app.listen(PORT, (err) => {
    console.log(`Server is running on port ${PORT}`);
});
