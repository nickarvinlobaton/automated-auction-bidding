export default function ({ $axios, $cookies }) {
  console.log($cookies.get('token'))
  $axios.setHeader('Content-Type', 'application/json', ['get', 'post', 'put', 'delete']);
  $axios.setToken($cookies.get('token'), 'Bearer');
}