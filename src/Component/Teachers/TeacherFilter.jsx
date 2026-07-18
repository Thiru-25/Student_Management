import { useState } from "react";
import { Input, Button, Space } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

function TeacherFilter({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText.trim());
  };

  const handleReset = () => {
    setSearchText("");
    onSearch("");
  };

  return (
    <div className="flex justify-between items-center mb-5">
      <Space.Compact style={{ width: "400px" }}>
        <Input
          placeholder="Search by Name, Email or Phone..."
          value={searchText}
          onChange={(e) =>
            setSearchText(e.target.value)
          }
          onPressEnter={handleSearch}
        />

        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Space.Compact>

      <Button
        icon={<ReloadOutlined />}
        onClick={handleReset}
      >
        Reset
      </Button>
    </div>
  );
}

export default TeacherFilter;