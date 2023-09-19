import mysql from 'mysql8';
import { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } from "@/config";

const connection = mysql.createConnection(
    {
        host:MYSQL_HOST,
        user:MYSQL_USER ,
        password:MYSQL_PASSWORD ,
        database:MYSQL_DATABASE 
    }
);

connection.connect((error)=>{
    if(error){
        console.log("Unable to connect DataBase")
    }
    console.log("My SQL DataBase Connected Successfully.")
})

export default connection;

 