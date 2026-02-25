const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    prompt: { type: String, required: true },
    videoUrl: { type: String, required: true },
    status: { type: String, default: 'Ready', enum: ['Processing', 'Ready', 'Failed'] },
    views_count: { type: Number, default: 0 },
    thumbnail: { type: String, default: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400&h=250' }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
