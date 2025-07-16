
import { config } from "dotenv";
config();
import { MongoClient } from "mongodb";


const clinet =  new MongoClient(process.env.DB_CONNECTION);
let db; 
const DBNAME = "Threat_report_terminal_exercise";

export async function connect() {
    if(!db){
        await clinet.connect();
        db = clinet.db(DBNAME); // Data Base Name
        console.log(`connect to mongoDB in data base: ${DBNAME}.`);
    }
    return db;
}
export default connect;

















