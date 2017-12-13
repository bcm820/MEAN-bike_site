
const auth = require('../controllers/authController');

module.exports = (router) => {

    router.use((req, res, next) => {
        console.log('Auth:', req.method, req.url)
        next();
    })

    router.param('email', (req, res, next, email) => {
       req.email = email;
       next();
    });

    // /api/auth
    router.post('/register', auth.join);
    router.post('/login', auth.login);
    router.post('/logout', auth.logout);
    router.get('/check/:email', auth.check);
    router.get('/confirm/:email', auth.confirm);

};