import { model, Schema } from "mongoose";
import goats from "./goats";

const volunteerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    uid: {
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
})

const Volunteer = model('Volunteer', volunteerSchema);
export default Volunteer;