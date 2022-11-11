<template>
  <div class="header-container">
    <div class="left-content">
      <el-button
        icon="el-icon-menu"
        size="mini"
        @click="handleMenu"
        style="margin-right: 20px"
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img src="@/assets/images/user.jpeg" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";
export default {
  data() {
    return {};
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    handleClick(command) {
      // 清除token
      if (command === "cancel") {
        Cookie.remove("token");
        // 清除cookie中的menu
        Cookie.remove("menu");
        // 跳转到登录页面
        this.$router.push({ name: "login" });
      }
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
};
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    color: #ccc;
    font-size: 14px;
    margin-left: 15px;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .left-content {
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;
        &.is-link {
          color: #666;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
  }
}
</style>
