<template>
  <div class="tags">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      :closable="item.name !== 'home'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations(["closeTag"]),
    // 点击tag跳转的功能
    changeMenu(item) {
      this.$router.push({ name: item.name });
    },
    // 点击tag删除的功能
    handleClose(item, index) {
      this.closeTag(item);
      const length = this.tags.length;
      // 删除之后的跳转逻辑
      if (item.name !== this.$route.name) {
        return;
      } else if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tags {
  padding: 20px;
  padding-bottom: 0;
  .el-tag {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
