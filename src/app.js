import express from "express";
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewRouter from './routes/viewRouter.js'
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import mongoose from "mongoose";
import initEvents from "./socket/index.js";

mongoose.connect('mongodb+srv://brunochamus:KOXT3iErEmAleZtF@cluster0.aycmosa.mongodb.net/?retryWrites=true&w=majority')

const app = express();
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.use(express.static('./src/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.Router());

app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/', viewRouter);

const httpServer = app.listen(8080, () => console.log('Server is running on port 8080'));
const socketServer = new Server(httpServer);

initEvents(socketServer);

