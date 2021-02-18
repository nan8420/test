import produce from '../util/produce';


export const initialState = {
  cookUp:[],
  myFood : [],
  mainPosts: [],
  hashtagfood : [],
  singlePost: null,
  imagePaths: [],
  followingfood: [],
  hasMorePosts: true,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
};

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';


export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const COOK_UP_REQUEST = "COOK_UP_REQUEST";
export const COOK_UP_SUCCESS = "COOK_UP_SUCCESS";
export const COOK_UP_FAILURE = "COOK_UP_FAILURE";


export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const FLFOOD_UP_REQUEST = "FLFOOD_UP_REQUEST";
export const FLFOOD_UP_SUCCESS = "FLFOOD_UP_SUCCESS";
export const FLFOOD_UP_FAILURE = "FLFOOD_UP_FAILURE";

export const DELETE_FLFOOD_UP_REQUEST = "DELETE_FLFOOD_UP_REQUEST";
export const DELETE_FLFOOD_UP_SUCCESS = "DELETE_FLFOOD_UP_SUCCESS";
export const DELETE_FLFOOD_UP_FAILURE = "DELETE_FLFOOD_UP_FAILURE";

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const INITIAL_FAILURE = 'INITIAL_FAILURE';
export const INITIAL_REQUEST = 'INITIAL_REQUEST';
export const INITIAL_SUCCESS = 'INITIAL_SUCCESS';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE';


 
export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});


// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
   

    case REMOVE_IMAGE:
      draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
      break;
    
    case UPLOAD_IMAGES_REQUEST:
      draft.uploadImagesLoading = true;
      draft.uploadImagesDone = false;
      draft.uploadImagesError = null;
      break;
    case UPLOAD_IMAGES_SUCCESS: {
      draft.imagePaths = draft.imagePaths.concat(action.data);
      draft.uploadImagesLoading = false;
      draft.uploadImagesDone = true;
      break;
    }
    case UPLOAD_IMAGES_FAILURE:
      draft.uploadImagesLoading = false;
      draft.uploadImagesError = action.error;
      break;
    
      case LIKE_POST_REQUEST:
      draft.likePostLoading = true;
      draft.likePostDone = false;
      draft.likePostError = null;
      break;

      case LIKE_POST_SUCCESS: {
      const post = draft.singlePost
      post.Likers.push({ id: action.data.UserId });
      draft.likePostLoading = false;
      draft.likePostDone = true;
      break;
      }
      
    case LIKE_POST_FAILURE:
      draft.likePostLoading = false;
      draft.likePostError = action.error;
      break;
    case UNLIKE_POST_REQUEST:
      draft.unlikePostLoading = true;
      draft.unlikePostDone = false;
      draft.unlikePostError = null;
      break;
    case UNLIKE_POST_SUCCESS: {
      const post = draft.singlePost
      post.Likers.pop({ id: action.data.UserId });
      draft.unlikePostLoading = false;
      draft.unlikePostDone = true;
      break;
    }
    case UNLIKE_POST_FAILURE:
      draft.unlikePostLoading = false;
      draft.unlikePostError = action.error;
      break;
      
    case LOAD_POST_REQUEST:
      draft.loadPostLoading = true;
      draft.loadPostDone = false;
      draft.loadPostError = null;
      break;
    case LOAD_POST_SUCCESS:
      draft.loadPostLoading = false;
      draft.loadPostDone = true;
      draft.singlePost = action.data;
      break;
    case LOAD_POST_FAILURE:
      draft.loadPostLoading = false;
      draft.loadPostError = action.error;
      break;
   
    case LOAD_POSTS_REQUEST:
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;
   
    case LOAD_POSTS_SUCCESS:
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      draft.mainPosts = draft.mainPosts.concat(action.data);
      draft.hasMorePosts = action.data.length === 10;
      break;


      case LOAD_USER_POSTS_REQUEST:
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;

      case LOAD_USER_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.myFood = draft.myFood.concat(action.data);
        draft.followingfood = [];
        draft.cookUp = [];
        draft.hasMorePosts = action.data.length === 10;
        break;


      case COOK_UP_REQUEST:  
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;

      case COOK_UP_SUCCESS: 
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      draft.cookUp = draft.cookUp.concat(action.data);
      draft.hasMorePosts = action.data.length === 10 ;
      break;

      case COOK_UP_FAILURE:   
      draft.loadPostsLoading = false;
      draft.loadPostsError = action.error;
      break;

     
    case LOAD_USER_POSTS_FAILURE:
    case LOAD_POSTS_FAILURE:
      draft.loadPostsLoading = false;
      draft.loadPostsError = action.error;
      break;

      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;



        case FLFOOD_UP_REQUEST:  
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;

        case FLFOOD_UP_SUCCESS: 
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.followingfood = draft.followingfood.concat(action.data);
        draft.myFood = [];
        draft.cookUp = [];
        draft.hasMorePosts = action.data.length === 10;
        break;

        case FLFOOD_UP_FAILURE:   
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;

        case DELETE_FLFOOD_UP_REQUEST:  
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;

        case DELETE_FLFOOD_UP_SUCCESS: 
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.followingfood = draft.followingfood.filter((v) => v.id !== action.data);
        // draft.followingfood = action.data;
        draft.hasMorePosts = action.data.length === 10;
        break;

        case DELETE_FLFOOD_UP_FAILURE:   
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
    
        case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;

        case ADD_COMMENT_SUCCESS: {
        const post = draft.singlePost
        post.Comments.push(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;

        }

        case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;


      case INITIAL_REQUEST:
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;

      case INITIAL_SUCCESS:
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      draft.myFood = [];
      draft.followingfood = [];
      draft.cookUp = [];
      draft.hashtagfood = [];
      draft.hasMorePosts = action.data.length === 10;
      break;

      case INITIAL_FAILURE:
      draft.loadPostsLoading = false;
      draft.loadPostsError = action.error;
      break;
      
      case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null;
      break;
    case REMOVE_POST_SUCCESS:
      draft.removePostLoading = false;
      draft.removePostDone = true;
      draft.myFood = draft.myFood.filter((v) => v.id !== action.data.PostId);
      break;
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false;
      draft.removePostError = action.error;
      break;

    case UPDATE_POST_REQUEST:
    draft.updatePostLoading = true;
    draft.updatePostDone = false;
    draft.updatePostError = null;
    break;


     case UPDATE_POST_SUCCESS:
    draft.updatePostLoading = false;
    draft.updatePostDone = true;
    draft.myFood.find((v) => v.id === action.data.PostId).name = action.data.name;
    draft.myFood.find((v) => v.id === action.data.PostId).content1 = action.data.content1;
    draft.myFood.find((v) => v.id === action.data.PostId).content2 = action.data.content2;
    draft.myFood.find((v) => v.id === action.data.PostId).content3 = action.data.content3;
    draft.myFood.find((v) => v.id === action.data.PostId).recipe = action.data.recipe;
   
    break;
  

    // case UPDATE_POST_SUCCESS:
    // draft.updatePostLoading = false;
    // draft.updatePostDone = true;
    // draft.myFood.find((v) => v.id === action.data.PostId).content = action.data.content;
    // break;
    case UPDATE_POST_FAILURE:
    draft.updatePostLoading = false;
    draft.updatePostError = action.error;
    break;

   
    case LOAD_HASHTAG_POSTS_REQUEST:
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;
  
    case LOAD_HASHTAG_POSTS_SUCCESS:
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      draft.hashtagfood = draft.hashtagfood.concat(action.data);
      draft.hasMorePosts = action.data.length === 10;
      break;

   
    case LOAD_HASHTAG_POSTS_FAILURE:
      draft.loadPostsLoading = false;
      draft.loadPostsError = action.error;
      break;

    case REMOVE_COMMENT_REQUEST:
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null;
   break;

   case REMOVE_COMMENT_SUCCESS:
      draft.removePostLoading = false;
      draft.singlePost.Comments = draft.singlePost.Comments.filter((v, i) => v.id !== action.data.commentId )
  
      draft.removePostDone = true;
    break;


    case REMOVE_COMMENT_SUCCESS:
      draft.removePostLoading = false;
      draft.removePostError = action.error;
      break;



     case EDIT_COMMENT_FAILURE:
      draft.updatePostLoading = false;
      draft.updatePostError = action.error;
     break;

     case EDIT_COMMENT_REQUEST:
      draft.updatePostLoading = true;
      draft.updatePostDone = false;
      draft.updatePostError = null;
     break;

     case EDIT_COMMENT_SUCCESS:
      draft.updatePostLoading = false;
     draft.singlePost.Comments.find((v, i) => v.id === action.data.commentId).content = action.data.content;
      draft.updatePostDone = true;
     break;


      
    }
});

   
export default reducer;



















