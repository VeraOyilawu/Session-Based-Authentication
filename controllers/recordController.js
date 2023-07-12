const recordModel = require("../models/recordModel")
const userModel = require("../models/userModel")

exports.createRecord= async(req, res) => {
    try {
        const {mathScore, englishScore} = req.body

        const record = new recordModel({
            mathScore,
            englishScore,
            createdBy: req.session.user._id
        })
        await record.save()

        res.status(201).json({
            message: "Record created sucessfully",
            data: record
        })
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

exports.readRecords = async(req, res) => {
    try {
        const record = await recordModel.find()

        res.status(200).json({
            message: "all records",
            data: record
        })
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

exports.readAllRecordsOfUser = async(req, res) => {
    try {
        const records = await recordModel.find({createdBy: req.session.user._id}).populate()

        if (!records) {
            res.status(404).json({
                message: "This user has no record"
            })   
        }else{
            res.status(200).json({
                message: "all records and users",
                data: records
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

exports.readRecord = async(req, res) => {
    try {
        const {id} = req.params
        const record = await recordModel.findById(id)
        if (!record) {
            return res.status(404).json({
                message: "record not found"
            })
        }

        if (record.createdBy.toString() !== req.session.user._id.toString()) {
            return res.status(404).json({
                message: "Unauthorized"
            })
        }

        res.status(200).json({
            message: "The records",
            data: record
        })
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

