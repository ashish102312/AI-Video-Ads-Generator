const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    role: { type: String, default: 'user' },
    is_verified: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Override static methods to match the existing auth controller interface seamlessly
userSchema.statics.create = async function (userData) {
    const { name, email, password, role = 'user' } = userData;
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = new this({
        name,
        email,
        password_hash,
        role
    });

    await user.save();

    // Return a plain object so the controller can manipulate it safely
    const doc = user.toObject();
    doc.id = doc._id;
    return doc;
};

userSchema.statics.findByEmail = async function (email) {
    const doc = await this.findOne({ email }).lean();
    if (doc) doc.id = doc._id;
    return doc;
};

userSchema.statics.findById = async function (id) {
    try {
        const doc = await this.findOne({ _id: id }).select('-password_hash').lean();
        if (doc) doc.id = doc._id;
        return doc;
    } catch (err) {
        return null;
    }
};

const User = mongoose.model('User', userSchema);
module.exports = User;