// import produce from '../util/produce';

// export const initialState = {
//   cookUp:[],
//   myFood : [],
//   mainPosts: [],
//   hashtagfood : [],
//   singlePost: null,
//   imagePaths: [],
//   followingfood: [],
//   hasMorePosts: true,
//   likePostLoading: false,
//   likePostDone: false,
//   likePostError: null,
//   unlikePostLoading: false,
//   unlikePostDone: false,
//   unlikePostError: null,
//   loadPostLoading: false,
//   loadPostDone: false,
//   loadPostError: null,
//   loadPostsLoading: false,
//   loadPostsDone: false,
//   loadPostsError: null,
//   addPostLoading: false,
//   addPostDone: false,
//   addPostError: null,
//   updatePostLoading: false,
//   updatePostDone: false,
//   updatePostError: null,
//   removePostLoading: false,
//   removePostDone: false,
//   removePostError: null,
//   addCommentLoading: false,
//   addCommentDone: false,
//   addCommentError: null,
//   uploadImagesLoading: false,
//   uploadImagesDone: false,
//   uploadImagesError: null,
//   retweetLoading: false,
//   retweetDone: false,
//   retweetError: null,
// };

// export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
// export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
// export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

// export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
// export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
// export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

// export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
// export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
// export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

// export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
// export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
// export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

// export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
// export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
// export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';


// export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
// export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
// export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

// export const COOK_UP_REQUEST = "COOK_UP_REQUEST";
// export const COOK_UP_SUCCESS = "COOK_UP_SUCCESS";
// export const COOK_UP_FAILURE = "COOK_UP_FAILURE";


// export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
// export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
// export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

// export const FLFOOD_UP_REQUEST = "FLFOOD_UP_REQUEST";
// export const FLFOOD_UP_SUCCESS = "FLFOOD_UP_SUCCESS";
// export const FLFOOD_UP_FAILURE = "FLFOOD_UP_FAILURE";

// export const DELETE_FLFOOD_UP_REQUEST = "DELETE_FLFOOD_UP_REQUEST";
// export const DELETE_FLFOOD_UP_SUCCESS = "DELETE_FLFOOD_UP_SUCCESS";
// export const DELETE_FLFOOD_UP_FAILURE = "DELETE_FLFOOD_UP_FAILURE";

// export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
// export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
// export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

// export const INITIAL_FAILURE = 'INITIAL_FAILURE';
// export const INITIAL_REQUEST = 'INITIAL_REQUEST';
// export const INITIAL_SUCCESS = 'INITIAL_SUCCESS';

// export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
// export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
// export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

// export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
// export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
// export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

// export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
// export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
// export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

 
// export const REMOVE_IMAGE = 'REMOVE_IMAGE';

// export const addComment = (data) => ({
//   type: ADD_COMMENT_REQUEST,
//   data,
// });


// // 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
// const reducer = (state = initialState, action) => produce(state, (draft) => {
//   switch (action.type) {
   

//     case REMOVE_IMAGE:
//       draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
//       break;
    
//     case UPLOAD_IMAGES_REQUEST:
//       draft.uploadImagesLoading = true;
//       draft.uploadImagesDone = false;
//       draft.uploadImagesError = null;
//       break;
//     case UPLOAD_IMAGES_SUCCESS: {
//       draft.imagePaths = draft.imagePaths.concat(action.data);
//       draft.uploadImagesLoading = false;
//       draft.uploadImagesDone = true;
//       break;
//     }
//     case UPLOAD_IMAGES_FAILURE:
//       draft.uploadImagesLoading = false;
//       draft.uploadImagesError = action.error;
//       break;
    
//       case LIKE_POST_REQUEST:
//       draft.likePostLoading = true;
//       draft.likePostDone = false;
//       draft.likePostError = null;
//       break;

//       case LIKE_POST_SUCCESS: {
//       const post = draft.singlePost
//       post.Likers.push({ id: action.data.UserId });
//       draft.likePostLoading = false;
//       draft.likePostDone = true;
//       break;
//       }
      
