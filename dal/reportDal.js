import { connect } from "../db/dbMongoDb.js";
import { ObjectId } from "mongodb";


export async function getAllReportsD() {
    try {
        const db = await connect();
        const data = await db.collection('intel_reports')
            .find()
            .toArray();
        return data;
    }
    catch (Err) {
        console.log('Err Server: --  file: reportDal -- function getAllReportsD = ', Err);
        res.status(500).json({ msg: 'getAllReportsD Server Error' })
    }
}

export async function getHighReportsD() {
    try {
        const db = await connect();
        const data = await db.collection('intel_reports')
            .find(
                { threatLevel: { $gt: 4 } } // מביא אם threatLevel - מספר הדוחות - גדול מ-4
            )
            .toArray();
        return data;
    }
    catch (Err) {
        console.log('Err Server: --  file: reportDal -- function getHighReportsD = ', Err);
        res.status(500).json({ msg: 'getAllPost Server Error' })
    }
}

export async function initReportOneD(obj) {
    try {
        const db = await connect();
        return await db.collection('intel_reports')
            .insertOne(obj);
    }
    catch (Err) {
        console.log('Err Server: --  file: reportDal -- function initReportOneD = ', Err);
        res.status(500).json({ msg: 'initReportOne Server Error' })
    }

}

export async function updateReportByIdD(id, obj) {
    try {
        const db = await connect();
        // סינון שדות שערכם null או undefined
        const filteredObj = Object.fromEntries(
            Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined)
        );
        return await db.collection('intel_reports')
            .updateOne(
                { _id: new ObjectId(id) }, // if Id=object.id to browser
                { $set: filteredObj },  // תעשה עידכון כאשר: או שהוא לא null וגם כאשר הוא לא דומה
                //כלפי מי מתייחס ה null - בתוך מנגו או פה?? אני מנקה מבחוץ - אז הכל בסדר
            );
    }
    catch (Err) {
        console.log('Err Server: --  file: reportDal -- function updateReportByIdD = ', Err);
        res.sendStatus(500);
    }
}


export async function deleteReportByIdD(id) {
    try {
        const db = await connect();
        return await db.collection('intel_reports')
            .deleteOne(
                { _id: new ObjectId(id) }
            );
    }
    catch (Err) {
        console.log('Err Server: --  file: reportDal -- function deleteReportByIdD = ', Err);
        res.sendStatus(500);
    }
}





