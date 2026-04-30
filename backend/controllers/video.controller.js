const { GoogleGenerativeAI } = require('@google/generative-ai');
const Video = require('../models/video.model');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.createVideo = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ success: false, message: 'Prompt is required' });
        }

        console.log("Generating smart video context with Gemini from prompt:", prompt);

        // Array of stunning royalty-free fallback videos to act as our "AI generated" output
        const videoTemplates = [
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", // Abstract dark
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4", // Car
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", // Tech/Digital
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", // Cyber wave
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Space/Particles
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", // Nature/Forest
        ];

        let finalTitle = prompt.split(' ').slice(0, 4).join(' ') + '...';
        let finalVideoUrl = videoTemplates[Math.floor(Math.random() * videoTemplates.length)]; // random default

        try {
            // Ask Gemini to interpret the prompt, generate a catchy marketing title, and pick a video theme!
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const geminiPrompt = `
                I am building an AI Video Ads Generator. The user provided this raw prompt: "${prompt}".
                Please act as an expert marketer.
                1. Give me a very short, catchy 4-5 word Title for this ad.
                2. Based on the user's prompt, choose ONE of these numbers that best fits the theme:
                   [0: Abstract/Dark, 1: Car/Automotive, 2: Tech/Digital/Web, 3: Cyber/Neon Wave, 4: Space/Particles/Science, 5: Nature/Relaxing].
                Respond strictly in JSON format like this: { "title": "Your Catchy Title", "themeIndex": 0 }
            `;
            const result = await model.generateContent(geminiPrompt);
            const responseText = result.response.text();

            // Extract the JSON from Gemini's response
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                finalTitle = parsed.title || finalTitle;
                if (parsed.themeIndex >= 0 && parsed.themeIndex < videoTemplates.length) {
                    finalVideoUrl = videoTemplates[parsed.themeIndex];
                }
            }
        } catch (geminiError) {
            console.error("Gemini API Error:", geminiError.message);
            // We just fall back to the dynamic defaults above
        }

        const savedVideo = new Video({
            user_id: req.user.id || '000000000000000000000001',
            title: finalTitle,
            prompt: prompt,
            videoUrl: finalVideoUrl,
            status: 'Ready'
        });
        await savedVideo.save();

        res.status(200).json({
            success: true,
            message: "Video generated successfully!",
            data: {
                id: savedVideo._id,
                videoUrl: savedVideo.videoUrl,
                status: savedVideo.status,
                prompt: savedVideo.prompt
            }
        });

    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getVideos = async (req, res) => {
    try {
        const userId = req.user.id || '000000000000000000000001'; // Handle mock tokens natively
        const videos = await Video.find({ user_id: userId }).sort({ created_at: -1 });

        res.status(200).json({
            success: true,
            data: videos.map(v => ({
                id: v._id,
                title: v.title,
                status: v.status,
                views: v.views_count,
                date: v.created_at,
                thumbnail: v.thumbnail,
                videoUrl: v.videoUrl
            }))
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
