import { Schema, model } from 'mongoose';

const beneficiarySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    village: {
        type: String,
        required: true
    },
    goats: {
        type: [Schema.Types.ObjectId],
        ref: 'Goat'
    },
    volunteers: {
        type: [Schema.Types.ObjectId],
        ref: 'Volunteer'
    },
    certificateType: {
        type: String,
        enum: ["AadharCard", "DomicleCerticiate", "RationCard"],
        default: "none"
    },
    certificate: {
        type: String,
        default: "none"
    },
});

export default model('Beneficiary', beneficiarySchema);