import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 4001;

app.use('/', express.static( path.join(__dirname, '/public')));

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
}); 