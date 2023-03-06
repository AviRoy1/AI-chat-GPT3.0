const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const openaiRoutes = require("./routes/openaiRoute");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

dotenv.config();

connectDB();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(errorHandler);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai", openaiRoutes);

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.DEV_MODE} on port - ${PORT}`.bgWhite.red
  );
});
