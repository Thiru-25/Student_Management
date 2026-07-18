import React from "react";
import { Pagination } from "antd";

function StudentNavigator({
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
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} Students`
        }
        onChange={onChange}
      />
    </div>
  );
}

export default StudentNavigator;