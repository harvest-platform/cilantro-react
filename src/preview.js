import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from './actions';

import Table from './table';
import Loader from './loader';

import './preview.css';


class Preview extends Component {
  render() {
    const { dispatch, table, view, context } = this.props;

    return (
      <div className='preview-table'>
        <Table
          dispatch={dispatch}
          view={view}
          context={context}
          {...table} />
      </div>
    );
  }
}

class QueryPreview extends Component {
  componentDidMount() {
    const { dispatch, queries } = this.props;

    // Queries were not loaded yet.
    // TODO: limit to query that is requested.
    if (queries.queries === null) {
      dispatch(actions.fetchSavedQueries());
    }
  }

  render() {
    const { dispatch, table, queries, params } = this.props;

    if (!queries.queries) return <Loader />;

    // TODO: use query map.
    // const query = queries[params.id];
    const query = queries.queries.filter(function(q) {
      if (q.id === parseInt(params.id)) return q;
    });

    // TODO: show 404 view
    if (!query.length) return <div>404</div>;

    const view = query[0].view_json;
    const context = query[0].context_json;

    return (
      <div className='preview-table'>
        <Table
          dispatch={dispatch}
          view={view}
          context={context}
          {...table} />
      </div>
    );
  }
}

function select(state) {
  return state;
}

Preview = connect(select)(Preview);
QueryPreview = connect(select)(QueryPreview);

export { Preview, QueryPreview };
