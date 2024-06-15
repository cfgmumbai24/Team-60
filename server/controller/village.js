import Village from "../models/village.js";
import Beneficiary from "../models/beneficiary.js";

const getVillages = async (req, res) => {
    try {
        const villages = await Village.find();
        res.status(200).json(villages);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getBeneificiariesByVillage = async (req, res) => {
    const { village } = req.params;
    try {
        const beneficiaries = await Beneficiary.find({ village: village })
        res.status(200).json(beneficiaries);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default { getVillages, getBeneificiariesByVillage }