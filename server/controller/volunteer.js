import Volunteer from "../models/volunteer.js";
import Beneficiary from "../models/beneficiary.js";

const getBeneficiaries = async (req, res) => {
    const { id, password } = req.body;
    const volunteer = Volunteer.findById(id);
    if (volunteer.password !== password) {
        res.status(401).json({ message: "Unauthorized Access" });
    }
    else {
        const beneficiaries = Beneficiary.find({ volunteers: id });
        res.status(200).json(beneficiaries);
    }
}

const addBeneficiary = async (req, res) => {
    const { name, village, goats, volunteers, certificateType, certificate } = req.body;
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







