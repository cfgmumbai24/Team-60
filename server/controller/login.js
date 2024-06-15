
const login= async (req, res) => {
    const { uid, password } = req.body;
    console.log(req.body)
    try {
        const volunteer = await Volunteer
            .findOne({ uid: uid, password: password });
        
        if (volunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }
        res.status(200).json(volunteer);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export default login;
