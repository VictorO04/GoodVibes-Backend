import * as confessionsModel from "./../models/confessionsModels.js";

export const listAll = async (req, res) => {
    try {
        const confessions = await confessionsModel.findAll();

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