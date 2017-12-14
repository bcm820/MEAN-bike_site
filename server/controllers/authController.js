
const User = require('mongoose').model('User');

// store errors in array
function listErrs(err){
    let list = [];
    for(let x in err.errors){
        list.push(err.errors[x].message);
    }
    return list.reverse();
}

module.exports = {

    // api/auth/join -- setup auto-login
    join(req, res){
        const user = new User(req.body);
        user.save()
        .then(user => res.json(user)) // return user
        .catch(err => res.json(listErrs(err)));
    },

    // api/auth/login
    login(req, res){
        if(req.body.email === ''|| req.body._pw === ''){
            res.status(403).json('No login information entered')
        } else {
            User.findOne({email:req.body.email})
            .then(user => {
                if(user === null){ res.status(403).json('Email address not found'); }
                else {
                    user.checkPW(req.body._pw, (err, good) => {
                        if(err){ res.status(403).json('Password invalid') }
                        else {
                            req.session.uid = user._id;
                            res.json(user);
                        }
                    });
                }
            })
            .catch(err => {
                res.status(500).json('DB error');
                console.log(err);
            });
        }
    },

    // api/auth/logout
    logout(req, res){
        req.session.uid = undefined;
        res.json('User logged out')
    },

    // api/auth/confirm
    confirm(req, res){
        if(req.session.uid){
            console.log(req.session.uid);
            User.findById(req.session.uid)
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err));
        }
        else { res.json(false); }
    },

    // api/auth/check
    checkEmail(req, res){
        User.count({email:req.email})
        .then(count => res.json(count))
        .catch(err => {
            res.status(500).json('DB error');
            console.log(err);
        });
    }

}