import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {createPool} from 'mysql';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

var pool  = createPool({
  connectionLimit : parseInt(String(process.env.MYSQL_POOL_CONNECTIONS)),
  host            : process.env.MYSQL_HOST,
  user            : process.env.MYSQL_USERNAME,
  password        : process.env.MYSQL_PASSWORD,
  database        : process.env.MYSQL_DATABASE
});

pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('\x1b[32mMySQL connection Works!\x1b[0m The result is: ', results[0].solution);
});


app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
