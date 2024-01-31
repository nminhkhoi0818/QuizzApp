import React, { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AdminTopicList = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const getAllTopics = async () => {
      const { data } = await axios.get("http://localhost:4000/topics", {});
      setTopics(data.topics);
    };
    getAllTopics();
  }, [topics]);

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
    });
  };

  const handleError = (msg) => {
    toast.error(msg, {
      position: "bottom-right",
    });
  };

  const handleDeleteTopic = async (topicId) => {
    const { data } = await axios.post(
      `http://localhost:4000/delete-topic/${topicId}`,
      { withCredentials: true }
    );
    const { success, message } = data;
    if (success) {
      handleSuccess(message);
    } else {
      handleError(message);
    }
  };

  return (
    <>
      <HeaderComponent />
      <div
        className="container-fluid d-flex align-items-center mb-3"
        style={{
          height: "60px",
          width: "100%",
          background: "#FCF8FF",
        }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <p>
            Home / <span style={{ color: "#FFAE41" }}>Topic Management</span>
          </p>
          <Link to={"/admin/topic-management/create"} className="add-topic-btn">
            Create new topic
          </Link>
        </div>
      </div>
      <div className="container-fluid">
        <div className="container">
          <div className="table-header d-flex justify-content-between">
            <span>Topic Name</span>
            <span>Actions</span>
          </div>

          {topics &&
            topics.map((topic, index) => (
              <div
                key={topic._id}
                className="table-data d-flex justify-content-between"
                style={{ borderBottom: "1px solid #DFE1E6" }}
              >
                <span
                  style={{
                    textTransform: "uppercase",
                  }}
                >
                  {index + 1}. {topic.name}
                </span>
                <p style={{ textDecoration: "underline", cursor: "pointer" }}>
                  <Link to={`/admin/topic-management/edit/${topic.name}`}>
                    Edit
                  </Link>{" "}
                  |{" "}
                  <span onClick={() => handleDeleteTopic(topic._id)}>
                    Delete
                  </span>
                </p>
              </div>
            ))}
        </div>
      </div>
      <FooterComponent />
      <ToastContainer />
    </>
  );
};

export default AdminTopicList;
