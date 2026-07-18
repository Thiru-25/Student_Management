import React from "react";
import { Pagination } from "antd";

function TeacherNavigator({
  currentPage,
  pageSize,
  total,
  onChange,
}) {
  return (
    <div className="flex justify-end mt-5">
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        showSizeChanger={false}
        showQuickJumper
        showTotal={(total) => `Total ${total} Teachers`}
        onChange={onChange}
      />
    </div>
  );
}

export default TeacherNavigator;