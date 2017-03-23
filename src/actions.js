import api from './api';

const DATA_PREVIEW_REQUEST = 'dataPreviewRequest';
const DATA_PREVIEW_RESPONSE = 'dataPreviewResponse';
const DATA_PREVIEW_ERROR = 'dataPreviewError';


function dataPreviewPage({ page, pageSize, view, context }) {
  return function(dispatch) {
    dispatch({
      type: DATA_PREVIEW_REQUEST,
      payload: {
        page,
        pageSize
      }
    });

    const params = {
      page,
      limit: pageSize,
      view,
      context,
    };

    api.client.data.preview(params)
      .then(function(resp) {
        dispatch({
          type: DATA_PREVIEW_RESPONSE,
          payload: resp
        });
      })
      .catch(function(err) {
        dispatch({
          type: DATA_PREVIEW_ERROR,
          error: true,
          payload: err
        });
      });
  }
}


const CHANGE_QUERY_VIEW = 'changeQueryView';

function changeQueryView(view) {
  return {
    type: CHANGE_QUERY_VIEW,
    payload: view
  };
}


const CHANGE_QUERY_CONTEXT = 'changeQueryContext';

function changeQueryContext(context) {
  return {
    type: CHANGE_QUERY_CONTEXT,
    payload: context
  };
}


const SAVED_QUERIES_REQUEST = 'savedQueriesRequest';
const SAVED_QUERIES_RESPONSE = 'savedQueriesResponse';
const SAVED_QUERIES_ERROR = 'savedQueriesError';


function fetchSavedQueries() {
  return function(dispatch) {
    dispatch({
      type: SAVED_QUERIES_REQUEST
    });

    api.client.queries.all()
      .then(function(resp) {
        dispatch({
          type: SAVED_QUERIES_RESPONSE,
          payload: resp
        });
      })
      .catch(function(err) {
        dispatch({
          type: SAVED_QUERIES_ERROR,
          error: true,
          payload: err
        });
      });
  }
}


const STATS_COUNTS_REQUEST = 'statsCountsRequest';
const STATS_COUNTS_RESPONSE = 'statsCountsResponse';
const STATS_COUNTS_ERROR = 'statsCountsError';


function fetchStatsCounts() {
  return function(dispatch) {
    dispatch({
      type: STATS_COUNTS_REQUEST
    });

    api.client.stats.counts()
      .then(function(resp) {
        dispatch({
          type: STATS_COUNTS_RESPONSE,
          payload: resp
        });
      })
      .catch(function(err) {
        dispatch({
          type: STATS_COUNTS_ERROR,
          error: true,
          payload: err
        });
      });
  }
}


const LOGIN_USER_REQUEST = 'loginUserRequest';
const LOGIN_USER_RESPONSE = 'loginUserResponse';
const LOGIN_USER_ERROR = 'loginUserError';

const LOGOUT_USER = 'logoutUser';


function loginUser({ username, password }) {
  return function(dispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST
    })

    api.client.auth({ username, password })
      .then(function(resp) {
        dispatch({
          type: LOGIN_USER_RESPONSE,
          payload: resp
        });
      })
      .catch(function(err) {
        dispatch({
          type: LOGIN_USER_ERROR,
          error: true,
          payload: err
        });
      });
  }
}

function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}

export default {
  DATA_PREVIEW_REQUEST,
  DATA_PREVIEW_RESPONSE,
  DATA_PREVIEW_ERROR,
  dataPreviewPage,

  CHANGE_QUERY_VIEW,
  changeQueryView,

  CHANGE_QUERY_CONTEXT,
  changeQueryContext,

  SAVED_QUERIES_REQUEST,
  SAVED_QUERIES_RESPONSE,
  SAVED_QUERIES_ERROR,
  fetchSavedQueries,

  STATS_COUNTS_REQUEST,
  STATS_COUNTS_RESPONSE,
  STATS_COUNTS_ERROR,
  fetchStatsCounts,

  LOGIN_USER_REQUEST,
  LOGIN_USER_RESPONSE,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  loginUser,
  logoutUser
};
