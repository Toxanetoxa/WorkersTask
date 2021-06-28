module.exports = app => {
  const Workers = require("../controllers/Workers.controller.js");

  var router = require("express").Router();

  // Create
  router.post("/", Workers.create);

  // Retrieve all
  router.get("/", Workers.findAll);

  // Retrieve all published
  router.get("/published", Workers.findAllPublished);

  // Retrieve a single Workers
  router.get("/:id", Workers.findOne);

  // Update a Workers
  router.put("/:id", Workers.update);

  // Delete a Workers
  router.delete("/:id", Workers.delete);

  // Create a new Workers
  router.delete("/", Workers.deleteAll);

  app.use("/api/Workers", router);
};
