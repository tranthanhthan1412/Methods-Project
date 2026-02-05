import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Circle, Square, CheckCircle2, Calendar, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import api from "@/lib/axios";
import { toast } from "sonner";

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTaskTitle, setUpdatedTaskTitle] = useState(task.title || "");

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Nhiệm vụ đã được xóa.");
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi khi xóa nhiệm vụ:", error);
      toast.error("Đã xảy ra lỗi khi xóa nhiệm vụ.");
    }
  };

  const updateTask = async () => {
    // Cancel nếu không thay đổi
    if (updatedTaskTitle.trim() === task.title) {
      setIsEditing(false);
      return;
    }

    if (!updatedTaskTitle.trim()) {
      toast.error("Nội dung không được để trống");
      return;
    }

    try {
      setIsEditing(false);
      await api.put(`/tasks/${task._id}`, {
        title: updatedTaskTitle,
      });

      toast.success(`Nhiệm vụ đã được cập nhật thành "${updatedTaskTitle}".`);
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi khi cập nhật nhiệm vụ:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật nhiệm vụ.");
    }
  };

  const toggleTaskCompleteButton = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "completed",
          completedAt: new Date().toISOString(),
        });
        toast.success(`Nhiệm vụ "${task.title}" đã hoàn thành.`);
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.success(
          `Nhiệm vụ "${task.title}" đã được đặt lại thành chưa hoàn thành .`,
        );
      }
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái nhiệm vụ:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật trạng thái nhiệm vụ.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateTask();
    }
  };

  return (
    <Card
      className={cn(
        "p-4 bg-gradiant-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "completed" && "opacity-75",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/*Nut tron */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "completed"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary",
          )}
          onClick={toggleTaskCompleteButton}
        >
          {task.status === "completed" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>
        {/*Hien thi hoac chinh sua tieu de */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              placeholder="Cần phải làm gì?"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary focus:ring-primary/20"
              type="text"
              value={updatedTaskTitle}
              onChange={(e) => setUpdatedTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={updateTask}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "completed"
                  ? "line-through text-muted-foreground"
                  : "text-foreground",
              )}
            >
              {task.title}
            </p>
          )}
          {/*Ngay tao va ngay hoan thanh */}
          <div className="flex items-center gap-2 mt-1 ">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>
        {/*Nut chinh sua va xoa */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up ">
          {/* Nut chinh sua */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditing(true);
              setUpdatedTaskTitle(task.title || "");
            }}
          >
            <Square className="size-4" />
          </Button>
          {/* Nut xoa */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
