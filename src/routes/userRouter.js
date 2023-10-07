import { Router } from "express";
import userModel from '../dao/models/user.model.js'

const router = Router();

router.post('/signup', async (req, res) => {
    try {
        //Tomo informacion que envia el user
        const { first_name, last_name, email, age, password } = req.body;
        let role = 'user';
        
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            // Asigna un rol de "admin" a las credenciales específicas
            role = "admin";
        }
        //Reviso si ya existe ese email
        const userFind = await userModel.findOne({ email });

        //Si existe le digo que ya esta registrado
        if (userFind) {
            return res.send('Yo re already signed in')
        }

        //Si no existe lo agrego a la base de datos
        const user = await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password,
        });
        //Y lo guardo en la session
        req.session.first_name = user.first_name;
        req.session.last_name = user.last_name;
        req.session.email = user.email;
        req.session.age = user.age;
        req.session.isLogged = true;

        res.redirect('/profile')

    } catch (error) {
        res.status(500).send("Error in user registration", error)
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        //Verifico si el user ya tiene una session
        const user = await userModel.findOne({ email, password }).lean();

        //Si no tene o es incorrecta aviso
        if (!user) {
            return res.send('Incorrect password or email')
        }

        //Al ingresar redirijo a su perfil
        req.session.first_name = user.first_name;
        req.session.last_name = user.last_name;
        req.session.email = user.email;
        req.session.age = user.age;
        req.session.role = user.role;
        req.session.isLogged = true;

        res.redirect('/products')
    } catch (error) {
        res.status(500).send("Login error", error)
    };
});

export default router;

