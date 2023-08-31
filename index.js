const express = require("express");
const passport = require("passport");
require("./auth");
const session = require("express-session");
const { dbConnect } = require("./config/db");

const isLoggedIn = (req, res, next) => {
  req?.user ? next() : res.sendStatus(400);
};

const app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

dbConnect;
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send(`<a href = "/auth/google">Authenticate with google</a>`);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/google/callback/protect",
    failureRedirect: "/google/callback/failure",
  })
);

app.get("/google/callback/protect", isLoggedIn, (req, res) => {
  return res.send(
    `hello ${req?.user?.displayName}. I think you are a ${req?.user?.provider}`
  );
});
app.get("/google/callback/failure", (req, res) => {
  return res.send("failed to authnticate");
});

app.use(express.json());
// console.log("man");

app.listen(2001, () => {
  console.log(`Running`);
});
