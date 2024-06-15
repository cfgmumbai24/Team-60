import Goat from "../models/goats.js";

const getGoats = async (req, res) => {
    const { _id } = req.params;
    const Beneficiary = await Beneficiary.findById(_id);

    if (!Beneficiary) {
        res.status(404).json({ message: "Beneficiary not found" });
    }
    else {
        res.status(200).json(Beneficiary.goats);
    }
}

const addGoat = async (req, res) => {
    const { _id } = req.params;
    const { tag, age, vaccinated, weight } = req.body;
    const Beneficiary = await Beneficiary.findById(_id);

    if (!Beneficiary) {
        res.status(404).json({ message: "Beneficiary not found" });
    }
    else {
        const newGoat = new Goat({ tag, age, vaccinated, weight });
        await newGoat.save();
        Beneficiary.goats.push(newGoat._id);
        await Beneficiary.save();
        res.status(201).json(newGoat);
    }
}

const updateGoatHealth = async (req, res) => {
    const { tag, age, vaccinated, weight } = req.body;
    const goat = Goats.findOne({ tag: tag });
    if (!goat) {
        res.status(404).json({ message: "Goat not found" });
    }
    else {
        const updatedGoat = Goats.findByIdAndUpdate(goat._id, { age, vaccinated, weight }, { new: true });
    }
}

export default { getGoats, addGoat, updateGoatHealth }