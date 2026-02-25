const User = require('../models/user.model');
const Video = require('../models/video.model');

exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalVideos = await Video.countDocuments();

        // aggregate total views for fun
        const aggregateViews = await Video.aggregate([
            { $group: { _id: null, total: { $sum: "$views_count" } } }
        ]);
        const totalViews = aggregateViews.length > 0 ? aggregateViews[0].total : 0;

        const recentUsers = await User.find()
            .select('-password_hash')
            .sort({ created_at: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            data: {
                metrics: {
                    totalUsers,
                    totalVideos,
                    totalViews,
                    activeSessions: Math.floor(Math.random() * 50) + 1 // mock since sessions aren't tracked historically
                },
                recentUsers: recentUsers.map(user => ({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    plan: user.role === 'admin' ? 'Enterprise' : 'Basic',
                    status: 'Active',
                    date: user.created_at
                }))
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
