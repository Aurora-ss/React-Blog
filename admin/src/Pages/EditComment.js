import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
const { TextArea } = Input;

function EditComment(props) {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [commentName, setCommentName] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  // eslint-disable-next-line
  const [commentTime, setCommentTime] = useState(); //发布日期

  useEffect(() => {
    //进入函数只执行一次 生命周期函数
    //获取文章id
    let tmpId = props.match.params.id;
    if (tmpId) {
      getCommentById(tmpId);
    }
    // eslint-disable-next-line
  }, [props.match.params.id]);

  const handleOk = () => {
    setLoading(true);
    setVisible(false);
    setLoading(false);
  };

  const handleCancel = () => {
    setVisible(false);
    props.history.push("/index/commentList");
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const getCommentById = (id) => {
    //使用路由守卫用withCredentials
    axios(servicePath.getCommentById + id, { withCredentials: true }).then(
      (res) => {
        let commentInfo = res.data.data[0];
        setCommentName(commentInfo.commentName);
        setCommentContent(commentInfo.commentContent);
        setCommentEmail(commentInfo.commentEmail);
        // setCommentTime(commentInfo.commentTime)
      }
    );
  };

  return (
    <Modal
      visible={visible}
      title="Title"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          确定
        </Button>,
      ]}
    >
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="评论人"
          rules={[{ required: true, message: "请输入您的姓名!" }]}
        >
          <Input disabled value={commentName} />
        </Form.Item>
        <Form.Item
          label="评论内容"
          rules={[{ required: true, message: "请输入您的评论内容!" }]}
        >
          <TextArea rows={4} placeholder="说点什么吧~" value={commentContent} />
        </Form.Item>
        <Form.Item
          label="邮箱"
          rules={[{ required: true, message: "请输入您的邮箱!" }]}
        >
          <Input disabled value={commentEmail} />
        </Form.Item>
        <Form.Item
          label="发布日期"
          rules={[{ required: true, message: "请选择发布日期!" }]}
        >
          <DatePicker
            allowClear
            format="YYYY/MM/DD HH:mm:ss"
            placeholder="请选择发布日期"
            size="large"
            onChange={(date, dateString) => setCommentTime(dateString)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditComment;
