const db = require("../models");
const Workers = db.workers;

// Create
exports.create = (req, res) => {
  // Валидация
  if (!req.body.UserName || !req.body.LastName || !req.body.Status) {
    res.status(400).send({ message: "Ошибка валидации 400!" });
    return;
  }

  // Добавить нового сотрудника
  const workers = new Workers({
    UserName: req.body.UserName,
    LastName: req.body.LastName,
    Patronymic: req.body.Patronymic,
    Salary: req.body.Salary,
    Status: req.body.Status,
    WorkPosition: req.body.WorkPosition,
    UpdatedAt: req.body.UpdatedAt,
  });

  // Сохранить
  workers
    .save(workers)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка сохранения 500!"
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const UserName = req.query.UserName;
  var condition = UserName ? { UserName: { $regex: new RegExp(UserName), $options: "i" } } : {};

  Workers.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Найти сотрудника по Id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Workers.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Такого сотрудника не существует!"});
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Ошибка 500, сотрудник не найден"});
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Не возможно обновить!"
    });
  }

  const id = req.params.id;

  Workers.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Ошибка 400 невозможно обновить данные!`
        });
      } else res.send({ message: "Данные сотрудника успешно обновленны." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Ошибка 500! Не возможно обновить данные о сотруднике"
      });
    });
};

// Delete request Cотрудника
exports.delete = (req, res) => {
  const id = req.params.id;

  Workers.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Сотрудник не найден`
        });
      } else {
        res.send({
          message: "Сотрудник успешно удалён!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Невозможно удалить сотрудника"
      });
    });
};

// Удалить всес сотрудников (ну мало ли)
exports.deleteAll = (req, res) => {
  Workers.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Сотрудники успешно удалены!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ошибка не возможно удалить всех сотрудников"
      });
    });
};

exports.findAllPublished = (req, res) => {
  Workers.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Ошибка 500!"
        });
      });
};