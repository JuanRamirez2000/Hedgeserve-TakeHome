import express, { Express, Request, Response } from "express";
import cors from 'cors';

const app: Express = express();
app.use(cors());
const port = 5000;

app.get('/calculate', (req: Request, res: Response) => {
    console.log("hit")
    let number1: number = parseFloat(req.query.number1 as string);
    let number2: number = parseFloat(req.query.number2 as string);
    let operation: string = req.query.operation as string;
    let result: string = '';

    switch (operation){
        case '+':
            result = (number1 + number2).toString();
            break;

        case '+':
            result = (number1 - number2).toString();
            break;

        case '+':
            result = (number1 * number2).toString();
            break;

        case '+':
            result = (number1 / number2).toString();
            break;
    }

    console.log(result);
    res.send(result);
})

app.listen(port, () => {
    console.log('Server Started')
})