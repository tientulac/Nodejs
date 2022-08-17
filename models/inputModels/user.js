const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// required: true === NOT NULL
let UserSchema = new Schema({
    UserName: { type: String, required: true, max: 10 },
    Password: { type: String, required: true, max: 50 },
    FullName: { type: String, required: true, max: 50 },
    Email: { type: String, required: true, max: 50 },
    UniqueCode: { type: String, required: true, max: 50 },
    /**
        1: hanttech (dành cho nhân viên hanttech. Trong đây sẽ phân role riêng)
        ex: 
        /api/hanttech/user/login
        2: builder (dành cho công xưởng. Trong đây sẽ phân role riêng) 
        ex: /api/builder/user/login
    */
    Classification: { type: String, required: true, max: 10 },
    Roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
});

// Export the model
module.exports = mongoose.model('User', UserSchema, "User");