import React, { Component } from "react";
import PageTitleComponent from "./PageTitleComponent";
import { Row, Col, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { LocalForm, Control } from "react-redux-form"; // Errors
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { Auth } from "../redux/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTimes, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import {
  faEdit,
  faWindowClose,
  faThumbsUp as faThumbsUpRegular,
} from "@fortawesome/free-regular-svg-icons";

function MainBlogPage({
  posts,
  postsLoading,
  postsErrMess,
  resetPostForm,
  addPost,
  auth,
  deletePost,
  updatePost,
  postLike,
  likes,
  removeLike,
}) {
  //console.log(`${posts.posts}`);
  console.log(`isloadingMAIN: ${postsLoading}`);

  const allPosts = posts.map((post) => {
    return (
      <RenderPost
        post={post}
        auth={auth}
        deletePost={deletePost}
        updatePost={updatePost}
        postLike={postLike}
        likes={likes}
        removeLike={removeLike}
      />
    );
  });

  if (postsLoading) {
    console.log("loading");
    <div className="container">
      <div className="row">
        <Loading />
      </div>
    </div>;
  }
  if (postsErrMess) {
    return (
      <div className="container">
        <div className="row">
          <col>
            <h4>{postsErrMess}</h4>;
          </col>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <PageTitleComponent title="Blog" />

      <div className="container-fluid text-center mx-auto">
        <Row>
          <Col xs={12}>
            <AddPostForm
              auth={auth}
              resetPostForm={resetPostForm}
              addPost={addPost}
            />
          </Col>
        </Row>
      </div>
      <div className="container-fluid mx-auto blog-container">{allPosts}</div>
    </React.Fragment>
  );
}

class RenderPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handlePostUpdate = this.handlePostUpdate.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handlePostUpdate(updatedPostContent) {
    this.props.updatePost(this.props.post._id, updatedPostContent);
    this.toggleModal();
  }

  render() {
    return (
      <React.Fragment>
        <Row className="post-row" key={this.props.post._id}>
          <Col>
            <Row style={{ height: "30px" }}>
              <Col xs={10}>
                <h4>{this.props.post.postCreator.username}</h4>
              </Col>
              <Col xs={1}>
                {this.props.auth.isAuthenticated &&
                this.props.auth.user.username ===
                  this.props.post.postCreator.username ? (
                  <Button
                    color="link"
                    onClick={() => this.props.deletePost(this.props.post._id)}
                  >
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                  </Button>
                ) : null}
              </Col>
              <Col xs={1} className="p-0">
                {this.props.auth.isAuthenticated &&
                this.props.auth.user.username ===
                  this.props.post.postCreator.username ? (
                  <Button color="link" onClick={() => this.toggleModal()}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                ) : null}
              </Col>
            </Row>
          </Col>
          <Col className="post-date" xs={12}>
            <p style={{ fontSize: 16 }}>{this.props.post.postDate}</p>
          </Col>
          <Col className="mb-3 mt-2" xs={12} style={{ fontSize: "2px" }}>
            <p>{this.props.post.postContent}</p>
          </Col>
          <Col>
            <p style={{ fontSize: 22 }}>
              <FontAwesomeIcon
                icon={faThumbsUp}
                size="md"
                style={{ marginRight: "5px" }}
              />
              {
                this.props.likes.filter(
                  (like) => like.post._id === this.props.post._id
                ).length
              }
            </p>
          </Col>
          <Col xs={12}>
            <div id="post-header-line"></div>
          </Col>

          <Col className="post-buttons" xs={6} style={{ textAlign: "center" }}>
            {console.log("isAuthenticated", this.props.auth.isAuthenticated)}
            {this.props.auth.isAuthenticated ? (
              this.props.likes
                .filter((like) => like.post._id === this.props.post._id)
                .map((like) => like.liker.username)
                .includes(this.props.auth.user.username) ? (
                <Button
                  color="link"
                  onClick={() => this.props.removeLike(this.props.post._id)}
                >
                  {" "}
                  Unlike
                </Button>
              ) : (
                <Button
                  color="link"
                  onClick={() => this.props.postLike(this.props.post._id)}
                >
                  {/*<FontAwesomeIcon icon={["far", "thumbs-up"]} />*/} Like
                </Button>
              )
            ) : null}
          </Col>
          <Col className="post-buttons" xs={6} style={{ textAlign: "center" }}>
            {this.props.auth.isAuthenticated ? (
              <Button color="link">Comment</Button>
            ) : null}
          </Col>
          <Col xs={12}>
            <div id="post-header-line"></div>
          </Col>
        </Row>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Edit Post</ModalHeader>
          <LocalForm onSubmit={(value) => this.handlePostUpdate(value)}>
            {" "}
            {/*model=".postForm"*/}
            <div className="container-fluid mx-auto">
              <Row className="form-group ">
                <Col xs={12}>
                  <Control.textarea
                    id="postContent"
                    name="postContent"
                    model=".postContent"
                    rows="4"
                    className="form-control mb-2"
                    defaultValue={this.props.post.postContent}
                  />
                </Col>
                <Col xs={12}>
                  <Button type="submit">Post</Button>
                </Col>
              </Row>
            </div>
          </LocalForm>
        </Modal>
      </React.Fragment>
    );
  }
}

/*
<Col>
        {auth.isAuthenticated &&
        auth.user.username === post.postCreator.username ? (
         <Button onClick={() => alert("hello")}>Delete Post</Button>
        ) : null}
      </Col>
*/
class AddPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postType: "Post Type",
      postContent: "",
      isModalOpen: false,
    };
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handlePostSubmit(values) {
    //alert(`New Post: ${JSON.stringify(values)}`);

    this.props.addPost(values.postType, values.postContent);
    this.toggleModal();
    //this.props.resetPostForm(); don't think I need
    //window.location.reload(false);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    return (
      <React.Fragment>
        {this.props.auth.isAuthenticated ? (
          <Button className="create-post-butt" onClick={this.toggleModal}>
            Want to post something?
          </Button>
        ) : null}

        <Modal
          className="create-post-modal"
          isOpen={this.state.isModalOpen}
          toggle={this.toggleModal}
        >
          <ModalHeader toggle={this.toggleModal}>
            <h2 className="text-center">Create Post</h2>
          </ModalHeader>
          <LocalForm onSubmit={(values) => this.handlePostSubmit(values)}>
            {" "}
            {/*model=".postForm"*/}
            <div className="container-fluid mx-auto">
              <Row className="form-group create-post-row">
                <Col xs={12}>
                  <Control.select
                    id="postType"
                    name="postType"
                    model=".postType"
                    className="form-control mb-2"
                  >
                    <option>Post Type</option>
                    <option>Question</option>
                    <option>Advice</option>
                    <option>Other</option>
                  </Control.select>
                </Col>

                <Col xs={12}>
                  <Control.textarea
                    id="postContent"
                    name="postContent"
                    model=".postContent"
                    rows="4"
                    className="form-control mb-2"
                  />
                </Col>
                <Col xs={12}>
                  <Button type="submit">Post</Button>
                </Col>
              </Row>
            </div>
          </LocalForm>
        </Modal>
      </React.Fragment>
    );
  }
}

export default MainBlogPage;
