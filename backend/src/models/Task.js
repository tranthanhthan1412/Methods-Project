import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // xoa khoang trang o dau va cuoi
    },
    status: {
      type: String,
      enum: ["active", "completed"], // chi chap nhan 2 gia tri nay
      default: "active",
    },
    completedAt: {
      type: Date,
      default: null, // ban dau la chua hoan thanh
    },
  },
  {
    timestamps: true, // tu dong them createdAt va updatedAt
  },
);

export const Task = mongoose.model("Task", taskSchema);
export default Task;
