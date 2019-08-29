const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    firstName:{
        type: String,
        required: true,
        minlenght: 3,
        trim: true,
    },
    lastName:{
        type: String,
        required: true,
        minlenght: 3,
        trim: true,
    },
    isActive:{
        type: Number,
        default: 0,
    }
    

});

module.exports = mongoose.model('users', UserSchema);




// const mongoose = require('mongoose');

// const User = mongoose.model('users', {
//     firstName:{
//         type: String,
//         required: true,
//         minlenght: 3,
//         trim: true,
//     },
//     lastName:{
//         type: String,
//         required: true,
//         minlenght: 3,
//         trim: true,
//     },
//     isActive:{
//         type: Number,
//         default: 0,
//     }
    

// });

// module.exports = User;