import express, {Request, Response} from "express";
import cors from 'cors';
import config from "~/config";
import routes from '~/routes';
import path from "path";
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.use(cors({credentials: true, origin: config.clientUrl}))

app.get('/', (req: Request, res: Response) => {
    res.json("You're here!")
})
app.use('/api/', routes);
app.listen(config.port, () => {
    console.log(`server running on http://localhost:${config.port}`);

});
