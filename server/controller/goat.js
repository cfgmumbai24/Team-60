import Goat from "../models/goats.js";

const stats = async (req, res) => {
    try {
        const malegoats = await Goat.find({ gender: "male" }).count();
        const femalegoats = await Goat.find({ gender: "female" }).count();
        const malepercentage = (malegoats / (malegoats + femalegoats));
        const femalepercentage = (femalegoats) / (malegoats + femalegoats);
        res.status(200).json({ malepercentage, femalepercentage });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default stats;