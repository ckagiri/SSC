import { GRAPHQL_URL, ACCESS_TOKEN } from './config';

function getOptionsWithFiles(operation, variables, uploadables) {
  // eslint-disable-next-line no-undef
  const body = new FormData();
  body.append('query', operation.text);
  body.append('variables', JSON.stringify(variables));
  Object.keys(uploadables).forEach(filename => {
    // eslint-disable-next-line no-prototype-builtins
    if (uploadables.hasOwnProperty(filename)) {
      body.append(filename, uploadables[filename]);
    }
  });

  return { body };
}
const getOptionsWithoutFiles = (operation, variables) => {
  const body = JSON.stringify({
    query: operation.text,
    variables,
  });
  // Get token from storage
  const token = localStorage.getItem(ACCESS_TOKEN) || sessionStorage.getItem(ACCESS_TOKEN);
  const headers = {
    Authorization: token && `Bearer ${token}`,
    Accept: '*/*',
    'Content-Type': 'application/json',
  };

  return { body, headers };
};

const graphqlUrl = GRAPHQL_URL || 'http://localhost:3030/graphql';
const fetchQuery = (operation, variables, cacheConfig, uploadables) => {
  const options = uploadables
    ? getOptionsWithFiles(operation, variables, uploadables)
    : getOptionsWithoutFiles(operation, variables);

  // eslint-disable-next-line no-undef
  return fetch(graphqlUrl, {
    method: 'POST',
    credentials: 'same-origin',
    ...options,
  })
    .then(response => response.json())
    .then(data => {
      if (data.errors) {
        throw data.errors.map(({ message }) => message);
      }
      return data;
    });
};

export default fetchQuery;
