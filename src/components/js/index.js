import Vue from 'vue'
import MessageBox from './msgbox'

export var msgBox = (function () {
  return function (opts) {
    // 默认值
    const defaults = {
      title: '',
      content: '',
      cancel: '',
      ok: '',
      handleCancel: null,
      handleOk: null
    }

    const MyComponent = Vue.extend(MessageBox)

    for (const attr in opts) {
      defaults[attr] = opts[attr]
    }

    const vm = new MyComponent({
      el: document.createElement('div'),
      data: {
        title: defaults.title,
        content: defaults.content,
        cancel: defaults.cancel,
        ok: defaults.ok
      },
      methods: {
        handleCancel () {
          defaults.handleCancel && defaults.handleCancel.call(this)
          document.body.removeChild(vm.$el)
        },
        handleOk () {
          defaults.handleOk && defaults.handleOk.call(this)
          document.body.removeChild(vm.$el)
        }
      }
    })
    document.body.appendChild(vm.$el)
  }
})()
