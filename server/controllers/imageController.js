import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from 'form-data';


const generateImage = async (req, res) => {
    try {
        //const { userId, prompt } = req.body;
        const userId = req.userId;
        const { prompt } = req.body;

        const user = await userModel.findById(userId);
        if (!user || !prompt) {
            return res.status(400).json({ success: false, message: "User not found or prompt is missing" });
        }
        //https://clipdrop.co/apis/docs/text-to-image
        if (user.creditBalance === 0 || userModel.creditBalance < 0) {
            return res.json({ success: false, message: "Insufficient credits", creditBalance: user.creditBalance });
        }

        const formData = new FormData();
        formData.append('prompt', prompt);

        // Make the API request to ClipDrop
        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                ...formData.getHeaders(), // by chatgpt
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer',
        })

        const base64Image = Buffer.from(data, 'binary').toString('base64');

        const resultImage = `data:image/png;base64,${base64Image}`;

        // Deduct credit from user
        await userModel.findByIdAndUpdate(user._id, {creditBalance: user.creditBalance - 1});

        res.json({ 
            success: true,
            image: "Image Generated",
            creditBalance: user.creditBalance - 1,
            resultImage 
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });

    }
}

export { generateImage };