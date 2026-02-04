import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({ handleNewTaskAdded }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = async () => {
    if (!newTaskTitle.trim()) {
      toast.error("Vui lòng nhập nội dung nhiệm vụ.");
      return;
    }

    try {
      await api.post("/tasks", {
        title: newTaskTitle,
      });

      toast.success(`Nhiệm vụ "${newTaskTitle}" đã được thêm!`);
      setNewTaskTitle("");
      handleNewTaskAdded();
    } catch (error) {
      console.error("Lỗi khi thêm nhiệm vụ:", error);
      toast.error("Đã xảy ra lỗi khi thêm nhiệm vụ.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Cần phải làm gì?"
          className="h-12 text-base bg-slate-50 sm:flex-1 border/border-50 focus:border-primary focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(event) => setNewTaskTitle(event.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={addTask}
          disabled={!newTaskTitle.trim()}
        >
          <Plus className="size-5" />
          Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
