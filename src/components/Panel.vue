<template>
  <div class="left">
    <a-modal
      title="提示"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>{{ ModalText }}</p>
    </a-modal>
    <h2>{{ presets.year }}年日历在线定制打印A4</h2>
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" @submit.prevent="getPdf">
      <a-form-item label="阳历年份">
        <a-input-number :value="presets.year" :min="1990" :max="2050" @change="year" />
      </a-form-item>
      <a-form-item label="阳历节日">
        <a-checkbox :checked="presets.addAnniversary" @change="addAnniversary">显示</a-checkbox>
      </a-form-item>
      <a-form-item label="农历">
        <a-checkbox :checked="presets.addLunar" @change="addLunar">显示</a-checkbox>
      </a-form-item>
      <a-form-item label="农历节日">
        <a-checkbox :checked="presets.addFestival" @change="addFestival">显示</a-checkbox>
      </a-form-item>
      <a-form-item label="节气">
        <a-checkbox :checked="presets.addJieQi" @change="addJieQi">显示</a-checkbox>
      </a-form-item>
      <a-form-item label="纸张规格">
        <a-radio-group :value="presets.paper" @change="paper">
          <a-radio-button value="A4">A4</a-radio-button>
          <!-- <a-radio-button value="A3">A3</a-radio-button> -->
        </a-radio-group>
      </a-form-item>
      <a-form-item label="纸张方向">
        <a-radio-group :value="presets.paperDirection" @change="paperDirection">
          <a-radio-button value="horizontal">横向</a-radio-button>
          <a-radio-button value="vertical">纵向</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="每页月数">
        <a-radio-group :value="presets.monthsPerPage" @change="monthsPerPage">
          <a-radio-button :value="12">12</a-radio-button>
          <a-radio-button :value="6">6</a-radio-button>
          <a-radio-button :value="2">2</a-radio-button>
          <a-radio-button :value="1">1</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 18, offset: 6 }">
        <a-button type="primary" html-type="submit">{{ getPdfText }}</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: ['presets'],
  data() {
    return {
      api: '',
      home: '',
      ModalText: '马上就好，请在打开的新窗口中打印 PDF 文件 ~',
      visible: false,
      confirmLoading: true
    };
  },
  computed: {
    getPdfText() {
      return this.api ? '定制完毕，下载 PDF 打印' : '定制完毕，立即打印';
    }
  },
  methods: {
    handleOk() {
      if (this.confirmLoading === false) {
        this.visible = false;
      }
    },
    handleCancel() {
      if (this.confirmLoading === false) {
        this.visible = false;
      }
    },
    year(val) {
      if (val > 2050 || val < 1990) return this.$message.error('年份必须 在 1990 - 2050 之间');
      this.$emit('setPresets', { year: val });
    },
    addAnniversary(val) {
      this.$emit('setPresets', { addAnniversary: val.target.checked });
    },
    addLunar(val) {
      this.$emit('setPresets', { addLunar: val.target.checked });
    },
    addFestival(val) {
      this.$emit('setPresets', { addFestival: val.target.checked });
    },
    addJieQi(val) {
      this.$emit('setPresets', { addJieQi: val.target.checked });
    },
    monthsPerPage(val) {
      this.$emit('setPresets', { monthsPerPage: val.target.value });
    },
    paper(val) {
      this.$emit('setPresets', { paper: val.target.value });
    },
    paperDirection(val) {
      this.$emit('setPresets', { paperDirection: val.target.value });
    },
    getPdf() {
      if (!this.api) return window.print();

      this.visible = true;
      this.ModalText = '等待 5 秒后，在打开的新窗口中打印 PDF 文件 ~';
      this.confirmLoading = true;
      this.$request
        .POST(this.api, this.presets)
        .then((data) => {
          if (!data.data.file) {
            this.ModalText = '服务器异常，请重试！';
            this.confirmLoading = false;
            return;
          }

          setTimeout(() => {
            this.confirmLoading = false;
            let myWindow = window.open(
              this.home + data.data.file,
              'calendar',
              'width=1200,height=700'
            );
            myWindow.focus();
          }, 1500);
        })
        .catch(() => {
          this.ModalText = '服务器异常，请重试！';
          this.confirmLoading = false;
        });
    }
  },
  created() {
    this.$request
      .GET('/config.json')
      .then((data) => {
        this.api = data.api;
        this.home = data.home;
      })
      .catch(() => {
        this.api = '';
      });
  }
};
</script>

<style scoped>
</style>
