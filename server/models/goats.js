import { model, Schema } from "mongoose";

const goatSchema = new Schema({
    tag: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    vaccinated: {
        type: Boolean,
        default: false
    },
    weight: {
        type: Number,
        required: true
    },
});

const Goat = model('Goat', goatSchema);
export default Goat;
