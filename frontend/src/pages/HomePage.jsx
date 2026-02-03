import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskListPagination from "@/components/TaskListPagination";
import TaskList from "@/components/TaskList";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/tasks");
      const data = res.data[0]; // lấy phần tử đầu tiên trong mảng
      setTaskBuffer(data.tasks);
      setActiveTaskCount(data.activeCount[0]?.count || 0);
      setCompletedTaskCount(data.completedCount[0]?.count || 0);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Không thể tải nhiệm vụ. Vui lòng thử lại sau.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen w-full relative">
      {/* Radial Gradient Background from Top */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #fff 40%, #7c3aed 100%)",
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/*Dau trang*/}
          <Header />

          {/*Tao nhiem vu */}
          <AddTask />

          {/*Thong ke va bo loc*/}
          <StatsAndFilters
            activeTasksCount={activeTaskCount}
            completedTasksCount={completedTaskCount}
          />

          {/*Danh sach nhiem vu*/}
          <TaskList filteredTasks={taskBuffer} />

          {/*Phan trang va lap theo Date*/}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination />
            <DateTimeFilter />
          </div>
          {/*Chan trang*/}
          <Footer
            activeTaskCount={activeTaskCount}
            completedTaskCount={completedTaskCount}
          />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
