
// Parameters imported from .env file (environment variables)
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const oauth2BaseUrl = process.env.REACT_APP_OAUTH2_BASE_URL;
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const redirectUrl = process.env.REACT_APP_REDIRECT_URL;
const x64combo = process.env.REACT_APP_ID_SECRET;
const nodeRoot = process.env.NODE_ENV === 'development' ? 
  process.env.REACT_APP_NODE_ROOT_DEV :
  process.env.REACT_APP_NODE_ROOT

export { apiBaseUrl, oauth2BaseUrl, clientId, clientSecret, redirectUrl, x64combo, nodeRoot };