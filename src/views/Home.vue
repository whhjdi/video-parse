<template>
  <div class="home-wrapper">
    <div class="left">
      <ul class="platform-wrapper">
        <li v-for="(item, index) in platformlist" :key="index" class="platform">
          <Button type="primary" @click="openUrl(item)">{{ item.name }}</Button>
        </li>
      </ul>
    </div>

    <div class="home">
      <iframe
        :src="fullUrl"
        id="video"
        width="100%"
        height="600px"
        allowtransparency="true"
        allowfullscreen="true"
        frameborder="0"
        scrolling="no"
      ></iframe>
      <div class="right" id="right-wrapper">
        <div class="url-wrapper">
          <Input
            placeholder="请输入VIP视频链接"
            @on-enter="fetchVideo"
            class="input"
            v-model="url"
            clearable
          />
          <Button @click="fetchVideo">确定</Button>
        </div>
        <Select v-model="baseUrl" style="width:100%;marginTop:10px;">
          <Option
            v-for="(item, index) in list"
            :value="item.url"
            :key="index"
            >{{ item.name }}</Option
          >
        </Select>
        <div class="pic-wrapper">
          <img
            src="https://ws3.sinaimg.cn/large/006tNbRwly1fylgsw3ovfj30u015le81.jpg"
            alt=""
            class="pic"
            v-show="showPic"
          />
          <Icon
            type="md-close-circle"
            class="close"
            size="20"
            color="#fff"
            @click="hidePic"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from "../api/video.json";
export default {
  name: "home",
  components: {},
  data() {
    return {
      showPic: true,
      fullUrl: "https://cdn.yangju.vip/k/?url=",
      url: "",
      baseUrl: "https://cdn.yangju.vip/k/?url=",
      platformlist: [],
      list: []
    };
  },
  computed: {},
  methods: {
    fetchVideo() {
      this.fullUrl = this.baseUrl + this.url;
      this.$Notice.info({
        title: "提示",
        desc: this.url
          ? "正在解析，请稍后。若解析失败，请尝试更换接口。"
          : "请输入视频链接"
      });
    },
    hidePic() {
      this.showPic = false;
    },
    openUrl(item) {
      window.open(item.url, "_blank");
    }
  },
  created() {
    this.platformlist = data.platformlist;
    this.list = data.list;
  }
};
</script>
<style lang="scss" scoped>
.home-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .left {
    padding: 20px;
    .platform-wrapper {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .platform {
        padding: 5px;
      }
    }
  }
  .home {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    #video {
      width: 800px;
      height: 450px;
      background: #ddd;
    }
    @media (max-width: 800px) {
      margin-top: 0;
      #video {
        width: 100vw;
        height: 56.25vw;
        margin-bottom: 20px;
      }
    }
    @media (max-width: 1099px) {
      #video {
        margin-bottom: 20px;
      }
      #right-wrapper {
        width: 400px;
      }
    }

    .right {
      padding: 0 20px;
      width: 300px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .url-wrapper {
        display: flex;
        width: 100%;
        .input {
          margin-right: 2px;
        }
      }
      .pic-wrapper {
        position: relative;
        .pic {
          width: 260px;
        }
      }
      .close {
        position: absolute;
        top: 30px;
        right: 30px;
      }
    }
  }
}
</style>
