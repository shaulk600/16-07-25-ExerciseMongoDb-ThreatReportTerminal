import express from "express";
import { getAllReportsC, getHighReportsC, initReportOneC, updateReportByIdC ,deleteReportByIdC } from "../controlers/reportControler.js";
import { ExtractDataToObj, IsObjCurrect } from "../middleWare/reportMiddleWare.js";

const router = express.Router();

router.post('/', ExtractDataToObj, IsObjCurrect, initReportOneC);// init = return id

router.get('/', getAllReportsC); //all report

router.get('/high', getHighReportsC); //Reports where 'threatLevel' >= 4

router.put('/:id/confirm', ExtractDataToObj, updateReportByIdC); // update -  אולי לא חובה בדיקה שכל הערכים הגיעו
// ● Action: Set confirmed to true
// ● Output: Updated report

router.delete('/:id' , deleteReportByIdC ); // deleted 'document' by id

// ● Action: Remove a report
// ● Output: Success or not-found message

//bonos:

// router.get('/:id' , ); //get reports by ID

// ● � GET /reports/agent/:fieldCode → all reports from one agent
// ● � GET /stats → count of all, high, and confirmed reports

router.use((req, res) => {
    res.status(404).json({ msg: 'path not found' });
});

export default router;