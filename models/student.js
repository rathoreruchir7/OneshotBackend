var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var student = new Schema({
    name: {
        type: String,
        default: ""
    },

    yearOfBatch: {
        type: Number,
        default: 0
    },

    college_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
    },

    skills: [
        {
            skill_name: {
                type: String,
                default: ""
            }
        }
    ]
    
},{
    timestamps: true
});

var Student = mongoose.model('Student', student);
module.exports = Student;