//     case LIKE_POST_FAILURE:
//       draft.likePostLoading = false;
//       draft.likePostError = action.error;
//       break;
//     case UNLIKE_POST_REQUEST:
//       draft.unlikePostLoading = true;
//       draft.unlikePostDone = false;
//       draft.unlikePostError = null;
//       break;
//     case UNLIKE_POST_SUCCESS: {
//       const post = draft.singlePost
//       post.Likers.pop({ id: action.data.UserId });
//       draft.unlikePostLoading = false;
//       draft.unlikePostDone = true;
//       break;
//     }
//     case UNLIKE_POST_FAILURE:
//       draft.unlikePostLoading = false;
//       draft.unlikePostError = action.error;
//       break;
      
//     case LOAD_POST_REQUEST:
//       draft.loadPostLoading = true;
//       draft.loadPostDone = false;
//       draft.loadPostError = null;
//       break;
//     case LOAD_POST_SUCCESS:
//       draft.loadPostLoading = false;
//       draft.loadPostDone = true;
//       draft.singlePost = action.data;
//       break;
//     case LOAD_POST_FAILURE:
//       draft.loadPostLoading = false;
//       draft.loadPostError = action.error;
//       break;
   
//     case LOAD_POSTS_REQUEST:
//       draft.loadPostsLoading = true;
//       draft.loadPostsDone = false;
//       draft.loadPostsError = null;
//       break;
   
//     case LOAD_POSTS_SUCCESS:
//       draft.loadPostsLoading = false;
//       draft.loadPostsDone = true;
//       draft.mainPosts = draft.mainPosts.concat(action.data);
//       draft.hasMorePosts = action.data.length === 10;
//       break;


//       case LOAD_USER_POSTS_REQUEST:
//       draft.loadPostsLoading = true;
//       draft.loadPostsDone = false;
//       draft.loadPostsError = null;
//       break;

//       case LOAD_USER_POSTS_SUCCESS:
//         draft.loadPostsLoading = false;
//         draft.loadPostsDone = true;
//         draft.myFood = draft.myFood.concat(action.data);
//         draft.followingfood = [];
//         draft.cookUp = [];
//         draft.hasMorePosts = action.data.length === 10;
//         break;


//       case COOK_UP_REQUEST:  
//       draft.loadPostsLoading = true;
//       draft.loadPostsDone = false;
//       draft.loadPostsError = null;
//       break;

//       case COOK_UP_SUCCESS: 
//       draft.loadPostsLoading = false;
//       draft.loadPostsDone = true;
//       draft.cookUp = draft.cookUp.concat(action.data);
//       draft.hasMorePosts = action.data.length === 10 ;
//       break;

//       case COOK_UP_FAILURE:   
//       draft.loadPostsLoading = false;
//       draft.loadPostsError = action.error;
//       break;

     
//     case LOAD_USER_POSTS_FAILURE:
//     case LOAD_POSTS_FAILURE:
//       draft.loadPostsLoading = false;
//       draft.loadPostsError = action.error;
//       break;

//       case ADD_POST_REQUEST:
//         draft.addPostLoading = true;
//         draft.addPostDone = false;
//         draft.addPostError = null;
//         break;
//       case ADD_POST_SUCCESS:
//         draft.addPostLoading = false;
//         draft.addPostDone = true;
//         draft.mainPosts.unshift(action.data);
//         draft.imagePaths = [];
//         break;
//       case ADD_POST_FAILURE:
//         draft.addPostLoading = false;
//         draft.addPostError = action.error;
//         break;



//         case FLFOOD_UP_REQUEST:  
//         draft.loadPostsLoading = true;
//         draft.loadPostsDone = false;
//         draft.loadPostsError = null;
//         break;

//         case FLFOOD_UP_SUCCESS: 
//         draft.loadPostsLoading = false;
//         draft.loadPostsDone = true;
//         draft.followingfood = draft.followingfood.concat(action.data);
//         draft.myFood = [];
//         draft.cookUp = [];
//         draft.hasMorePosts = action.data.length === 10;
//         break;

//         case FLFOOD_UP_FAILURE:   
//         draft.loadPostsLoading = false;
//         draft.loadPostsError = action.error;
//         break;

