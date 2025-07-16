import { getAllReportsD, getHighReportsD, initReportOneD, updateReportByIdD, deleteReportByIdD } from "../dal/reportDal.js";
import { ExtractDataToObj, IsObjCurrect } from "../middleWare/reportMiddleWare.js";


export async function getAllReportsC(req, res) {
    try {
        const data = await getAllReportsD();
        res.status(200).json({ data });
    }
    catch (Err) {
        console.log('Err Server: --  file: reportCTRL -- function getAllReportsC = ', Err);
        res.status(500).json({ msg: 'getAllReportsC Server Error' })
    }
}

export async function getHighReportsC(req, res) {
    try {
        const data = await getHighReportsD();
        res.status(200).json({ data });
    }
    catch (Err) {
        console.log('Err Server: --  file: reportCTRL -- function getHighReportsC = ', Err);
        res.status(500).json({ msg: 'getAllPost Server Error' })
    }
}

export async function initReportOneC(req, res) {
    const obj = req.reportObj;
    try {
        if (obj) {
            const data = await initReportOneD(obj);
            return res.json({ insertId: data.insertedId });
        }
    } catch (Err) {
        console.log('Err Server: --  file: reportCTRL -- function initReportOneC = ', Err);
        res.sendStatus(500);
    }
}

export async function updateReportByIdC(req, res) {
    const obj = req.reportObj;
    const id = req.params['id'];
    console.log(id);
    try {
        if (obj && id) {
            const data = await updateReportByIdD(id, obj);
            return res.status(200).json({ data });
        }
    }
    catch (Err) {
        console.log('Err Server: --  file: reportCTRL -- function updateReportC = ', Err);
        res.sendStatus(500);
    }
}

export async function deleteReportByIdC(req, res) {
    const id = req.params['id'];
    console.log(id);
    try {
        if (id) {
            //להכניס פה מתודה שקודם כל מחפשת את 
            // ID- bonos
            //  ואח"כ במידה וקיים - מוחקת - כרגע אם לא קיים יחזיר 500 - אובייקט לא נמצא 
            const data = await deleteReportByIdD(id);
            return res.status(200).json({ msg: `${id} is delete` });
        }
    }
    catch (Err) {
        console.log('Err Server: --  file: reportCTRL -- function deleteReportByIdC = ', Err);
        res.sendStatus(500);
    }
}