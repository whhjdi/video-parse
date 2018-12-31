<template>
  <div class="top-bar">
    <Icon type="logo-freebsd-devil" class="title" size="40" />
    <div class="right">
      <transition name="showinput">
        <Poptip
          placement="bottom"
          trigger="focus"
          v-model="showInput"
          v-show="showInput"
          class="select-wrapper"
        >
          <Input
            v-model="query"
            class="search"
            @on-enter="selectCity"
            placeholder="请输入您的城市"
            clearable
          />
          <div class="api" slot="content">
            <a @click="toggleLocation">close</a>
            <ul class="location-wrapper">
              <li
                v-for="(item, index) in locations"
                :key="index"
                @click="setCity(item.location)"
                class="location"
              >
                {{ item.location }}
              </li>
            </ul>
          </div>
        </Poptip>
      </transition>

      <div class="weather">
        <Poptip
          title="本地天气"
          content="点击可以获取天气哦"
          placement="bottom"
          trigger="hover"
        >
          <Icon
            type="ios-search"
            @click="toogleSearch"
            class="icon-search"
            size="20"
          />
        </Poptip>
        <span class="city" v-show="weather.cond_txt"
          >{{ location }}：{{ weather.cond_txt }}
          <Icon
            type="ios-partly-sunny-outline"
            v-if="+weather.cond_code < 300"
            class="i-weather"
          />
          <Icon type="ios-rainy" class="i-weather" v-else />{{
            weather.tmp
          }}℃</span
        >
      </div>
      <span class="time">{{ time }}</span>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import Moment from "moment";
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      showInput: false,
      time: "",
      query: "",
      locations: [],
      location: [],
      weather: {}
    };
  },
  watch: {
    query(newVal) {
      if (newVal === "") {
        return;
      }
      let timer = false;
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.selectCity();
      }, 1000);
    }
  },
  computed: {},
  methods: {
    handleTime(date) {
      let newDate = Moment(date).format("ddd, HH:mm:ss");
      return newDate;
    },
    selectCity() {
      Axios.get("https://search.heweather.net/find", {
        params: {
          location: this.query,
          key: "",
          number: 20
        }
      }).then(res => {
        this.locations = res.data.HeWeather6[0].basic;
      });
    },
    setCity(location) {
      this.location = location;
      localStorage.setItem("location", this.location);
      Axios.get("https://free-api.heweather.net/s6/weather", {
        params: {
          location: location,
          key: ""
        }
      }).then(res => {
        this.weather = res.data.HeWeather6[0].now;
        this.showInput = false;
        this.query = "";
      });
    },
    toogleSearch() {
      this.showInput = !this.showInput;
    },
    toggleLocation() {
      this.showLocation = false;
    }
  },
  created() {
    if (localStorage.getItem("location")) {
      this.location = localStorage.getItem("location");
      this.setCity(this.location);
    }
  },
  mounted() {
    var _this = this;
    this.timer = setInterval(() => {
      _this.time = this.handleTime(new Date());
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="scss" scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 10px 1px #ddd;
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    .select-wrapper {
      margin-right: 10px;
      position: relative;
      &.showinput-enter-active,
      &.showinput-leave-active {
        opacity: 1;
        transition: all 0.3s linear;
        &.location-wrapper {
          transition: all 0.3s linear;
        }
      }
      &.showinput-enter,
      &.showinput-leave-to {
        transform: translateY(-100%);
        opacity: 0;
        &.location-wrapper {
          transform: translateY(-100%);
        }
      }
      .location-wrapper {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        .location {
          border: 1px solid #ddd;
          margin: 5px;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .weather {
      margin-right: 10px;
      .icon-search {
        margin-right: 10px;
      }
      .other {
        margin-right: 10px;
      }
      .i-weather {
        margin-right: 5px;
      }
    }
  }
}
</style>
