const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const patientRoutes = require("./routes/patient");
const appointmentRoutes = require("./routes/appointment");
const rootUser = require("./routes/rootUser");
const { notFound, errorHandler } = require("./middlewares/error");
const protectRoute = require("./middlewares/protectRoute");
const mongoose = require("mongoose")
dotenv.config();
// connectDB();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://muhammadhamzaawan110:jMoiS3vy6FsSwVcV@cluster0.v2ryc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const app = express();
connectDB();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/patients", protectRoute, patientRoutes);
app.use("/api/appointments", protectRoute, appointmentRoutes);
app.use("/api/rootuser", rootUser);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
