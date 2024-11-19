const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const User = mongoose.model('User', new mongoose.Schema({
 name: String,
 email: String,
}));
const mongoURI = process.env.MONGO_URI || 
"mongodb://localhost:27017/mbet";
mongoose.connect(mongoURI)
 .then(() => {
 console.log("MongoDB connected successfully");
 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
 });
 })
 .catch((err) => {
 console.error("MongoDB connection error:", err);
 process.exit(1);
 });
app.post('/api/data', async (req, res) => {
 try {
 const user = new User(req.body);
 await user.save();
 res.status(201).json(user);
 } catch (error) {
 console.error(error);
 res.status(400).json({ message: error.message });
 }
});
app.get('/api/data', async (req, res) => {
 try {
 const users = await User.find();
 res.status(200).json(users);
 } catch (error) {
 console.error(error);
 res.status(400).json({ message: error.message });
 }
});
app.put('/api/data/:id', async (req, res) => {
 try {
 const user = await User.findByIdAndUpdate(req.params.id, 
req.body, { new: true });
 if (!user) {
 return res.status(404).json({ message: "User not found" });
 }
 res.status(200).json(user);
 } catch (error) {
 console.error(error);
 res.status(400).json({ message: error.message });
 }
});
app.delete('/api/data/:id', async (req, res) => {
 try {
 const user = await User.findByIdAndDelete(req.params.id);
 if (!user) {
 return res.status(404).json({ message: "User not found" });
 }
 res.status(200).json({ message: "User deleted" });
 } catch (error) {
 console.error(error);
 res.status(400).json({ message: error.message });
 }
});