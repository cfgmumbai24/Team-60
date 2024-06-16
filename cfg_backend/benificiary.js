import mongoose from 'mongoose';

const beneficiarySchema = new mongoose.Schema({
    name: { type: String, required: true },
    village: { type: String, required: true },
    goats: { type: Number, required: true },
    certificate: { type: String, required: true },
    timestamp: { type: String, default: Date.now },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true }

});

const Beneficiary = mongoose.model('Bene', beneficiarySchema);

export default Beneficiary;
