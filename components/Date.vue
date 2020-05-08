<template>
  <div :class="$style.container">
    <div :class="$style.info">
      * Tidak ada data harian untuk area ini
    </div>
    <div :class="$style.relativeDate">
      {{ relativeDate }}
    </div>
    <div :class="$style.fullDate">
      {{ fullDate }}
    </div>
  </div>
</template>
<script>
import * as dayjs from 'dayjs';
import 'dayjs/locale/id';
import * as Calendar from 'dayjs/plugin/calendar';
import * as relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('id');
dayjs.extend(Calendar);
dayjs.extend(relativeTime);

export default {
  name: 'Date',
  props: ['ts'],
  computed: {
    relativeDate() {
      const relativeDate = dayjs(this.ts * 1).calendar(null, {
        sameDay: '[Hari ini]', // The same day ( Today at 2:30 AM )
        lastDay: '[Kemarin]' // The day before ( Yesterday at 2:30
      });
      if (relativeDate === 'Hari ini' || relativeDate === 'Kemarin') {
        return relativeDate;
      }
      return null;
    },
    fullDate() {
      return dayjs(this.ts * 1).format('dddd, MMMM D, YYYY');
    }
  }
};
</script>
<style module>
.container {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  background: rgba(255, 255, 255, 0.05);
}
.info {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  padding-bottom: 5px;
  font-size: 10px;
  text-align: center;
  background: #222;
  opacity: 0.6;
}
.relativeDate {
  font-size: 20px;
  color: #fff;
  font-weight: 900;
}
.fullDate {
  font-size: 14px;
  color: #9ebae0;
  font-weight: 500;
}
</style>
