# Cilantro-React

A work-in-progress port of the existing Cilantro client to React. The goal is to modernize and simplify the codebase while maintaining compatibility with Harvest 2.4.x.

## Development

To setup the dev environment, clone the repo and ensure `npm` is installed. Then run the following in the cloned directory. This will take a minute or two.

```
npm install
```

To use against your existing Harvest API, create an `.env` file with two variables:

```
REACT_APP_API_URL=https://myharvestapp.edu/api/
REACT_APP_API_TOKEN=my-serrano-token
```

Currently, columns cannot be selected for the table view. In the meantime, you can use an environment variable to specify the view concepts by ID to display.

```
REACT_APP_VIEW_CONCEPTS=32,19,10,8
```


Then start the client:

```
npm start
```
