const getTasks = (req, res) => {
  res.status(200).json({ tasks: "success" });
};

const getTasksId = (req, res) => {
  res.status(200).json({ tasks: req.params });
};
module.exports = { getTasks, getTasksId };
