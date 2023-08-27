import express from "express";
import productRouter from './routes/productRouter.js'

const app = express()
app.use(express.urlencoded({extended: true}));

app.use('/api', productRouter);

app.listen(8080, () => console.log('servidor iniciado en puerto 8080'))