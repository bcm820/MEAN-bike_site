
const bikes = require('../controllers/bikesController');
const filter = require('../controllers/filterController');

module.exports = (router) => {

    router.use((req, res, next) => {
        console.log('Bikes:', req.method, req.url)
        next();
    });

    router.param('id', (req, res, next, id) => {
       req.id = id;
       next();
    });

    router.param('name', (req, res, next, name) => {
        req.name = name;
        next();
    });

    router.param('email', (req, res, next, email) => {
        req.email = email;
        next();
    });

    // api/bikes
    router.get('/list', bikes.list);
    router.get('/randomize', bikes.randomize);
    router.post('/create', bikes.create);
    router.put('/id/:id', bikes.update);
    router.delete('/id/:id', bikes.delete);
    router.get('/byName/:name', filter.byName);
    router.get('/byEmail/:email', filter.byEmail);

};