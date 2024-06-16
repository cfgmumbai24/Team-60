import { model, Schema } from "mongoose";
import goats from "./goats.js";
import Beneficiary from "./beneficiary.js";

const volunteerSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    goats: {
        type: [Schema.Types.ObjectId],
        ref: 'Goat'
    },
    villages: {
        type: [String],
    },
    free: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: true
    },
    Beneficiary: {
        type: [Schema.Types.ObjectId],
        ref: 'Beneficiary'
    }
})

const Volunteer = model('Volunteer', volunteerSchema);
export default Volunteer;