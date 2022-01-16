<template>
  <div class="right" ref="right">
    <div
      :class="['page', 'page-' + presets.monthsPerPage]"
      ref="page"
      v-for="(page, pageIndex) in calendars"
      :key="'page' + pageIndex"
    >
      <div class="number">第 {{ pageIndex + 1 }} 页，共 {{ calendars.length }} 页</div>
      <div class="title">{{ title }}</div>
      <div class="canlendarRow" v-for="(row, rowIndex) in page" :key="'row' + rowIndex">
        <Month
          :class="[presets.paperDirection + presets.monthsPerPage, 'row' + monthsEachRow]"
          v-for="month in row"
          :presets="presets"
          :month="month"
          :key="'month' + month"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Lunar } from 'lunar-javascript';
import Month from './Month';

export default {
  name: 'Calendar',
  props: ['presets'],
  components: { Month },
  computed: {
    title() {
      let year = this.presets.year;
      let lunarYear = Lunar.fromYmd(year, 1, 1);
      let ganZhi = lunarYear.getYearInGanZhi();
      let shengXiao = lunarYear.getYearShengXiao();
      return `${year}年【${ganZhi} ${shengXiao}年】`;
    },
    calendars() {
      let calendars = [];
      for (let month = 0; month < 12; month++) {
        let pages = Math.floor(month / this.presets.monthsPerPage);
        let rows = Math.floor((month - pages * this.presets.monthsPerPage) / this.monthsEachRow);
        if (month % this.presets.monthsPerPage === 0) calendars.push([]);
        if (month % this.monthsEachRow === 0) calendars[pages].push([]);
        calendars[pages][rows].push(month + 1);
      }
      return calendars;
    },
    monthsEachRow() {
      let condition = this.presets.paperDirection + this.presets.monthsPerPage;
      let monthsEachRow = 1;
      switch (condition) {
        case 'horizontal12':
          monthsEachRow = 4;
          break;
        case 'horizontal6':
          monthsEachRow = 3;
          break;
        case 'horizontal2':
          monthsEachRow = 2;
          break;
        case 'vertical12':
          monthsEachRow = 3;
          break;
        case 'vertical6':
          monthsEachRow = 2;
          break;
      }
      return monthsEachRow;
    },
    fitRatio() {
      return this.presets.paperDirection === 'horizontal' ? 1 * 1.46 : 1 / 1.45;
    },
    paperDirection() {
      return this.presets.paperDirection === 'horizontal' ? 'landspace' : 'portrait';
    }
  },
  methods: {
    fitPage() {
      let max = 0;
      this.$refs.page.forEach((page) => {
        let width = page.offsetHeight * this.fitRatio;
        if (width > max) max = width;
      });
      this.$refs.page.forEach((page) => {
        page.style.width = max + 'px';
      });

      let css = `
        @media print {
          @page {size: A4 ${this.paperDirection}}
          html,body,.container {
            height: auto;
          }
          .left,.number {
            display: none;
          }
          .right {
            padding: 0;
            overflow: visible;
            background-color: #fff;
          }
          .page {
            padding: 0;
            margin: 0 auto;
            box-shadow: none;
            page-break-after: always;
          }
        }`;
      document.getElementById('printRule').innerHTML = css;
    }
  },
  updated() {
    this.fitPage();
  },
  mounted() {
    this.fitPage();
  }
};
</script>

