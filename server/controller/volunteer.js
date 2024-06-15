import Volunteer from "../models/volunteer.js";
import Beneficiary from "../models/beneficiary.js";

const getBeneficiaries = async (req, res) => {
    const { uid } = req.params;
    console.log('uid:', uid);
    try {
        // Find the volunteer by _id
        const volunteer = await Volunteer.find({uid: uid});
        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }
        
        res.status(200).json(volunteer);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
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







