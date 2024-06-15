import { model, Schema } from "mongoose"

const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    village: {
        type: String,
        required: true
    },
    volunteer: {
        type: Schema.Types.ObjectId,
        ref: 'Volunteer'
    },
})
