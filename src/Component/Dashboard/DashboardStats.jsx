import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import {
  TeamOutlined,
  UserOutlined,
  BookOutlined,
  RiseOutlined,
} from "@ant-design/icons";

function DashboardStats() {
  return (
    <Row gutter={[16, 16]}>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Total Students"
            value={120}
            prefix={<TeamOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Total Teachers"
            value={18}
            prefix={<UserOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Total Courses"
            value={15}
            prefix={<BookOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Attendance"
            value={95}
            suffix="%"
            prefix={<RiseOutlined />}
          />
        </Card>
      </Col>

    </Row>
  );
}

export default DashboardStats;