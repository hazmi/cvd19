<template>
  <header :class="$style.header">
    <div :class="$style.titleWrapper">
      <h1 v-if="current" :class="$style.title">
        <router-link :to="baseurl" :class="$style.url">
          <span :class="$style.textCovid19">COVID19</span>
          <span :class="$style.textIn">in</span>
          <span :class="$style.textCurrent">{{ current }}</span>
        </router-link>
      </h1>
      <h1 v-if="!current" :class="$style.title">
        <span :class="$style.textCovid19">COVID19 Dashboard</span>
      </h1>
      <router-link to="/" :class="$style.url">
        cvd19.pw
      </router-link>
    </div>
    <div :class="$style.searchWrapper">
      <input
        ref="keyword"
        v-model="searchText"
        type="text"
        placeholder="Find a country or Indonesian province"
        :class="$style.input"
        @focus="onFocusText"
        @keyup="onKeyupInput"
      />
    </div>
    <div v-if="isFocus" :class="$style.list">
      <router-link
        v-for="item in list"
        :key="item.link"
        :to="item.link"
        :class="$style.listItem"
      >
        {{ item.display || item.label }}
      </router-link>
    </div>
  </header>
</template>
<script>
import Fuse from 'fuse.js';
import defaultList from '../utils/thelist';

function hasSomeParentTheClass(element, classname) {
  if (!element.parentNode) {
    return false;
  }
  if (element.className.split(' ').includes(classname)) {
    return true;
  }
  return hasSomeParentTheClass(element.parentNode, classname);
}

export default {
  name: 'Header',
  props: ['current', 'baseurl'],
  data() {
    return {
      list: defaultList,
      searchText: '',
      isFocus: null
    };
  },
  watch: {
    searchText(newData) {
      if (newData) {
        const options = {
          includeScore: true,
          threshold: 0.5,
          keys: ['label', 'keyword']
        };
        const fuse = new Fuse(defaultList, options);
        const filteredResult = fuse.search(newData);
        this.list = filteredResult.map(filteredItem => filteredItem.item);
      } else {
        this.list = defaultList;
      }
    }
  },
  methods: {
    onFocusText() {
      this.isFocus = true;
      window.addEventListener('keyup', this.onFocus);
      window.addEventListener('click', this.onClickOutsideDropdown);
    },
    onKeyupInput(event) {
      if (event.keyCode !== 27) {
        this.isFocus = true;
        window.addEventListener('keyup', this.onFocus);
      }
    }
  },
  mounted() {
    // eslint-disable-next-line arrow-parens
    this.onKeyup = event => {
      if (event.keyCode === 191) {
        this.$refs.keyword.focus();
      }
    };
    // eslint-disable-next-line arrow-parens
    this.onClickOutsideDropdown = event => {
      if (!hasSomeParentTheClass(event.target, this.$style.input)) {
        this.isFocus = false;
        window.removeEventListener('click', this.onClickOutsideDropdown);
      }
    };
    // eslint-disable-next-line arrow-parens
    this.onFocus = event => {
      if (event.keyCode === 27) {
        this.isFocus = false;
      }
    };
    window.addEventListener('keyup', this.onKeyup);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onKeyup);
    window.removeEventListener('keyup', this.onFocus);
  }
};
</script>
<style module>
.header {
  position: relative;
  z-index: 9;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
}
.list {
  position: absolute;
  left: 0;
  top: 90px;
  width: 100vw;
  max-width: 410px;
  max-height: 350px;
  overflow: auto;
  margin: 0 -10px;
  background: rgba(0, 0, 0, 0.8);
}
.listItem {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 10px;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  text-decoration: none;
}
.listItem:hover {
  background: rgba(255, 255, 255, 0.1);
}
.titleWrapper {
  display: flex;
  height: 35px;
  justify-content: space-between;
  align-items: center;
}
.title {
  margin: 0;
  font-size: 14px;
  font-weight: 900;
  color: #fff;
}
.url {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
}
.textIn {
  font-weight: 200;
  opacity: 0.5;
}
.textCurrent {
  text-transform: uppercase;
  color: #f2994a;
}
.searchWrapper {
  position: relative;
  flex: 1;
  display: flex;
  border-bottom: 5px solid #fff;
  margin: 0 -10px;
}
.input {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 0;
  font-size: 17px;
  color: #fff;
  font-weight: 400;
  padding: 0 10px;
}
.input:focus {
  outline: none;
  box-shadow: 0 0 0 5px #56ccf2;
}
.searchWrapper::before {
  position: absolute;
  content: '/';
  font-size: 16px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  right: 10px;
  top: 13px;
  height: 24px;
  width: 24px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
