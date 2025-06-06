import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoute from "./src/routes/auth.route.js";
import studRoute from "./src/routes/stud.route.js";
import batchRoutes from "./src/routes/batch.route.js";
import productRoutes from "./src/routes/product.route.js";
import depRoutes from "./src/routes/department.route.js";
import subjectRoutes from "./src/routes/subject.route.js";
//Db connection
import { connectDB } from "./src/lib/db.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders:'Content-Type,Authorization',
}));

// app.options('*', (req, res) => res.sendStatus(200));

// Dummy user data (Replace with a database in production)
// const users = [
//     { username: "sakthi", password: "sakthi@1043" },
//     { username: "vel", password: "vel@9790" }
// ];

// app.get("/",(req,res)=>{
//     res.send("Hello World");
// })

// // Login API
// app.post("/login", (req, res) => {
//     const { username, password } = req.body;

//     const user = users.find(u => u.username === username && u.password === password);

//     if (user) {
//         res.json({ success: true, message: "Login successful!",id:1 });
//     } else {
//         res.json({ success: false, message: "Invalid username or password",id:0 });
//     }
// });

// Start Server
app.use("/api/auth",authRoute);
app.use("/api/Students",studRoute);
app.use("/api/batches", batchRoutes);
app.use("/api/Products",productRoutes);
app.use("/api/Departments",depRoutes);
app.use("/api/Subjects",subjectRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
});
