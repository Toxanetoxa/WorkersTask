const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: [
      "http://localhost:8081",
      "http://192.168.1.253:8081",
      "http://185.233.2.180:8081"
  ]
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Успешное подключение к базе данных!");
  })
  .catch(err => {
    console.log("Не удалось подключиться к базе данных!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Test task MEVN" });
});

require("./routes/Workers.routes")(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Сервер запущен порт: ${PORT}`);
});
