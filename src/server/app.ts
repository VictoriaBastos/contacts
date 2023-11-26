import {connection} from "../config/connection"
import contactRoutes from "../routes/contactRoutes"
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/v1/contacts', contactRoutes);

connection();

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
})

export default app;