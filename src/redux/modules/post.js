import axios from "axios";
import { getCookie } from '../../shared/Cookie'

// Actions
const CREATE = 'post/CREATE';
const LOAD = 'post/LOAD';
const DETAIL = 'post/DETAIL'
const UPDATE = 'post/UPDATE';
const DELETE = 'post/DELETE';

const initialState = {
  list: [{}]
};

// Action Creators
export function createPost(post_list) {
  return { type: CREATE, post_list };
}

export function loadPost(post_list) {
  return { type: LOAD, post_list };
}

export function detailPost(post_list) {
  return { type: DETAIL, post_list };
}

export function updatePost(post_list) {
  return { type: UPDATE, post_list };
}

export function deletePost() {
  return { type: DELETE, };
}

// middleware
export const createPostDB = async (post_data) => {
  const post = post_data;
  return function (dispatch) {
    axios.post(`http://dlckdals04.shop/api/recruits`, post,
      { headers: { Authorization: `Bearer ${getCookie("accessToken")}` } })
      .then((response) => {
        // console.log(response.data);
        dispatch(createPost(response.data))
        window.alert('게시물 작성을 성공했습니다.')
        window.location.href = "/recruit"
      }).catch((error) => {
        // console.log(error.message);
        window.alert('게시물 작성이 실패했습니다.')
      })
  };
};

export const loadPostDB = () => {
  return function (dispatch) {
    axios.get(
      `http://dlckdals04.shop/api/recruits`
    )
      .then((response) => {
        // console.log(response.data);
        dispatch(loadPost(response));
      });
  };
};

export const detailPostDB = (recruitPostId) => {
  return function (dispatch) {
    axios.get(
      'http://dlckdals04.shop/api/recruits/' + recruitPostId
    )
      .then((response) => {
        console.log(response.data);
        dispatch(detailPost(response.data.recruitDetails));
      }).catch((response) => {
        console.log(response);
      });
  };
};

export const updatePostDB = ( recruitPostId, newPost) => {
  console.log(newPost)
  return function (dispatch) {
    axios
    .put(`http://dlckdals04.shop/api/recruits/` + recruitPostId,
    newPost,
    {
      headers:
        { Authorization: `Bearer ${getCookie("accessToken")}` }
    })
          .then((res) => {
              console.log(res.data.post);
              dispatch(updatePost(recruitPostId, res.data.post));
              alert("수정이 완료되었습니다.");
              window.location.href = "/recruit"
          })
          .catch((error) => {
              alert("게시글 수정 에러!");
          });
  };
};

export const deletePostDB = (recruitPostId) => {
  return function (dispatch) {
    axios
      .delete('http://dlckdals04.shop/api/recruits/' + recruitPostId,
        {
          headers:
            { Authorization: `Bearer ${getCookie("accessToken")}` }
        })
      .then((response) => {
        dispatch(deletePost(response.data));
        alert('삭제가 완료되었습니다.')
        window.location.href = "/recruit"
      })
      .catch((error) => {
        alert('게시글을 삭제할 권한이 없습니다.')
      });
  };
};


// Reducer
export default function reducer(state = initialState, action = {}) {
  // console.log(action)
  switch (action.type) {
    case "post/LOAD": {
      // console.log(action.post_list.data);
      return { list: action.post_list.data };
    }

    case "post/DETAIL": {
      // console.log(action);
      return { list: action.post_list };
    }

    case "post/UPDATE": {
      console.log(action);
      const new_post_list = state.list.filter((l, idx) => {
        return parseInt(action.post_index) !== idx;
      });
      const new_list = [...new_post_list, action.post];
      return { list: new_list };
    }
    case "post/DELETE": {
      const empty_list = [];
      return { list: empty_list };
    }

    default:
      return state;
  }
}
