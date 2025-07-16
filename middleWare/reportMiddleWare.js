
import express from "express";

export function ExtractDataToObj(req, res, next) {
    const obj = {
        fieldCode: req.body["fieldCore"] ? req.body["fieldCore"] : null,
        location: req.body["location"] ? req.body["location"] : null,
        threatLevel: req.body["threatLevel"] ? req.body["threatLevel"] : null,
        description: req.body["description"] ? req.body["description"] : null,
        timestamp: req.body["timestamp"] ? req.body["timestamp"] : null,
        confirmed: req.body["confirmed"] ? req.body["confirmed"] : null
    };
    req.reportObj = obj; //הוספתי ערך בתוך request שנקרא reportObj והקונטרולר ישלוף אותו באמצעות הקריאה בצורה הבאה : req.reportObj
    next();
}
export function IsObjCurrect(req, res, next) {
    const obj = req.reportObj;
    // console.log(obj);
    const requiredFields = ['fieldCore', 'location', 'threatLevel', 'description', 'timestamp', 'confirmed'];
    const q = requiredFields.every(key => obj[key] !== undefined || obj[key] !== null); //האחרון לא עובד - כי הוא יכול להיות false - in boolean
    // console.log(q);
    if (q) {
        next();
    }
    else {
        res.status(400).json({ msg: 'obj not invalid' });
    }
}
// // עצה אחרי מעשה: אפשר לעשות את זה גם בדרך אחרת  שיותר נכונה :
// export function IsObjCurrect(req, res, next) {
//     if (req.body['fieldCode'] && req.body['location'] && req.body['threatLevel'] && req.body['description'] && req.body['timestamp'] && req.body['confirmed']) {
//         next();
//     }
//     else { res.status(400).json({ msg: 'אובייקט לא שלם' }); }
// }
