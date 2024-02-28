import axios from 'axios'

window.axios = axios  //Para poder ocuparlo de manera global
window.axios.defaults.baseURL = 'http://localhost:4000'

window.axios.defaults.headers.common['Accept'] = 'application/json'
window.axios.defaults.headers.common['Content-Type'] = 'application/json'
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.headers.common['crossDomain'] = true;
window.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
window.axios.defaults.withCredentials=true;
