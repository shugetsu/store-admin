import { message } from 'ant-design-vue'

export default function ({ $axios, redirect }) {
  $axios.setBaseURL('http://127.0.0.1:7001')

  $axios.onResponse(response => {
    if (response.data.code !== 200) {
      message.error(response.data.msg)
    }
  })
}
