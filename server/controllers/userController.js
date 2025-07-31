import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import razorpay from 'razorpay'
import tansactionModel from "../models/tansactionModel.js";
import transactionModel from "../models/tansactionModel.js";


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token, user: { name: user.name } })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "User Already Exixts." });

    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token, user: { name: user.name } });

        } else {
            return res.status(400).json({ message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const userCredits = async (req, res) => {
    try {
        const { userId } = req;

        const user = await userModel.findById(userId);
        res.json({ success: true, credits: user.creditBalance, user: { name: user.name } });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}





const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
    console.log("Clicked on plan:", planId);
    try {
        const userId = req.userId; // From middleware
        const { planId } = req.body;
        
        // const { userId, planId } = req.body;

        const userData = await userModel.findById(userId);

        if (!userId || !planId) {
            return res.json({ success: false, message: 'Missing Details.' });
        }

        let credits, plan, amount, date

        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 199
                break;

            case 'Advanced':
                plan = 'Advanced'
                credits = 250
                amount = 449
                break;

            case 'Business':
                plan = 'Business'
                credits = 500
                amount = 699
                break;

            default:
                return res.json({ success: false, message: 'Plan not found!' });
        }

        date = Date.now();

        const transactionData = {
            userId, plan, amount, credits, date
        }

        const newTransaction = await tansactionModel.create(transactionData);

        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY || 'INR',
            receipt: newTransaction._id.toString(),
        };

        // await razorpayInstance.orders.create(options, (error, order) => {
        //     if (error) {
        //         console.log(error);
        //         return res.json({ success: false, message: error.message });
        //     }

        //     res.json({ success: true, order })
        // })

        const order = await razorpayInstance.orders.create(options);
        console.log("Order created:", order);


        res.json({ success: true, order })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const verifyRazorpay = async(req, res) => {
    try{
        const {razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if(orderInfo.status === 'paid'){
            const transactionData = await transactionModel.findById(orderInfo.receipt)

            if(transactionData.payment){
                return res.json({success: false, message: 'Payment Failed'})
            }

            const userData = await userModel.findById(transactionData.userId)

            const creditBalance = userData.creditBalance + transactionData.credits;

            await userModel.findByIdAndUpdate(userData._id, {creditBalance});

            await transactionModel.findByIdAndUpdate(transactionData._id, {payment: true})

            res.json({success: true, message: 'Credits Added'});
        }else{
            res.json({success: false, message: "Payment Failed"});
        }

    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}



export { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay };