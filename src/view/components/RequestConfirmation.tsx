import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  Alert,
  Popconfirm,
} from "antd";
import { Loading } from "./Loading";

const { Option } = Select;

export const RequestForm: React.FC = () => {
  const [form] = Form.useForm();
  const [showShipping, setShowShipping] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchSource = async () => {
    setLoading(false);
  };

  useEffect(() => {
    fetchSource();
  }, []);

  const onFinish = (values: any) => {
    setFormData(values);
    setConfirmVisible(true);
  };

  const handleConfirm = () => {
    // Send to Employee Dashboard or a DB
    console.log("Confirmed values of form: ", formData);
    setConfirmVisible(false);
  };

  const confirmationMessage = (
    <div>
      Please confirm your input:
      <ul>
        {Object.entries(formData).map(([key, value]) => {
          if (value !== undefined) {
            return <li key={key}>{`${key}: ${value}`}</li>;
          }
        })}
      </ul>
    </div>
  );

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <Form
        form={form}
        name="request_form"
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
      >
        {/* Form fields */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Popconfirm
            title={confirmationMessage}
            visible={confirmVisible}
            onConfirm={handleConfirm}
            onCancel={() => setConfirmVisible(false)}
            okText="Yes, all good"
            cancelText="No, let me check"
          ></Popconfirm>
        </Form.Item>
      </Form>
    </div>
  );
};
