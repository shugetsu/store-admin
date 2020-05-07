import Vue from 'vue'
import Antd from 'ant-design-vue/lib'

Vue.use(Antd)

Vue.prototype.$message.config({
  maxCount: 1
})
