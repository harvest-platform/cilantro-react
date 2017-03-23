// TODO: development purposes.
const defaultViewConcepts = (process.env.REACT_APP_VIEW_CONCEPTS || '').split(',').map(function(id) {
  return { concept: parseInt(id) };
})

const initialState = {
  // Active context and view objects.
  context: {},

  view: defaultViewConcepts,

  // Queries.
  queries: {
    loading: false,
    queries: null
  },

  // Counts.
  counts: {
    loading: false,
    counts: null
  },

  // State pertaining to the preview table.
  table: {
    loading: false,
    page: 0,
    pages: 0,
    pageSize: 50,
    numPages: null,
    header: [],
    rows: []
  }
};

export default initialState;
