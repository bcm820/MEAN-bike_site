
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
        .then(user => res.status(200).json(user)) // return user
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
                    user.checkPW(req.body._pw, (
                        success => {
                            // update online status :)
                            User.findByIdAndUpdate(user._id, {$set:{online:true}})
                            .then(success => res.status(200).json(user)) // return user object
                            .catch(err => res.status(500).json('DB error'), console.log(err));
                        },
                        err => res.status(403).json('Password invalid')
                    ));
                }
            })
            .catch(err => res.status(500).json('DB error'), console.log(err));
        }
    },

    // api/auth/logout
    logout(req, res){
        User.findByIdAndUpdate(user._id, {$set:{online:false}})
        .then(success => res.status(200).json(user)) // return user object
        .catch(err => res.status(500).json('DB error'), console.log(err));
    },

    // api/auth/check
    check(req, res){
        User.count({email:req.email})
        .then(count => res.json(count))
        .catch(err => res.status(500).json('DB error'), console.log(err));
    },

    // api/auth/confirm
    confirm(req, res){
        User.find({email:req.email})
        .then(user => {
            if(user.online){ res.status(200).json(true); }
            else { res.status(403).json(false); }
        })
        .catch(err => res.status(500).json('DB error'), console.log(err));
    }
}