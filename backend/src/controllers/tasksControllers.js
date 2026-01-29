import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }); // lay tat ca task, sap xep giam dan theo createdAt
    res.status(200).json(tasks);
  } catch (error) {
    console.log("Lỗi khi gọi getAllTasks:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body; // lay title tu body
    const task = new Task({ title }); // tao moi 1 task

    const newTask = await task.save(); // luu vao csdl
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Lỗi khi gọi createTask:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt,
      },
      { new: true },
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại" });
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Lỗi khi gọi updateTask:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại" });
    }

    return res.status(200).json({ message: "Xóa nhiệm vụ thành công" });
  } catch (error) {
    console.error("Lỗi khi gọi deleteTask:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
