import React, { useState, useEffect } from "react";
import {
  List,
  Row,
  Col,
  Modal,
  message,
  Button,
  Form,
  Input,
  DatePicker,
} from "antd";
import axios from "axios"; //和数据库进行交互
import servicePath from "../config/apiUrl";
import "../static/css/ArticleList.css";
import "../static/css/EditComment.css";
const { TextArea } = Input;
//解构
const { confirm } = Modal;

function CommentList(props) {
  const [list, setList] = useState([]);
  const [commentId, setCommentId] = useState(0);
  const [visible, setVisible] = useState(false);
  const [commentName, setCommentName] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  // eslint-disable-next-line
  const [commentTime, setCommentTime] = useState(''); //发布日期

  useEffect(() => {
    //模拟生命周期，第一次进入时获取值
    getList();
  }, []);

  const [form] = Form.useForm();

  const getList = () => {
    axios({
      method: "get",
      url: servicePath.getCommentList,
      withCredentials: true,
    }).then((res) => {
      setList(res.data.list);
    });
  };

  //删除评论的方法
  const deleteComment = (id) => {
    confirm({
      title: "确定要删除这条评论吗？",
      content: "如果你点击OK按钮，评论将永远被删除，无法恢复",
      onOk() {
        axios(servicePath.deleteComment + id, { withCredentials: true }).then(
          (res) => {
            message.success("评论删除成功");
            getList(); //重新获取列表
          }
        );
      },
      onCancel() {
        message.success("评论没有任何变化");
      },
    });
  };

  //修改评论的跳转方法
  const updateComment = (id) => {
    // 清空表单
    form.resetFields()
    setCommentId(id);
    getCommentById(id);
    setVisible(true);
  };

  const handleOk = () => {
    if (!commentContent) {
      message.error("必须输入评论内容");
      return false;
    } else if (!commentTime) {
      message.error("发布日期不能为空");
      return false;
    }
    let dataProps = {};
    dataProps.commentName = commentName;
    dataProps.commentContent = commentContent;
    dataProps.commentEmail = commentEmail;
    let dateText = commentTime;
    //  除以1000让时间单位为秒s
    dataProps.commentTime = new Date(dateText).getTime() / 1000;
    dataProps.id = commentId;
    axios({
      method: "post",
      url: servicePath.updateComment,
      data: dataProps,
      withCredentials: true,
    }).then((res) => {
      if (res.data.isSuccess) {
        message.success("留言修改成功");
        getList();
        setVisible(false);
      } else {
        message.error("留言修改失败");
      }
    });
  };

  // 取消
  const handleCancel = () => {
    setVisible(false);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  // 评论内容改变时触发的事件
  const changeContent = (e) => {
    //e接收多行文本框的值
    setCommentContent(e.target.value);
  };

  // 根据评论id获取并反显评论信息
  const getCommentById = (id) => {
    //使用路由守卫用withCredentials
    axios(servicePath.getCommentById + id, { withCredentials: true }).then(
      (res) => {
        let commentInfo = res.data.data[0];
        setCommentName(commentInfo.commentName);
        setCommentContent(commentInfo.commentContent);
        setCommentEmail(commentInfo.commentEmail);
      }
    );
  };
  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={4}>
              <b>评论人</b>
            </Col>
            <Col span={6}>
              <b>评论内容</b>
            </Col>
            <Col span={5}>
              <b>邮箱</b>
            </Col>
            <Col span={4}>
              <b>评论时间</b>
            </Col>
            <Col span={5}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Row className="list-div">
              <Col span={4}>{item.commentName}</Col>
              <Col span={6}>{item.commentContent}</Col>
              <Col span={5}>{item.commentEmail}</Col>
              <Col span={4}>{item.commentTime}</Col>
              <Col span={5}>
                <Button
                  type="primary"
                  onClick={() => {
                    updateComment(item.id);
                  }}
                >
                  修改
                </Button>
                &nbsp;
                <Button
                  onClick={() => {
                    deleteComment(item.id);
                  }}
                >
                  删除
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
      <Modal
        visible={visible}
        title="修改评论信息"
        onOk={handleOk}
        onCancel={handleCancel}
        // getContainer配合Form里的form属性使用
        getContainer={false}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
          >
            确定
          </Button>
        ]}
      >
        {/* From的属性initialValues 输入控件的默认值为initialValue initialValues={{datePicker: ''}}*/}
        <Form {...layout}  form={form} >
          <Form.Item label="评论人">
            <Input disabled value={commentName} />
          </Form.Item>
          <Form.Item label="评论内容">
            <TextArea
              rows={4}
              placeholder="说点什么吧~"
              value={commentContent}
              onChange={changeContent}
            />
          </Form.Item>
          <Form.Item label="邮箱">
            <Input disabled value={commentEmail} />
          </Form.Item>
          {/* name属性必须有 要不然日期不会被清除 */}
          <Form.Item label="发布日期" name="datePicker">
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
    </div>
  );
}

export default CommentList;
