const express = require("express");
const passport = require("passport");
require("./auth");

const app = express();

app.get("/", (req, res) => {
  res.send(`<a href = "/auth/google">Authenticate with google</a>`);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.use(express.json());
// console.log("man");

app.listen(2000, () => {
  console.log(`Running`);
});
