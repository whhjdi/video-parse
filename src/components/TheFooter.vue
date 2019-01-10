<template>
  <div class="footer">
    <div class="copy-right">
      <Alert type="error">
        <span slot="desc" class="desc">
          ©2019，本站不提供解析服务，接口源于互联网，仅供学习交流，请勿用于商业，后果自负！
        </span>
      </Alert>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  .copy-right {
    width: 1099px;
  }
  @media (max-width: 1099px) {
    .copy-right {
      width: 800px;
    }
  }
  @media (max-width: 800px) {
    .copy-right {
      width: 100%;
    }
  }
}
</style>
