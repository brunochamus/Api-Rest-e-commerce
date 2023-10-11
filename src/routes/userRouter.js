import { Router } from "express";
import passport from "passport";
import userModel from '../dao/models/user.model.js'

const router = Router();

router.post('/signup', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
    res.redirect('/profile')
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), async (req, res) => {
    req.session.first_name = req.user.first_name;
    req.session.last_name = req.user.last_name;
    req.session.email = req.user.email;
    req.session.age = req.user.age;
    req.session.role = req.user.role;
    req.session.isLogged = true;

    res.redirect('/products');
});

//Ingreso con github
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }))

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        req.session.first_name = req.user.first_name;
        req.session.last_name = req.user.last_name;
        req.session.email = req.user.email;
        req.session.age = req.user.age;
        req.session.role = req.user.role;
        req.session.isLogged = true;

    res.redirect('/products');
}
);

export default router;

