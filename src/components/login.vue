<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="../assets/oc_logo.png"/>
      </div>
      <el-form class="login_form" ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="">
        <!--用户名-->
        <el-form-item label="" prop="account">
          <el-input v-model="loginForm.account" prefix-icon="el-icon-user-solid" type="text"
                    name="username"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item label="" prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password" name="password"></el-input>
        </el-form-item>
        <!--单项按钮-->
        <el-form-item>
          <el-radio-group v-model="loginForm.type">
            <el-radio :label="1">管理员</el-radio>
            <el-radio :label="2">学生</el-radio>
            <el-radio :label="3">教师</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="" class="btns">
          <el-button type="primary" @click="login()" :loading="login_loading">登录</el-button>
          <el-button type="info" @click="resetForm('loginFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      login_loading: false,
      loginForm: {
        account: 'admin',
        password: 'admin',
        type: 1
      },
      //表单验证规则对象
      loginFormRules: {
        account: [
          {required: true, message: "请输入用户名称", trigger: "blur"},
          {min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min: 5, max: 15, message: "长度在5到15个字符", trigger: "blur"}
        ]
      }
    }
  },
  methods: {
    login() {
      //为了在axios中调用
      const _this = this;
      _this.login_loading = true;
      this.$refs.loginFormRef.validate(async valid => {
        //验证失败
        if (!valid) return;
        this.axios.post('/login', this.$qs.stringify(this.loginForm)).then(function (resp) {
          if (resp.data.meta.status !== 200) {
            _this.login_loading = false;
            return _this.$message.error(resp.data.meta.msg);
          }
          _this.$message.success("登录成功");
          // 登录成功后，将token保存到客户端的sessionStorage（会话存储）中
          window.sessionStorage.setItem('token', resp.data.data.token);
          _this.login_loading = false;
          _this.$router.push('/home')
        })
      })
    },
    //重置按钮的事件
    resetForm(formName) {
      // console.log(this);
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style scoped>
.login_container {
  background-color: #133046;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 60px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.avatar_box {
  height: 120px;
  width: 120px;
  border: 1px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 10px #dddddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}

img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #eeeeee;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: center;
}
</style>
