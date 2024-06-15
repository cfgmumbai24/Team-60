import Volunteer from "../models/volunteer.js";
import Beneficiary from "../models/beneficiary.js";

const getBeneficiaries = async (req, res) => {
    const { id } = req.params;
    try {
        const volunteer = Volunteer.findById(id);
        const beneficiaries = Beneficiary.find({ volunteers: id });
        res.status(200).json(beneficiaries);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const addBeneficiary = async (req, res) => {
    const { name, village, goats, certificateType, certificate } = req.body;
    try {
        const newBeneficiary = new Beneficiary({ name, village, goats, volunteers, certificateType, certificate });
        await newBeneficiary.save();
        res.status(201).json(newBeneficiary);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export default { getBeneficiaries, addBeneficiary }







