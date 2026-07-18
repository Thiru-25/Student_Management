import React, { useState } from "react";
import { Input, Button, Space } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

function StudentFilter({
  onSearch,
}) {
  const [searchText, setSearchText] = useState("");

  //---------------------------------------
  // Search
  //---------------------------------------

  const handleSearch = () => {
    onSearch(searchText.trim());
  };

  //---------------------------------------
  // Reset
  //---------------------------------------

  const handleReset = () => {
    setSearchText("");
    onSearch("");
  };

  return (
    <div className="mb-5">

      <Space
        style={{
          width: "100%",
          display: "flex",
        }}
      >

        <Input
          size="large"
          allowClear
          placeholder="Search by Name, Email or Phone"
          value={searchText}
          onChange={(e) =>
            setSearchText(e.target.value)
          }
          onPressEnter={handleSearch}
        />

        <Button
          size="large"
          type="primary"
          icon={<SearchOutlined />}
          onClick={handleSearch}
        >
          Search
        </Button>

        <Button
          size="large"
          icon={<ReloadOutlined />}
          onClick={handleReset}
        >
          Reset
        </Button>

      </Space>

    </div>
  );
}

export default StudentFilter;