<template>
  <div class="password_body">
    <div class="password_email">
      邮箱：<input v-model="email" class="password_text" type="text"> <button :disabled="disabled" @touchstart="handleToVerify">{{ verifyInfo }}</button>
    </div>
    <form>
      <div>
        新密码：<input v-model="password" class="password_text" type="password" autocomplete="off">
      </div>
    </form>
    <div>
      验证码：<input v-model="verify" class="password_text" type="text">
    </div>
    <div class="password_btn">
      <button @touchstart="handleToPassword">修改</button>
    </div>
    <div class="password_link">
      <router-link to="/mine/login">立即登录</router-link>
      <router-link to="/mine/register">立即注册</router-link>
    </div>
  </div>
</template>

<script>

import { msgBox } from '@/components/js'

export default {
  name: 'update-password',
  data () {
    return {
      email: '',
      password: '',
      verify: '',
      verifyInfo: '发送验证码',
      disabled: false
    }
  },
  methods: {
    handleToVerify () {
      if (this.disabled) { return }

      if (this.email === '') {
        msgBox({
          title: '提示',
          content: '请输入邮箱',
          ok: '确定'
        })
        return
      }

      this.axios.get('/api2/users/verify?email=' + this.email).then((res) => {
        const status = res.data.status
        const that = this
        if (status === 0) {
          msgBox({
            title: '验证码',
            content: '验证码已发送',
            ok: '确定',
            handleOk () {
              that.countDown()
            }
          })
        } else {
          msgBox({
            title: '验证码',
            content: '验证码发送失败',
            ok: '确定'
          })
        }
      })
    },
    countDown () {
      this.disabled = true
      let count = 60
      const timer = setInterval(() => {
        count--
        this.verifyInfo = '剩余' + count + '秒'
        if (count === 0) {
          this.disabled = false
          count = 60
          this.verifyInfo = '发送验证码'
          clearInterval(timer)
        }
      }, 1000)
    },
    handleToPassword () {
      this.axios.post('/api2/users/updatePassword', {
        email: this.email,
        password: this.password,
        verify: this.verify
      }).then((res) => {
        const status = res.data.status
        const that = this
        if (status === 0) {
          msgBox({
            title: '修改',
            content: '修改密码成功',
            ok: '确定',
            handleOk () {
              that.$router.push('/mine/login')
            }
          })
        } else {
          msgBox({
            title: '修改',
            content: res.data.msg,
            ok: '确定'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .password_body {
    width: 100%;

    .password_text {
      width: 100%;
      height: 40px;
      border: none;
      border-bottom: 1px #ccc solid;
      margin-bottom: 5px;
      outline: none;
      text-indent: 10px;
    }

    .password_btn {
      height: 50px;
      margin: 10px;

      button {
        width: 100%;
        height: 100%;
        background: #e54847;
        border-radius: 3px;
        border: none;
        display: block;
        color: white;
        font-size: 20px;
      }
    }

    .password_email {
      position: relative;

      button {
        position: absolute;
        right: 10px;
        top: 10px;
        height: 30px;
        border-radius: 3px;
        border: none;
        padding: 5px;
      }
    }
    .password_link {
      display: flex;
      justify-content: space-between;

      a {
        text-decoration: none;
        margin: 0 5px;
        font-size: 12px;
        color: #e54847;
      }
    }
  }

</style>
