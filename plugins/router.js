export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    // 设置条件
    console.log(to, from)
    next()
  })
 }
