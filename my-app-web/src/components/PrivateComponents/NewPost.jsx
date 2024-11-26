import React, { useContext, useState } from "react";
import "../../styles/newPostComponent.css";
import "../../styles/profile.css";
import { BsThreeDots } from "react-icons/bs";
import TextArea from "antd/es/input/TextArea";
import { Button } from "antd";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const NewPost = ({ user, setLoading }) => {
  const { authToken, posts, setPosts } = useContext(AppContext);
  const [content, setContent] = useState("");

  const createNewPost = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/posts/create",
        { content: content, imageUrl: null },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const newPost = response.data.newPost;

      setContent("");

      const prevPosts = JSON.parse(localStorage.getItem("posts"));

      const updateData = {
        ...prevPosts,
        totalPosts: prevPosts.totalPosts + 1,
        posts: [newPost, ...prevPosts.posts],
      };

      localStorage.setItem("posts", JSON.stringify(updateData));
      setTimeout(() => {
        setPosts(updateData);
      }, 950);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <form
      className="profile-screen-post-container"
      style={{ border: "1px solid transparent" }}
    >
      {/*Post header*/}
      <div className="profile-screen-post-header">
        <div className="profile-screen-post-header-user-data">
          <div className="profile-screen-post-header-user-data-img"></div>
          <div className="profile-screen-post-header-user-data-username-container">
            <span>
              {user.name} {user.lastname}
            </span>
            <span style={{ fontSize: "13px" }}>@{user.username}</span>
          </div>
        </div>
      </div>
      <TextArea
        placeholder="Escribe algo.."
        style={{ marginTop: 15 }}
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <Button
        type="primary"
        style={{ marginTop: 15 }}
        disabled={content.trim() === ""}
        onClick={createNewPost}
      >
        Publicar
      </Button>
    </form>
  );
};

export default NewPost;
