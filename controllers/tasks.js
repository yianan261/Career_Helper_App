export const getTasks = (req, res) => {
  res.status(200).json({ tasks: "success" });
};

export const getTasksId = (req, res) => {
  res.status(200).json({ tasks: req.params });
};
