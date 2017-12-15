
const Bike = require('mongoose').model('Bike');
const User = require('mongoose').model('User');

function listErrs(err){
    let list = [];
    for(let x in err.errors){
        list.push(err.errors[x].message);
    }
    return list.reverse();
}

module.exports = {
    
    // GET: api/bikes/list
    list(req, res){
        Bike.find({})
        .then(list => res.status(200).json(list))
        .catch(err => res.status(404).json('none found'), console.log(err));
    },

    // GET: api/bikes/randomize
    randomize(req, res){
        Bike.count({})
        .then(count => {
            let rand = Math.floor(Math.random() * count);
            Bike.findOne().skip(rand)
            .then(bike => res.status(200).json(bike)) // return random bike
            .catch(err => res.status(404).json('none found'));
        })
        .catch(err => res.status(500).json('DB error'), console.log(err));
    },

    // POST: api/bikes/create
    create(req, res){
        const bike = new Bike(req.body);
        bike.save()
        .then(bike => res.json(bike))
        .catch(err => res.status(403).json(listErrs(err)));
    },

    // PUT: api/bikes/id/:id
    update(req, res){
        Bike.findByIdAndUpdate(req.id, req.body,
            {runValidators:true, new:true, context: 'query'})
        .then(bike => res.status(200).json(bike)) // return updated bike
        .catch(err => res.status(403).json(listErrs(err)));
    },

    // DELETE: api/bikes/id/:id
    delete(req, res){
        Bike.findByIdAndRemove(req.id)
        .then(bike => {
            Bike.find({})
            .then(list => res.status(200).json(list)) // return list
            .catch(err => res.status(404).json('none found'));
        })
        .catch(err => res.status(500).json('DB error'), console.log(err));
    }

}