import axios from 'axios';
import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';

import {

  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,

  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS, 

  LOAD_USER_POSTS_FAILURE, 
  LOAD_USER_POSTS_REQUEST, 
  LOAD_USER_POSTS_SUCCESS,

  COOK_UP_REQUEST,
  COOK_UP_SUCCESS,
  COOK_UP_FAILURE,
  
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,

  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,

  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,

  FLFOOD_UP_REQUEST,
  FLFOOD_UP_SUCCESS,
  FLFOOD_UP_FAILURE,

  DELETE_FLFOOD_UP_REQUEST,
  DELETE_FLFOOD_UP_SUCCESS,
  DELETE_FLFOOD_UP_FAILURE,

  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,

  INITIAL_FAILURE, 
  INITIAL_REQUEST, 
  INITIAL_SUCCESS,

  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,

  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,

  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,

  REMOVE_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,

  EDIT_COMMENT_FAILURE,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,

} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';


function uploadImagesAPI(data) {
  return axios.post('/post/images', data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function unlikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}



function loadPostAPI(data) {
  return axios.get(`/post/${data}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}


function loadUserPostsAPI(data, lastId) {
 
  return axios.get(`/posts/my/postss?lastId=${lastId || 0}`);
}


function* loadUserPosts(action) {
  try {
 
    const result = yield call(loadUserPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostsAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.lastId);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}



function cookUpAPI(data, lastId) {
  return axios.post(`/posts/cookup/postss?lastId=${lastId || 0}`, data);
}

function* cookupPost(action) {
  try {
    console.log("action.lastId",action);
    const result = yield call(cookUpAPI, action.data, action.lastId);
    yield put({
      type: COOK_UP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: COOK_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function flfoodUpAPI(data) {
  
  return axios.get('/posts/related', data);
}

function* flfoodPost(action) {
  try {
    const result = yield call(flfoodUpAPI, action.data);
    yield put({
      type: FLFOOD_UP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FLFOOD_UP_FAILURE,
      error: err.response.data,
    });
  }
}


function* DeleteflfoodPost(action) {
  try {
    const result = action.data;
    yield put({
      type: DELETE_FLFOOD_UP_SUCCESS,
      data: result,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_FLFOOD_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function addPostAPI(action) {
  return axios.post('/post', action);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}


function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data); // POST /post/1/comment
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}



function* intial(action) {
  try {
    const result = [];
    yield put({
      type: INITIAL_SUCCESS,
      data: result,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INITIAL_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}



function updatePostAPI(data) {
  return axios.patch(`/post/${data.PostId}`, data);
}

function* updatePost(action) {
  try {
   
    const result = yield call(updatePostAPI, action.data);
    console.log("result:",result);
    yield put({
      type: UPDATE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadHashtagPostsAPI(data, lastId) {
  return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}

function* loadHashtagPosts(action) {
  try {
    console.log("action:::",action);
    console.log('loadHashtag console');
    const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}



function commentremovePostAPI(data) {
  return axios.post(`/post/removecomment/`,data);
}

function* commentremovePost(action) {
  try {
    const result = yield call(commentremovePostAPI, action.data);
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}




function EditCommenPostAPI(data) {
  return axios.patch(`/post/editcomment/`,data);
}

function* EditCommentPosts(action) {
  try {
    //  console.log("action:",action);
    const result = yield call(EditCommenPostAPI, action.data);
    console.log("result:::",result);
    yield put({
      type:EDIT_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EDIT_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}








function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}


function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchLoadUserPosts() {
  yield throttle(5000, LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchCookupPosts() {
  yield throttle(1000, COOK_UP_REQUEST, cookupPost);
}

function* watchFlfoodupPosts() {
  yield throttle(5000, FLFOOD_UP_REQUEST, flfoodPost);
}

function* watchDeleteFlfoodupPosts() {
  yield throttle(5000, DELETE_FLFOOD_UP_REQUEST, DeleteflfoodPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchintial() {
  yield takeLatest(INITIAL_REQUEST, intial);
}


function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}


function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}

function* watchLoadHashtagPosts() {
  yield throttle(5000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

function* watchCommentRemovePost() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, commentremovePost);
}

function* watchEditCommentPost() {
  yield takeLatest(EDIT_COMMENT_REQUEST, EditCommentPosts);
}



export default function* postSaga() {
  yield all([
    fork(watchUploadImages),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchLoadUserPosts),
    fork(watchLoadPosts),
    fork(watchCookupPosts),
    fork(watchFlfoodupPosts),
    fork(watchDeleteFlfoodupPosts),
    fork(watchAddComment),
    fork(watchintial),
    fork(watchRemovePost),
    fork(watchUpdatePost),
    fork(watchLoadHashtagPosts),
    fork(watchCommentRemovePost),
    fork(watchEditCommentPost),
  ]);
}



















// import axios from 'axios';
// import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';

// import {

//   ADD_POST_FAILURE,
//   ADD_POST_REQUEST,
//   ADD_POST_SUCCESS,
  
//   LOAD_POST_FAILURE,
//   LOAD_POST_REQUEST,
//   LOAD_POST_SUCCESS,

//   LOAD_POSTS_FAILURE,
//   LOAD_POSTS_REQUEST,
//   LOAD_POSTS_SUCCESS, 

//   LOAD_USER_POSTS_FAILURE, 
//   LOAD_USER_POSTS_REQUEST, 
//   LOAD_USER_POSTS_SUCCESS,

//   COOK_UP_REQUEST,
//   COOK_UP_SUCCESS,
//   COOK_UP_FAILURE,
  
//   UPLOAD_IMAGES_FAILURE,
//   UPLOAD_IMAGES_REQUEST,
//   UPLOAD_IMAGES_SUCCESS,

//   LIKE_POST_FAILURE,
//   LIKE_POST_REQUEST,
//   LIKE_POST_SUCCESS,

//   UNLIKE_POST_FAILURE,
//   UNLIKE_POST_REQUEST,
//   UNLIKE_POST_SUCCESS,

//   FLFOOD_UP_REQUEST,
//   FLFOOD_UP_SUCCESS,
//   FLFOOD_UP_FAILURE,

//   DELETE_FLFOOD_UP_REQUEST,
//   DELETE_FLFOOD_UP_SUCCESS,
//   DELETE_FLFOOD_UP_FAILURE,

//   ADD_COMMENT_FAILURE,
//   ADD_COMMENT_REQUEST,
//   ADD_COMMENT_SUCCESS,

//   INITIAL_FAILURE, 
//   INITIAL_REQUEST, 
//   INITIAL_SUCCESS,

//   REMOVE_POST_FAILURE,
//   REMOVE_POST_REQUEST,
//   REMOVE_POST_SUCCESS,

//   UPDATE_POST_FAILURE,
//   UPDATE_POST_REQUEST,
//   UPDATE_POST_SUCCESS,

//   LOAD_HASHTAG_POSTS_FAILURE,
//   LOAD_HASHTAG_POSTS_REQUEST,
//   LOAD_HASHTAG_POSTS_SUCCESS,

//   REMOVE_COMMENT_FAILURE,
//   REMOVE_COMMENT_REQUEST,
//   REMOVE_COMMENT_SUCCESS,

// } from '../reducers/post';
// import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';


// function uploadImagesAPI(data) {
//   return axios.post('/post/images', data);
// }

// function* uploadImages(action) {
//   try {
//     const result = yield call(uploadImagesAPI, action.data);
//     yield put({
//       type: UPLOAD_IMAGES_SUCCESS,
//       data: result.data,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: UPLOAD_IMAGES_FAILURE,
//       error: err.response.data,
//     });
//   }
// }

// function likePostAPI(data) {
//   return axios.patch(`/post/${data}/like`);
// }

// function* likePost(action) {
//   try {
//     const result = yield call(likePostAPI, action.data);
//     yield put({
//       type: LIKE_POST_SUCCESS,
//       data: result.data,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: LIKE_POST_FAILURE,
//       error: err.response.data,
//     });
//   }
// }

// function unlikePostAPI(data) {
//   return axios.delete(`/post/${data}/like`);
// }

// function* unlikePost(action) {
//   try {
//     const result = yield call(unlikePostAPI, action.data);
//     yield put({
//       type: UNLIKE_POST_SUCCESS,
//       data: result.data,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: UNLIKE_POST_FAILURE,
//       error: err.response.data,
//     });
//   }
// }



// function loadPostAPI(data) {
//   return axios.get(`/post/${data}`);
// }

// function* loadPost(action) {
//   try {
//     const result = yield call(loadPostAPI, action.data);
//     yield put({
//       type: LOAD_POST_SUCCESS,
//       data: result.data,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: LOAD_POST_FAILURE,
//       error: err.response.data,
//     });
//   }
// }


// function loadUserPostsAPI(data, lastId) {
 
//   return axios.get(`/posts/my/postss?lastId=${lastId || 0}`);
// }


// function* loadUserPosts(action) {
//   try {
 
//     const result = yield call(loadUserPostsAPI, action.data, action.lastId);
//     yield put({
//       type: LOAD_USER_POSTS_SUCCESS,
//       data: result.data,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: LOAD_USER_POSTS_FAILURE,
//       error: err.response.data,
//     });
//   }
// }

// function loadPostsAPI(lastId) {
//   return axios.get(`/posts?lastId=${lastId || 0}`);
// }

// function* loadPosts(action) {
//   try {
//     const result = yield call(loadPostsAPI, action.lastId);
//     yield put({
//       type: LOAD_POSTS_SUCCESS,
//       data: result.data,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: LOAD_POSTS_FAILURE,
//       error: err.response.data,
//     });
//   }
// }



// function cookUpAPI(data, lastId) {
//   return axios.post(`/posts/cookup/postss?lastId=${lastId || 0}`, data);
// }

// function* cookupPost(action) {
//   try {
//     console.log("action.lastId",action);
//     const result = yield call(cookUpAPI, action.data, action.lastId);
//     yield put({
//       type: COOK_UP_SUCCESS,
//       data: result.data,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: COOK_UP_FAILURE,
//       error: err.response.data,
//     });
//   }
// }

// function flfoodUpAPI(data) {
  
//   return axios.get('/posts/related', data);
// }

// function* flfoodPost(action) {
//   try {
//     const result = yield call(flfoodUpAPI, action.data);
//     yield put({
//       type: FLFOOD_UP_SUCCESS,
//       data: result.data,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: FLFOOD_UP_FAILURE,
//       error: err.response.data,
//     });
//   }
// }


// function* DeleteflfoodPost(action) {
//   try {
//     const result = action.data;
//     yield put({
//       type: DELETE_FLFOOD_UP_SUCCESS,
//       data: result,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: DELETE_FLFOOD_UP_FAILURE,
//       error: err.response.data,
//     });
//   }
// }

// function addPostAPI(action) {
//   return axios.post('/post', action);
// }

// function* addPost(action) {
//   try {
//     const result = yield call(addPostAPI, action);
//     yield put({
//       type: ADD_POST_SUCCESS,
//       data: result.data,
//     });
//     yield put({
//       type: ADD_POST_TO_ME,
//       data: result.data.id,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: ADD_POST_FAILURE,
//       error: err.response.data,
//     });
//   }
// }


// function addCommentAPI(data) {
//   return axios.post(`/post/${data.postId}/comment`, data); // POST /post/1/comment
// }

// function* addComment(action) {
//   try {
//     const result = yield call(addCommentAPI, action.data);
//     yield put({
//       type: ADD_COMMENT_SUCCESS,
//       data: result.data,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: ADD_COMMENT_FAILURE,
//       error: err.response.data,
//     });
//   }
// }



// function* intial(action) {
//   try {
//     const result = [];
//     yield put({
//       type: INITIAL_SUCCESS,
//       data: result,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: INITIAL_FAILURE,
//       error: err.response.data,
//     });
//   }
// }

// function removePostAPI(data) {
//   return axios.delete(`/post/${data}`);
// }

// function* removePost(action) {
//   try {
//     const result = yield call(removePostAPI, action.data);
//     yield put({
//       type: REMOVE_POST_SUCCESS,
//       data: result.data,
//     });
//     yield put({
//       type: REMOVE_POST_OF_ME,
//       data: action.data,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: REMOVE_POST_FAILURE,
//       error: err.response.data,
//     });
//   }
// }



// function updatePostAPI(data) {
//   return axios.patch(`/post/${data.PostId}`, data);
// }

// function* updatePost(action) {
//   try {
   
//     const result = yield call(updatePostAPI, action.data);
//     console.log("result:",result);
//     yield put({
//       type: UPDATE_POST_SUCCESS,
//       data: result.data,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: UPDATE_POST_FAILURE,
//       error: err.response.data,
//     });
//   }
// }

// function loadHashtagPostsAPI(data, lastId) {
//   return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
// }

// function* loadHashtagPosts(action) {
//   try {
//     console.log("action:::",action);
//     console.log('loadHashtag console');
//     const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
//     yield put({
//       type: LOAD_HASHTAG_POSTS_SUCCESS,
//       data: result.data,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: LOAD_HASHTAG_POSTS_FAILURE,
//       error: err.response.data,
//     });
//   }
// }



// function commentremovePostAPI(data) {
//   return axios.post(`/post/removecomment/`,data);
// }

// function* commentremovePost(action) {
//   try {
//     const result = yield call(commentremovePostAPI, action.data);
//     console.log("result:::",result);
//     yield put({
//       type: REMOVE_COMMENT_SUCCESS,
//       data: result.data,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: REMOVE_COMMENT_FAILURE,
//       error: err.response.data,
//     });
//   }
// }




// function* watchUploadImages() {
//   yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
// }


// function* watchLoadPost() {
//   yield takeLatest(LOAD_POST_REQUEST, loadPost);
// }

// function* watchLikePost() {
//   yield takeLatest(LIKE_POST_REQUEST, likePost);
// }

// function* watchUnlikePost() {
//   yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
// }

// function* watchAddPost() {
//   yield takeLatest(ADD_POST_REQUEST, addPost);
// }

// function* watchLoadUserPosts() {
//   yield throttle(5000, LOAD_USER_POSTS_REQUEST, loadUserPosts);
// }

// function* watchLoadPosts() {
//   yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
// }

// function* watchCookupPosts() {
//   yield throttle(1000, COOK_UP_REQUEST, cookupPost);
// }

// function* watchFlfoodupPosts() {
//   yield throttle(5000, FLFOOD_UP_REQUEST, flfoodPost);
// }

// function* watchDeleteFlfoodupPosts() {
//   yield throttle(5000, DELETE_FLFOOD_UP_REQUEST, DeleteflfoodPost);
// }

// function* watchAddComment() {
//   yield takeLatest(ADD_COMMENT_REQUEST, addComment);
// }

// function* watchintial() {
//   yield takeLatest(INITIAL_REQUEST, intial);
// }


// function* watchRemovePost() {
//   yield takeLatest(REMOVE_POST_REQUEST, removePost);
// }


// function* watchUpdatePost() {
//   yield takeLatest(UPDATE_POST_REQUEST, updatePost);
// }

// function* watchLoadHashtagPosts() {
//   yield throttle(5000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
// }

// function* watchCommentRemovePost() {
//   yield takeLatest(REMOVE_COMMENT_REQUEST, commentremovePost);
// }


// export default function* postSaga() {
//   yield all([
//     fork(watchUploadImages),
//     fork(watchLikePost),
//     fork(watchUnlikePost),
//     fork(watchLoadPost),
//     fork(watchAddPost),
//     fork(watchLoadUserPosts),
//     fork(watchLoadPosts),
//     fork(watchCookupPosts),
//     fork(watchFlfoodupPosts),
//     fork(watchDeleteFlfoodupPosts),
//     fork(watchAddComment),
//     fork(watchintial),
//     fork(watchRemovePost),
//     fork(watchUpdatePost),
//     fork(watchLoadHashtagPosts),
//     fork(watchCommentRemovePost),
//   ]);
// }









