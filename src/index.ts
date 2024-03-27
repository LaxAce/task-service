import express, {Request, Response} from "express";

const app = express();
const port = 2024;

app.get("/", (req: Request, res: Response) => {
  res.send(`Hello World! this is ${port}`);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));