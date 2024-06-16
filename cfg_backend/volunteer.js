import { Schema, model } from 'mongoose';

const volunteerSchema = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    goats: {
        type: [String],
        ref: 'Goat'
    },
    villages: {
        type: [String],
    },
    available: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: true
    },
    task: {
        type: [String],
        default: []
    }
});

const Volunteer = model('Volunteer', volunteerSchema);
export default Volunteer;
