const mongoose = require('mongoose');
const Scheema = mongoose.Schema;

const CounterSchema = new Scheema({


    visitors: {
        type: Number,
        required: true
    },

    date: {
        type: Date,

    }

});

module.exports = Counter = mongoose.model('counter', CounterSchema);