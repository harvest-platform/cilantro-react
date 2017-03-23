import { routerReducer } from 'react-router-redux';
import actions from './actions';

function convertLegacyView(view) {
  if (!view) return [];

  if (Array.isArray(view)) {
    return view;
  }

  const columns = view.columns || [];
  const ordering = {};

  if (view.ordering) {
    // Index of ordering.
    view.ordering.forEach(function(order) {
      const [id, dir] = order;
      ordering[id] = dir;
    });
  }

  return columns.map(function(id) {
    return {
      concept: id,
      sort: ordering[id]
    };
  });
}

function queryViewReducer(state, action) {
  switch (action.type) {
    case actions.CHANGE_QUERY_VIEW:
      return convertLegacyView(action.payload);

    default:
      return convertLegacyView(state);
  }
}

function queryContextReducer(state, action) {
  switch (action.type) {
    case actions.CHANGE_QUERY_CONTEXT:
      return action.payload;

    default:
      return state;
  }
}


function dataPreviewReducer(state, action) {
  switch (action.type) {
    case actions.DATA_PREVIEW_REQUEST:
      const { page, pageSize } = action.payload;

      return Object.assign({}, state, {
        loading: true,
        error: undefined,
        page: page,
        pageSize: pageSize
      });

    case actions.DATA_PREVIEW_RESPONSE:
      // TODO: is this the right place to do data transformation?
      const { keys, items, limit, record_count } = action.payload;
      const pages = Math.ceil(record_count / limit);

      return Object.assign({}, state, {
        header: keys,
        rows: items,
        pageSize: limit,
        page: action.payload.page,
        pages: pages,
        loading: false
      });

    case actions.DATA_PREVIEW_ERROR:
      return Object.assign({}, state, {
        error: action.payload,
        loading: false
      });

    default:
      return state;
  }
}


function savedQueriesReducer(state, action) {
  switch (action.type) {
    case actions.SAVED_QUERIES_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case actions.SAVED_QUERIES_RESPONSE:
      return Object.assign({}, state, {
        queries: action.payload,
        loading: false
      });

    case actions.SAVED_QUERIES_ERROR:
      return Object.assign({}, state, {
        error: action.payload,
        loading: false
      });

    default:
      return state;
  }
}

function statsCountsReducer(state, action) {
  switch (action.type) {
    case actions.STATS_COUNTS_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });

    case actions.STATS_COUNTS_RESPONSE:
      return Object.assign({}, state, {
        counts: action.payload,
        loading: false
      });

    case actions.STATS_COUNTS_ERROR:
      return Object.assign({}, state, {
        error: action.payload,
        loading: false
      });

    default:
      return state;
  }
}

function rootReducer(state = {}, action) {
  return Object.assign({}, state, {
    routing: routerReducer(state.routing, action),
    table: dataPreviewReducer(state.table, action),
    queries: savedQueriesReducer(state.queries, action),
    counts: statsCountsReducer(state.counts, action),
    view: queryViewReducer(state.view, action),
    context: queryContextReducer(state.context, action)
  });
}


export default rootReducer;
