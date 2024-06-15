import Goat from "../models/goats.js";
import Beneficiary from "../models/beneficiary.js";

const getGoats = async (req, res) => {
    const { _id } = req.params;
    const beneficiary = await Beneficiary.findById(_id);

    if (!beneficiary) {
        res.status(404).json({ message: "Beneficiary not found" });
    }
    else {
        res.status(200).json(beneficiary.goats);
    }
}

const addGoat = async (req, res) => {
    const { _id } = req.params;
    const { tag, age, vaccinated, weight, gender } = req.body;
    const beneficiary = await Beneficiary.findById(_id);

    if (!beneficiary) {
        res.status(404).json({ message: "Beneficiary not found" });
    }
    else {
        const newGoat = new Goat({ tag, age, vaccinated, weight, gender });
        await newGoat.save();
        beneficiary.goats.push(newGoat._id);
        await beneficiary.save();
        res.status(201).json(newGoat);
    }
}

const updateGoatHealth = async (req, res) => {
    const { tag, age, vaccinated, weight } = req.body;

    try {
        const goat = await Goat.findOne({ tag: tag });

        if (!goat) {
            return res.status(404).json({ message: "Goat not found" });
        }

        const updatedGoat = await Goat.findByIdAndUpdate(goat._id, { age, vaccinated, weight }, { new: true });

        return res.status(200).json(updatedGoat);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while updating the goat's health." });
    }
};

export default { getGoats, addGoat, updateGoatHealth }