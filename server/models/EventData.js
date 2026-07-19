import mongoose from "mongoose";

const eventDataSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    studentGmail: {
        type: String,
        required: true
    },
    studentCode: {
        type: String,
        required: true
    },
    studentSecation: {
        type: String,
        required: true
    },
    studentPhoneNo: {
        type: String,
        required: true
    },
    studentProfileimage: {
        type: String,
        required: true
    },
    applicationStatus: {
        type: String,
        required: true,
        enum: ['pending', 'accepted', 'rejected'],

    },
    userScore: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

const eventData = mongoose.model("eventData", eventDataSchema);
export default eventData;