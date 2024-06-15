import { model, Schema } from "mongoose";
import goats from "./goats.js";

const volunteerSchema = new Schema({
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
    }
})

const Volunteer = model('Volunteer', volunteerSchema);
export default Volunteer;