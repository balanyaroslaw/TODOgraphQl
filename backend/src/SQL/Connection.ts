import mysql from 'mysql';
export class Connection
{
    public createConnection = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "1234",
        database: "todos"
      });
}