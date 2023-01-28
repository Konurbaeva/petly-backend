const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: [true , "Password is required"],
    },
    email: {
        type: String,
        required: [true , "Email is required"],
        unique: true
    },
},
{ versionKey: false, timestamps: true }
)
userSchema.pre('save', async function EncryptPasswordBeforeSaving() {
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}