//         case DELETE_FLFOOD_UP_REQUEST:  
//         draft.loadPostsLoading = true;
//         draft.loadPostsDone = false;
//         draft.loadPostsError = null;
//         break;

//         case DELETE_FLFOOD_UP_SUCCESS: 
//         draft.loadPostsLoading = false;
//         draft.loadPostsDone = true;
//         draft.followingfood = draft.followingfood.filter((v) => v.id !== action.data);
//         // draft.followingfood = action.data;
//         draft.hasMorePosts = action.data.length === 10;
//         break;

//         case DELETE_FLFOOD_UP_FAILURE:   
//         draft.loadPostsLoading = false;
//         draft.loadPostsError = action.error;
//         break;
    
//         case ADD_COMMENT_REQUEST:
//         draft.addCommentLoading = true;
//         draft.addCommentDone = false;
//         draft.addCommentError = null;
//         break;

//         case ADD_COMMENT_SUCCESS: {
//         const post = draft.singlePost
//         post.Comments.push(action.data);
//         draft.addCommentLoading = false;
//         draft.addCommentDone = true;
//         break;

//         }

//         case ADD_COMMENT_FAILURE:
//         draft.addCommentLoading = false;
//         draft.addCommentError = action.error;
//         break;


//       case INITIAL_REQUEST:
//       draft.loadPostsLoading = true;
//       draft.loadPostsDone = false;
//       draft.loadPostsError = null;
//       break;

//       case INITIAL_SUCCESS:
//       draft.loadPostsLoading = false;
//       draft.loadPostsDone = true;
//       draft.myFood = [];
//       draft.followingfood = [];
//       draft.cookUp = [];
//       draft.hashtagfood = [];
//       draft.hasMorePosts = action.data.length === 10;
//       break;

//       case INITIAL_FAILURE:
//       draft.loadPostsLoading = false;
//       draft.loadPostsError = action.error;
//       break;
      
//       case REMOVE_POST_REQUEST:
//       draft.removePostLoading = true;
//       draft.removePostDone = false;
//       draft.removePostError = null;
//       break;
//     case REMOVE_POST_SUCCESS:
//       draft.removePostLoading = false;
//       draft.removePostDone = true;
//       draft.myFood = draft.myFood.filter((v) => v.id !== action.data.PostId);
//       break;
//     case REMOVE_POST_FAILURE:
//       draft.removePostLoading = false;
//       draft.removePostError = action.error;
//       break;

//     case UPDATE_POST_REQUEST:
//     draft.updatePostLoading = true;
//     draft.updatePostDone = false;
//     draft.updatePostError = null;
//     break;


//      case UPDATE_POST_SUCCESS:
//     draft.updatePostLoading = false;
//     draft.updatePostDone = true;
//     draft.myFood.find((v) => v.id === action.data.PostId).name = action.data.name;
//     draft.myFood.find((v) => v.id === action.data.PostId).content1 = action.data.content1;
//     draft.myFood.find((v) => v.id === action.data.PostId).content2 = action.data.content2;
//     draft.myFood.find((v) => v.id === action.data.PostId).content3 = action.data.content3;
//     draft.myFood.find((v) => v.id === action.data.PostId).recipe = action.data.recipe;
   
//     break;
  

//     // case UPDATE_POST_SUCCESS:
//     // draft.updatePostLoading = false;
//     // draft.updatePostDone = true;
//     // draft.myFood.find((v) => v.id === action.data.PostId).content = action.data.content;
//     // break;
//     case UPDATE_POST_FAILURE:
//     draft.updatePostLoading = false;
//     draft.updatePostError = action.error;
//     break;

   
//     case LOAD_HASHTAG_POSTS_REQUEST:
//       draft.loadPostsLoading = true;
//       draft.loadPostsDone = false;
//       draft.loadPostsError = null;
//       break;
  
//     case LOAD_HASHTAG_POSTS_SUCCESS:
//       draft.loadPostsLoading = false;
//       draft.loadPostsDone = true;
//       draft.hashtagfood = draft.hashtagfood.concat(action.data);
//       draft.hasMorePosts = action.data.length === 10;
//       break;

   
//     case LOAD_HASHTAG_POSTS_FAILURE:
//       draft.loadPostsLoading = false;
//       draft.loadPostsError = action.error;
//       break;
      
//     }
// });

// export default reducer;

