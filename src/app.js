import express from "express";
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.Router());

app.use('/api', productRouter);

app.use('/api', cartRouter);

app.listen(8080, () => console.log('servidor iniciado en puerto 8080'))