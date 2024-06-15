import Volunteer from "../models/volunteer.js";

const addvolunteer = async (req, res) => {
    const { name, free, password } = req.body;
    const newVolunteer = new Volunteer({ name, free, password });
    try {
        await newVolunteer.save();
        res.status(201).json(newVolunteer);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const deletevolunteer = async (req, res) => {
    const { id } = req.params;
    const volunteer = Volunteer.findById(id);
    try {
        await Volunteer.findByIdAndRemove(id);
        res.status(201).json({ message: "Volunteer deleted successfully" });
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getAllVolunteer = async (req, res) => {
    try {
        const volunteers = await Volunteer.find();
        res.status(200).json(volunteers);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getVolunteer = async (req, res) => {
    const { id } = req.params;
    try {
        const volunteer = await Volunteer.findById(id);
        res.status(200).json(volunteer);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateVolunteer = async (req, res) => {
    const { id } = req.params;
    const { name, free } = req.body;
    if (!free) {
        res.status(409).json({ message: "Volunteer is not free" });
    }
    try {
        const updatedVolunteer = await Volunteer.findByIdAndUpdate(id, { name, uid, goats, villages, free }, { new: true });
        res.status(200).json(updatedVolunteer);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const assignedVillageVolunteer = async (req, res) => {
    const { village } = req.params;
    try {
        const volunteers = await Volunteer.find({ villages: village });
        res.status(200).json(volunteers);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export default { addvolunteer, deletevolunteer, getAllVolunteer, getVolunteer, updateVolunteer, assignedVillageVolunteer };

