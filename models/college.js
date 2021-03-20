var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var college = new Schema({
    name: {
        type: String,
        default: ""
    },

    yearOfFounded: {
        type: Number,
        default: 0
    },

    city: {
            type: String,
            default: ""
    },

    state: {
            type: String,
            default: ""
    },

    country: {
        type: String,
        default: ""
    },

    number_of_student: {
        type: Number,
        default: 0
    },

    courses: [
        {
            course_name: {
                type: String,
                default: ""
            }
        }
    ]
    
},{
    timestamps: true
});

var College = mongoose.model('College', college);
module.exports = College;