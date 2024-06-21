const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const Nurse = require("./models/Nurse");
const Doctor = require("./models/Doctor");
const User = require("./models/User");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;
const sessionSecret = process.env.SESSION_SECRET;

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine and specify views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Function to connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {});
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1); // Exit process with failure
  }
};

// Initialize express-session middleware
const initializeSession = () => {
  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: mongoURI,
        collectionName: "sessions",
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  );
  console.log("Session initialized");
};

// Start the server and connect to MongoDB
const startServer = async () => {
  await connectToMongoDB();
  initializeSession();

  // Define your routes here
  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });

  app.get("/doctors", (req, res) => {
    res.render("doctors");
  });

  app.get("/nurses", (req, res) => {
    res.render("nurses");
  });

  app.post("/submit-doctor", async (req, res) => {
    const { fullName, whatsappNumber, timeAvailable, specialization } =
      req.body;
    const newDoctor = new Doctor({
      fullName,
      whatsappNumber,
      timeAvailable,
      specialization,
    });
    try {
      await newDoctor.save();
      res.send("Doctor data submitted");
    } catch (err) {
      res.status(500).send("Error saving doctor data");
    }
  });

  // Fetch all doctors from the database
  app.get("/api/doctors", async (req, res) => {
    try {
      const doctors = await Doctor.find();
      res.json(doctors);
    } catch (err) {
      res.status(500).send("Error fetching doctors");
    }
  });

  app.post("/submit-nurse", async (req, res) => {
    const { fullName, whatsappNumber, timeAvailable, specialization } =
      req.body;
    const newNurse = new Nurse({
      fullName,
      whatsappNumber,
      timeAvailable,
      specialization,
    });
    try {
      await newNurse.save();
      res.send("Nurse data submitted");
    } catch (err) {
      res.status(500).send("Error saving nurse data");
    }
  });

  // Fetch all nurses from the database
  app.get("/api/nurses", async (req, res) => {
    try {
      const nurses = await Nurse.find();
      res.json(nurses);
    } catch (err) {
      res.status(500).send("Error fetching nurses");
    }
  });

  // User registration and dashboard routes
  app.get("/user-register", (req, res) => {
    res.render("user");
  });

  app.post("/submit-user", async (req, res) => {
    const { name, age, email, whatsappNumber } = req.body;
    try {
      const newUser = new User({ name, age, email, whatsappNumber });
      await newUser.save();
      req.session.userId = newUser._id;
      res.redirect("/dashboard");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error registering user");
    }
  });

  app.get("/dashboard", async (req, res) => {
    if (!req.session.userId) {
      return res.redirect("/user-register");
    }

    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        return res.redirect("/user-register");
      }
      const doctors = await Doctor.find({});
      res.render("dashboard", { user, doctors });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error loading dashboard");
    }
  });

  // Start listening on the specified port
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

startServer();

// Array of objects containing full endpoint URLs
const baseUrl = `http://localhost:${port}`;
const endpoints = [
  { name: "User Form", url: `${baseUrl}/user-register` },
  { name: "Submit User", url: `${baseUrl}/submit-user` },
  { name: "Dashboard", url: `${baseUrl}/dashboard` },
  { name: "Doctor Form", url: `${baseUrl}/doctors` },
  { name: "Submit Doctor", url: `${baseUrl}/submit-doctor` },
  { name: "Fetch Doctors", url: `${baseUrl}/api/doctors` },
  { name: "Nurse Form", url: `${baseUrl}/nurses` },
  { name: "Submit Nurse", url: `${baseUrl}/submit-nurse` },
  { name: "Fetch Nurses", url: `${baseUrl}/api/nurses` },
];

console.log("Available endpoints:");
endpoints.forEach((endpoint) => {
  console.log(`${endpoint.name}: ${endpoint.url}`);
});
