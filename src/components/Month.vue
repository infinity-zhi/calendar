<template>
  <div>
    <table border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td colspan="7" class="month">{{ month }}月 {{ engMonth }}</td>
      </tr>
      <tr>
        <td
          class="week"
          v-for="(title, titleIndex) in weeks"
          :key="'title' + titleIndex"
          :class="'title' + titleIndex"
        >
          {{ title }}
        </td>
      </tr>
      <tr v-for="(week, weekIndex) in days" :key="'week' + weekIndex">
        <Day
          v-for="(day, dayIndex) in week"
          :key="'day' + day"
          :class="'day' + dayIndex"
          :day="day"
          :month="month"
          :presets="presets"
        />
      </tr>
    </table>
  </div>
</template>

<script>
import { Solar } from 'lunar-javascript';
import Day from './Day';

export default {
  name: 'Month',
  props: ['presets', 'month'],
  components: { Day },
  data() {
    return {
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      monthDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    };
  },
  computed: {
    engMonth() {
      return this.months[this.month - 1];
    },
    isLeapYear() {
      return (
        (this.presets.year % 100 != 0 && this.presets.year % 4 == 0) || this.presets.year % 400 == 0
      );
    },
    days() {
      let monthDays = this.month === 2 && this.isLeapYear ? 29 : this.monthDays[this.month - 1];
      let max = 7 * Math.ceil((monthDays + this.startWeek) / 7);
      let days = [];

      for (let i = 0; i < max; i++) {
        if (i % 7 === 0) days.push([]);
        i >= this.startWeek && i < monthDays + this.startWeek
          ? days[Math.floor(i / 7)].push(i + 1 - this.startWeek)
          : days[Math.floor(i / 7)].push(-i);
      }
      return days;
    },
    startWeek() {
      let firstDay = Solar.fromYmd(this.presets.year, this.month, 1);
      return firstDay.getWeek();
    }
  }
};
</script>

<style>
</style>
