<template>
  <div class="container">
    <!-- @contextmenu.prevent -->
    <Panel :presets="presets" @setPresets="setPresets" />
    <Calendar :presets="presets" />
  </div>
</template>

<script>
import Panel from './components/Panel';
import Calendar from './components/Calendar';

export default {
  name: 'App',
  components: { Panel, Calendar },
  data() {
    return {
      presets: {
        year: new Date().getFullYear(),
        addAnniversary: true,
        addLunar: true,
        addFestival: true,
        addJieQi: true,
        monthsPerPage: 12,
        paper: 'A4',
        paperDirection: 'horizontal'
      }
    };
  },
  methods: {
    setPresets(obj) {
      Object.assign(this.presets, obj);
    },
    getQueryParams() {
      var query = window.location.search.substring(1);
      if (!query) return {};

      var vars = query.split('&');
      let params = {};
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (!pair[1]) continue;
        params[pair[0]] = pair[1];
      }
      return params;
    }
  },
  created() {
    let params = this.getQueryParams();

    Object.keys(this.presets).forEach((key) => {
      switch (key) {
        case 'year':
          params[key] = Number(params[key]);
          if (params[key] > 1990 && params[key] < 2050) this.presets[key] = params[key];
          break;
        case 'monthsPerPage':
          params[key] = Number(params[key]);
          if ([1, 2, 6, 12].includes(params[key])) this.presets[key] = params[key];
          break;
        case 'addAnniversary':
        case 'addLunar':
        case 'addFestival':
        case 'addJieQi':
          this.presets[key] = !(params[key] === 'false');
          break;
        case 'paperDirection':
          this.presets[key] = params[key] === 'vertical' ? 'vertical' : 'horizontal';
          break;
      }
    });
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body,
.container {
  height: 100%;
}
.container {
  display: flex;
  flex-direction: row;
}
.left {
  flex: 0 0 350px;
  padding: 20px;
}
.right {
  flex: 1 0 auto;
  padding: 10px 0;
  overflow-y: auto;
  background-color: #f6f6f6;
}
</style>
