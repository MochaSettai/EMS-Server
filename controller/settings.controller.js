import User from "../models/user.model.js";
import bcrypt from 'bcrypt'

const changePassword = async (req, res) => {
    try {
        console.log('heheh')
        const {userId, oldPassword, newPassword} = req.body;

        const user = await User.findById({_id: userId})
        if(!user) {
            return res.status(404).json({success: false, error: "user not found"})
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if(!isMatch) {
            return res.status(404).json({success: false, error: "wrong old password"})
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        const newUser = await User.findByIdAndUpdate({_id: userId}, {password: hashedPassword}) 
        console.log('hi thank you so much for speaking with us')

        return res.status(200).json({success: true, message: "password changed succesfully"})
        
    } catch (error) {
        return res.status(500).json({success: false, error: "settings error"})
    }
}

export { changePassword }