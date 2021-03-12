import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log("hello ts server");
  res.send("Hello from ts server");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
