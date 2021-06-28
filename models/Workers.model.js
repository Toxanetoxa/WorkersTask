module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
        UserName: String,
        LastName: String,
        Patronymic: String,
        Salary: String,
        WorkPosition: String,
        Status: String,
        UpdatedAt: Date,
        published: Boolean,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Workers = mongoose.model("workers", schema);
  return Workers;
};
