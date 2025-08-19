import User from "../models/users.js";
import History from "../models/history.js";


const createUser = async (req,res)=>{
    const { imgURL, name, credits } = req.body;
    if (!name || credits === undefined) {
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        const newUser = await User.create({name, credits });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
        console.error(error);
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve users" });
    }
};

const claimCredits = async (req, res) => {
    const { userId, credits } = req.body;
    if (!userId || !credits) {
        return res.status(400).json({ error: "User ID and credits are required" });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.credits += Number(credits);
        await user.save();
        const historyEntry = await History.create({
            userId: user._id,
            credits: Number(credits),
            timestamp: new Date()
        });
        res.status(200).json({ message: "Credits claimed successfully", user, historyEntry });
    } catch (error) {
        res.status(500).json({ error: "Failed to claim credits" });
    }
};

const getHistory = async (req, res) => {
    try {
        const history = await History.find();

        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve history" });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve user" });
    }
};

export { createUser, getUsers, claimCredits, getHistory, getUserById };

