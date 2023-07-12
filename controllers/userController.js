const bcrypt = require("bcrypt")
const userModel = require("../models/userModel")

const signUp = async(req, res) => {
    try {
        const {userName, email, password} = req.body

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message: "Email is already registered"
            })
        }
        const saltPassword = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, saltPassword)

            const user = new userModel({
                userName,
                email,
                password: hashPassword
                // records: []
            })

            await user.save()

            res.status(201).json({
                message: "user created sucessfully"
            })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const signIn = async(req, res) => {
    try {
        const {email, password} = req.body

        const user = await userModel.findOne({email})
        if (!user) {
            return res.status(401).json({
                message: "invalid credentials"
            })
        }

        req.session.user = user

        res.status(404).json({
            message: "user signed in sucessfully",
            data: user
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        }) 
    }
}

const signOut = async(req, res) => {
    try {
        req.session.destroy()
        res.status(200).json({
            message: "user signed out sucessfully"
        }) 
    } catch (error) {
        res.status(404).json({
            message: error.message
        }) 
    }
}

const allUsers = async(req, res) => {
    try {
        const record = await userModel.find()

        res.status(200).json({
            message: "all users",
            data: record
        })
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

module.exports = {
    signUp,
    signIn,
    signOut,
    allUsers
}