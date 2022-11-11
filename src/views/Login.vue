<template>
  <el-form
    ref="form"
    label-width="70px"
    :model="form"
    :rules="rules"
    class="login-container"
    :inline="true"
  >
    <h3 class="login_title">系统登录</h3>
    <el-form-item label="用户名" prop="username"
      ><el-input v-model="form.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password"
      ><el-input
        type="password"
        v-model="form.password"
        placeholder="请输入密码"
        show-password
      ></el-input
    ></el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit" style="margin-top: 10px"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu } from "../api";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "请输入用户名",
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码",
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      //   // token信息
      //   const token = Mock.Random.guid();
      //   // 将token信息存入cookie
      //   Cookie.set("token", token);

      // 校验通过
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            if (data.code === 20000) {
              Cookie.set("token", data.data.token);
              // 获取菜单的数据，存入store中
              this.$store.commit("setMenu", data.data.menu);
              this.$store.commit("addMenu", this.$router);
              this.$router.push({ name: "home" });
            } else {
              this.$message.error("用户名或密码输入错误！");
            }
          });
        }
      });
      // 跳转至系统页面
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  width: 360px;
  margin: 180px auto;
  border: 1px solid #fff;
  padding: 30px;
  background-color: fff;
  border-radius: 20px;
  box-shadow: 0 0 20px #ccc;
  box-sizing: border-box;
  text-align: center;
  .login_title {
    font-weight: normal;
    padding-bottom: 20px;
    color: #505458;
  }
  .el-input {
    width: 198px;
  }
}
</style>
