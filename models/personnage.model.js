const mongoose = require('mongoose');

var personnageSchema = new mongoose.Schema({
    lastName: {
        type: String,
        required: 'Ce champ doit être complété.'
    },
    firstName: {
        type: String,
        required: 'Ce champ doit être complété.'
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    }
});

// Validation personnalisée pour les e-mails
personnageSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('Personnage', personnageSchema);