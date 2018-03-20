export default function ({ $axios, store }) {
 $axios.onRequest((config) => {
  config.headers.common['access-token'] = store.state.token
  config.headers["Access-Control-Allow-Origin"] = "*"
  if (process.env.DEV) {
    config.headers['Dev-Server'] = true
  }
  return config
 })
}
