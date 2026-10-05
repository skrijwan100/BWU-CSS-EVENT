import express from 'express';
import fetchuer from '../middlewares/fecthuser.js';
import { getLeaderboard, getParticipantByEmail, updateParticipantScore } from '../controllers/eventData.controller.js';
import eventData from '../models/EventData.js';

const eventDataRouter = express.Router();

// GET /api/v4/event-data/leaderboard
// Optional: ?semester=3rd or ?semester=5th
eventDataRouter.get('/leaderboard', getLeaderboard);
eventDataRouter.get('/participant', fetchuer, getParticipantByEmail);
eventDataRouter.put('/participant/:id/score', fetchuer, updateParticipantScore);
eventDataRouter.post('/userdata-for-event-pass',async(req,res)=>{
    try {
        const {studentCode}=req.body;
        if(!studentCode){
            return res.status(400).json({ "msg": "Student Code is required", status: false })
        }
        const userData= await eventData.findOne({studentCode}).lean();
        if(!userData){
            return res.status(404).json({ "msg": "Your name is not Present in finalist.", status: false })
        }
        return res.status(200).json({ "msg": "User data is fecthed successful","data":userData ,status: true })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "msg": "Internal Servre errror", status: false })
    }

})

export default eventDataRouter;
