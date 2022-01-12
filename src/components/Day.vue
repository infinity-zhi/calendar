<template>
  <td v-if="day > 0" :class="dateKey">
    <div>{{ day }}</div>
    <div v-if="dateDetail[0]">{{ dateDetail[0][dateKey] }}</div>
  </td>
  <td v-else></td>
</template>

<script>
import { Solar } from 'lunar-javascript';

export default {
  name: 'Day',
  props: ['presets', 'month', 'day'],
  computed: {
    dateKey() {
      return this.dateDetail[0] ? Object.keys(this.dateDetail[0])[0] : '';
    },
    dateDetail() {
      let solar = Solar.fromYmd(this.presets.year, this.month, this.day);
      let lunar = solar.getLunar();

      let solarFestival = solar.getFestivals();
      let lunarFestival = lunar.getFestivals();
      let jieQi = lunar.getJieQi();
      let lunarDate = lunar.getDayInChinese();

      let detail = [];
      if (lunarFestival.length && this.presets.addFestival)
        detail.push({ lunarFestival: lunarFestival[0] });
      if (jieQi && this.presets.addJieQi) detail.push({ jieQi });

      if (solarFestival.length && this.presets.addAnniversary)
        detail.push({
          solarFestival: solarFestival[0] === '消费者权益日' ? '3•15' : solarFestival[0]
        });
      if (lunarDate && this.presets.addLunar) {
        lunarDate === '初一'
          ? detail.push({ lunarStart: lunar.getMonthInChinese() + '月' })
          : detail.push({ lunarDate });
      }

      return detail;
    }
  }
};
</script>

<style>
</style>
