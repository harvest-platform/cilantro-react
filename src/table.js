import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import actions from './actions';

import './table.css';
import loader from './loader.gif';

class HTMLCell extends Component {
  render() {
    const html = {
      __html: this.props.children
    };
    return <div className="rt-td" dangerouslySetInnerHTML={html} />;
  }
}

const Loader = ({loading}) => (
  <div className={'-loading' + (loading ? '-active' : '')}>
    <img className="-loading-inner" alt="Loading..." src={loader} />
  </div>
);

class Table extends Component {
  // Fetch and render the page on mount.
  componentDidMount() {
    const { pageSize, view, context } = this.props;
    let { page } = this.props;
    if (page === 0) {
      page++;
    }
    this.fetchPage({ page, pageSize, view, context });
  }

  fetchPage = (params) => {
    const { dispatch } = this.props;
    dispatch(actions.dataPreviewPage(params));
  }

  onPageSizeChange = (pageSize, page) => {
    const { view, context } = this.props;
    // Translate to 1-based index.
    page++;
    this.fetchPage({ page, pageSize, view, context })
  }

  onPageChange = (page) => {
    // Get existing page size.
    const { pageSize, view, context } = this.props;
    // Translate to 1-based index.
    page++;
    this.fetchPage({ page, pageSize, view, context });
  }

  onSortingChange = (column, shiftKey) => {
    let nsort;
    switch (column.sort) {
      case 'asc':
        nsort = 'desc';
        break;

      case 'desc':
        break;

      default:
        nsort = 'asc';
    }

    const { dispatch, pageSize, page, context } = this.props;

    // Update sort orders.
    const view = this.props.view.map(function(facet) {
      facet = Object.assign({}, facet);

      if (column.id === facet.concept) {
        facet.sort = nsort;
      } else if (!shiftKey) {
        delete facet.sort;
        delete facet.sort_index;
      }

      return facet;
    });

    dispatch(actions.changeQueryView(view));
    this.fetchPage({ page, pageSize, view, context });
  }

  render() {
    const { header, rows, pages, pageSize, error } = this.props;
    let { loading, page } = this.props;

    if (error) {
      return <div>Error.</div>;
    }

    const columns = header.map(function(opt, index) {
      return {
        id: opt.id,
        sort: opt.direction,
        header: opt.name,
        accessor: (row) => row[index]
      };
    });

    const data = rows.map(function(row) {
      return row.values;
    });

    // Page index is 0-based.
    page--;

    return (
      <ReactTable
        manual={true}
        pages={pages}
        page={page}
        minRows={10}
        pageSize={pageSize}
        loading={loading}
        data={data}
        columns={columns}
        onPageChange={this.onPageChange}
        onPageSizeChange={this.onPageSizeChange}
        onSortingChange={this.onSortingChange}
        TdComponent={HTMLCell} />
    );
  }
}

export default Table;
