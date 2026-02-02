import React from "react";

const Footer = ({ completedTasksCount = 0, activeTaskCount = 0 }) => {
  return (
    <>
      {completedTasksCount + activeTaskCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                🎉 Tuyệt !!!! Bạn đã hoàn thành {completedTasksCount} việc.
                {activeTaskCount > 0 &&
                  ` Còn lại ${activeTaskCount} việc cần làm nữa nhé!`}
              </>
            )}
            {completedTasksCount === 0 && activeTaskCount > 0 && (
              <>Bạn còn {activeTaskCount} việc cần làm. Cố lên nào! 💪</>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
