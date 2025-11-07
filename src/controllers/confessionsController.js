import * as confessionsModel from "./../models/confessionsModels.js";

export const listAllConfessions = async (req, res) => {
    try {
        const confessions = await confessionsModel.findAllConfessions();

        if (!confessions || confessions.length === 0) {
            return res.status(404).json({
                total: 0,
                message: "There are no confessions on the list",
                confessions
            });
        }
        res.status(200).json({
            total: confessions.length,
            message: "confessions list",
            confessions
        });
    } catch (error) {
        res.status(500).json({
            error: "internal server error",
            details: error.message,
            status: 500
        });
    }
}

export const listOneConfession = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const confession = await confessionsModel.findOneConfession(id);

        if (!confession) {
            return res.status(404).json({
                error: "confession not founded",
                message: "Check the confession id",
                id: id
            });
        }

        res.status(200).json({
            message: "confession founded",
            confession
        });
    } catch (error) {
        res.status(500).json({
            error: "internal server error",
            details: error.message,
            status: 500
        });
    }
}

export const createConfession = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            error: "internal server error",
            details: error.message,
            status: 500
        });
    }
}

export const create = async (req, res) => {
    try {
        const { message, message_type, recipient, sender } = req.body;
        const data = req.body;

        const requiredFields = [message, message_type, recipient, sender];

        const missing = requiredFields.filter((field) => !data[field]);

        if (missing.length > 0) {
            return res.status(400).json({
                error: `The following fields are required: ${missing.join(", ")}`
            });
        }

        const newConfession = await confessionsModel.create(req.body);

        res.status(201).json({
            message: "confession added successfully",
            confession: newConfession
        });
    } catch (error) {
        res.status(500).json({
            error: "internal server error",
            details: error.message,
            status: 500
        })
    }
}