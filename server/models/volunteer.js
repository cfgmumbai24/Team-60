import { model, Schema } from "mongoose";
import goats from "./goats.js";

const volunteerSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    volunteers: {
        type: [Schema.Types.ObjectId],
        ref: 'Volunteer'
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
    }
})

const Volunteer = model('Volunteer', volunteerSchema);
export default Volunteer;