import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import actions from './actions';

import Loader from './loader';

import './workspace.css';

class LinkListItem extends Component {
  render() {
    const { id, name } = this.props;
    const path = `/queries/${id}`;

    let { onClick } = this.props;
    if (!onClick) onClick = () => {}

    return (
      <li className="LinkListItem">
        <Link
          to={path}
          onClick={
            (event) => onClick(event, this.props)
          }>
          {name}
        </Link>
      </li>
    )
  }
}

const StaticListItem = ({ name }) => (
  <li>{name}</li>
)


const List = ({ items = [], onClick, ListItem = StaticListItem }) => (
  <ul className="List">
    {
      items.map(function(item) {
        return (
          <ListItem
            key={item.id}
            onClick={onClick}
            {...item} />
        );
      })
    }
  </ul>
)

const Card = ({ children }) => (
  <div className="Card">
    { children }
  </div>
);


class QueryList extends Component {
  render() {
    const { queries, loading } = this.props;

    let content;

    if (loading) {
      content = <Loader />;
    } else {
      content = (
        <List
          items={queries || []}
          ListItem={LinkListItem} />
      );
    }

    return (
      <Card>
        <h3>Queries</h3>
        { content }
      </Card>
    );
  }
}

class CountsList extends Component {
  render() {
    const { counts, loading } = this.props;

    let content;

    if (loading) {
      content = <Loader />;
    } else {
      content = <List items={counts || []} />;
    }

    return (
      <Card>
        <h3>Counts</h3>
        { content }
      </Card>
    );
  }
}


class Workspace extends Component {
  componentDidMount() {
    const { dispatch, queries, counts } = this.props;

    // Not yet loaded.
    if (queries.queries === null) {
      dispatch(actions.fetchSavedQueries());
    }

    /*
    if (counts.counts === null) {
      dispatch(actions.fetchStatsCounts());
    }
    */
  }

  render() {
    const { dispatch, queries, counts } = this.props;

    return (
      <div className='Workspace'>
        <QueryList dispatch={dispatch} {...queries} />
        <CountsList dispatch={dispatch} {...counts} />
      </div>
    );
  }
}

function select(state) {
  return {
    queries: state.queries,
    counts: state.counts
  };
}

export default connect(select)(Workspace);