<style>
.page {
  position: relative;
  padding: 16px;
  margin: 20px auto;
  background-color: #fff;
  box-shadow: 0 0 8px #ccc;
}
.number {
  padding: 5px;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  background-color: brown;
}
.title {
  color: #538dd5;
  font-size: 25px;
  line-height: 25px;
  padding-top: 5px;
  padding-bottom: 10px;
  font-weight: 700;
  font-family: 'simhei', monospace;
  text-align: center;
}
.page-6 .title {
  font-size: 30px;
  line-height: 30px;
  padding-bottom: 13px;
}
.page-2 .title {
  font-size: 35px;
  line-height: 35px;
  padding-bottom: 20px;
}
.page-1 .title {
  font-size: 40px;
  line-height: 40px;
  padding-bottom: 20px;
}
.page-2 .canlendarRow + .canlendarRow {
  padding-top: 20px;
}
.canlendarRow {
  display: flex;
  justify-content: space-between;
}
.canlendarRow + .canlendarRow {
  padding-top: 10px;
}
.row4 {
  float: left;
  flex: 0 0 24.5%;
}
.row3 {
  float: left;
  flex: 0 0 32.8%;
}
.row2 {
  float: left;
  flex: 0 0 49.2%;
}
.row1 {
  float: left;
  flex: 0 0 100%;
}
table {
  border-collapse: collapse;
  height: 0px;
  width: 100%;
}
td {
  height: 42px;
  font-size: 14px;
  line-height: 20px;
  width: 14%;
  max-width: 14%;
  color: #000;
  font-weight: 700;
  text-align: center;
  border: 0.5px solid #999;
}
td.month {
  font-size: 16px;
  height: 21px;
  background: #c5d9f1;
}
td.week {
  height: 21px;
  background: #e9ecef;
}
td > div {
  height: 21px;
  font-size: 16px;
}
td > div + div {
  height: 21px;
  border-top: 0.5px dotted #a6a6a6;
  font-size: 12px;
  font-weight: 400;
}
td.jieQi > div:last-child {
  color: #00b050;
  background: #e4f5d7;
}
td.lunarStart > div:last-child {
  color: #ff00ff;
  background: #f5e3ff;
}
td.solarFestival > div:last-child {
  color: #0084fe;
  background: #c9edff;
}
td.lunarFestival {
  background: #ffe1e1;
}
td.lunarFestival > div:last-child {
  color: #0084fe;
}
td.lunarFestival > div:first-child,
td.title0,
td.title6,
td.day0 > div:first-child,
td.day6 > div:first-child {
  color: #ff0000;
}

.vertical6.row2 td,
.horizontal6.row3 td {
  height: 60px;
  font-size: 16px;
  line-height: 30px;
}
.vertical6.row2 td.month,
.horizontal6.row3 td.month {
  font-size: 20px;
  height: 30px;
  background: #c5d9f1;
}
.vertical6.row2 td.week,
.horizontal6.row3 td.week {
  height: 30px;
  background: #e9ecef;
}
.vertical6.row2 td > div,
.horizontal6.row3 td > div {
  height: 30px;
  font-size: 22px;
}
.vertical6.row2 td > div + div,
.horizontal6.row3 td > div + div {
  height: 30px;
  border-top: 0.5px dotted #a6a6a6;
  font-size: 16px;
  font-weight: 400;
}

.vertical2.row1 td,
.horizontal2.row2 td {
  height: 100px;
  font-size: 22px;
  line-height: 40px;
  border: 1px solid #999;
}
.vertical2.row1 td.month,
.horizontal2.row2 td.month {
  font-size: 26px;
  height: 40px;
  background: #c5d9f1;
}
.vertical2.row1 td.week,
.horizontal2.row2 td.week {
  height: 40px;
  background: #e9ecef;
}
.vertical2.row1 td > div,
.horizontal2.row2 td > div {
  height: 60px;
  line-height: 60px;
  font-size: 35px;
}
.vertical2.row1 td > div + div,
.horizontal2.row2 td > div + div {
  font-size: 20px;
  font-weight: 400;
  height: 40px;
  line-height: 40px;
  border-top: 1px dotted #a6a6a6;
}

.horizontal1.row1 td {
  height: 100px;
  font-size: 26px;
  line-height: 40px;
  border: 1px solid #999;
}
.horizontal1.row1 td.month {
  font-size: 30px;
  height: 40px;
  background: #c5d9f1;
}
.horizontal1.row1 td.week {
  height: 40px;
  background: #e9ecef;
}
.horizontal1.row1 td > div {
  height: 60px;
  line-height: 60px;
  font-size: 40px;
}
.horizontal1.row1 td > div + div {
  font-size: 24px;
  font-weight: 400;
  height: 40px;
  line-height: 40px;
  border-top: 1px dotted #a6a6a6;
}

.vertical1.row1 td {
  height: 150px;
  font-size: 26px;
  line-height: 50px;
}
.vertical1.row1 td.month {
  font-size: 30px;
  height: 60px;
  background: #c5d9f1;
}
.vertical1.row1 td.week {
  height: 60px;
  background: #e9ecef;
}
.vertical1.row1 td > div {
  height: 100px;
  line-height: 100px;
  font-size: 50px;
}
.vertical1.row1 td > div + div {
  font-size: 24px;
  font-weight: 400;
  height: 50px;
  line-height: 50px;
  border-top: 1px dotted #a6a6a6;
}
</style>
