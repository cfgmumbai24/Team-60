import Volunteer from "../models/volunteer.js";
import Beneficiary from "../models/beneficiary.js";

const getAllBeneficiaries = async (req, res) => {
    try {
        const beneficiaries = await Beneficiary.find();
        res.status(200).json(beneficiaries);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const addBeneficiary = async (req, res) => {
    const { id } = req.params;
    const { name, village, certificateType, certificate } = req.body;
    try {
        const volunteer = await Volunteer.findById(id);
        const newBeneficiary = new Beneficiary({ name, village, goats, volunteer, certificateType, certificate });
        await newBeneficiary.save();
        res.status(201).json(newBeneficiary);
        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }
        else {
            volunteer.villages.push(village);
            await volunteer.save();
        }
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export default { getAllBeneficiaries, addBeneficiary }