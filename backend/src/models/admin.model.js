const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowecase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        default: 'admin'
    },
    contactNumber: {
        type: String
    },
    profilePicture: {
        type: String
    }

}, { timestamps: true });

adminSchema.virtual("password")
    .set(function (password) {
        this.hash_password = bcrypt.hashSync(password, 10)
    })

adminSchema.methods = {
    authenticate: function (password) {
        return bcrypt.compareSync(password, this.hash_password)
    }
}

adminSchema.virtual("fullName")
    .get(function () {
        return `${this.firstName} ${this.lastName}`
    })

module.exports = mongoose.model("Admin", adminSchema)