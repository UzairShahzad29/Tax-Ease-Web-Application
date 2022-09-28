const User = require('../db/models/user')


exports.addUser = async (req, res, next) => {
    const { email, phone, password } = req.body
    try {
        const isExit = await User.findOne({email})
        if(isExit){
            return res.status(400).json({
                message: "User already exist!",
                success: false
            })
        }
        else{
            const newUser = new User({email, phone, password})
            await newUser.save()
            return res.status(200).json({
                message: "user registered!",
                success: true
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

exports.findUser = async (req, res, next) => {
    const _id = req.params;
    const id  = _id.id

    try {
        const user = await User.findOne({_id: id})
        return res.json({
            user
        })
    } catch (error) {
        return res.json({
            message: 'internal Server Error'
        })
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        return res.status(200).json({
            message : 'Ok fetched',
            users
    })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error"
        })
    }
}