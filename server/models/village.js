import { Schema, model } from "mongoose"
import beneficiary from "../controller/beneficiary.js"

const villageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    beneficiaries: [{
        type: Schema.Types.ObjectId,
        ref: 'Beneficiary'
    }]
})

const Village = model('Village', villageSchema)
export default Village