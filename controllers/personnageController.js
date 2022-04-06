const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Personnage = mongoose.model('Personnage');


router.get('/', (req, res) => {
    res.render("personnage/crud", {
        viewTitle : "Ajouter un personnage"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req,res){
    var personnage =new Personnage();
    personnage.lastName = req.body.lastName;
    personnage.firstName = req.body.firstName;
    personnage.email = req.body.email;
    personnage.mobile = req.body.mobile;
    personnage.city = req.body.city;
    personnage.save((err, doc) => {
        if (!err)
        res.redirect('personnage/list');
    else {
        if (err.name == 'ValidationError') {
            handleValidationError(err, req.body);
            res.render("personnage/crud", {
                viewTitle : "Ajouter un personnage",
                personnage: req.body
            });
        }
        else
            console.log('Error during record insertion : ' + err);
    }
    });
}



function updateRecord(req, res) {
   Personnage.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('personnage/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("personnage/crud", {
                    viewTitle: 'Mise à personnage',
                    personnage: req.body
                });
            }
            else
                console.log('Erreur lors de la modification : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Personnage.find((err, docs) => {
        if (!err) {
            res.render("personnage/list", {
                list: docs
            });
        }
        else {
            console.log('Erreur lors de la récupération de la liste des personnage :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'lastName':
                body['lastNameError'] = err.errors[field].message;
                break;
            case 'firstName':
            body['firstNameError'] = err.errors[field].message;
            break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Personnage.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("personnage/crud", {
                viewTitle: "Modifier un personnage",
                personnage: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Personnage.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/personnage/list');
        }
        else { console.log('Erreur lors de la suppression :' + err); }
    });
});




module.exports = router;