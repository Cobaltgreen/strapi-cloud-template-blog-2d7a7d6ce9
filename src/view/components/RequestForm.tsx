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
  const [confirmVisible, setConfirmVisible] = useState(false); // State to manage visibility of Popconfirm
  const [formData, setFormData] = useState({});

  // const [source, setSource] =

  /**
   * Could be used later to get account information from database to autofill some of the fields
   */
  const fetchSource = async () => {
    // const source =
    setLoading(false);
  };

  useEffect(() => {
    fetchSource();
  }, []);

  const onFinish = (values: any) => {
    setFormData(values);
    setConfirmVisible(true); // Show the Popconfirm
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

  const handleConfirm = () => {
    console.log("Confirmed values of form: ", formData);
    setConfirmVisible(false);
    // Additional actions upon confirmation, like sending data to a server
  };

  // const onFinish = (values: any) => {
  //   for (const pair of Object.entries(values)) {
  //     if (pair[1] !== undefined) {
  //       console.log(pair);
  //     }
  //   }
  //   console.log("Confirmed values of form: ", formData); // Send to Employee Dashboard
  // };

  return loading ? (
    <Loading />
  ) : (
    <Card style={{ margin: "auto", maxWidth: 800 }}>
      <Form
        form={form}
        name="request_form"
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="Name of requester"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input value={""} />
        </Form.Item>

        <Form.Item
          name="company"
          label="Company"
          rules={[
            { required: true, message: "Please input your company name!" },
          ]}
        >
          <Input value={""} />
        </Form.Item>

        <Form.Item name="site" label="Site (if Applicable)">
          <Input value={""} />
        </Form.Item>

        <Form.Item name="addShipping" valuePropName="checked">
          <Checkbox onChange={(e) => setShowShipping(e.target.checked)}>
            Add shipping address
          </Checkbox>
        </Form.Item>

        {showShipping && (
          <Form.Item name="shippingInfo" label="Additional Shipping info">
            <Input.TextArea value={""} />
          </Form.Item>
        )}

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input value={""} />
        </Form.Item>

        <Form.Item
          name="reason"
          label="Reason of purchase"
          rules={[{ required: true, message: "Please select a reason!" }]}
        >
          <Select onChange={setReason} value={""}>
            <Option value="Fault Fix">Fault Fix</Option>
            <Option value="Cable Replacement">Cable Replacement</Option>
            <Option value="Epipolar Failure">Epipolar Failure</Option>
            <Option value="New Sale">New Sale</Option>
            <Option value="Redeployment">Redeployment</Option>
            <Option value="Churn/Return">Churn/Return</Option>
            <Option value="Worn Out">Worn Out</Option>
            <Option value="Research">Research</Option>
            <Option value="New Equipment">New Equipment</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        {reason === "Other" && (
          <Form.Item
            name="specify"
            label="Please specify"
            rules={[{ required: true, message: "Please specify your reason!" }]}
          >
            <Input value={""} />
          </Form.Item>
        )}

        <Form.Item
          name="details"
          label="Details"
          rules={[{ required: true, message: "Please input the details!" }]}
        >
          <Input.TextArea value={""} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Popconfirm
        title={confirmationMessage}
        visible={confirmVisible}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmVisible(false)}
        okText="Yes, all good"
        cancelText="No, let me check"
      />
    </Card>
  );
};

export default RequestForm;
