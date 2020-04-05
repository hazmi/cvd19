<template>
  <div :class="$style.container">
    <div :class="$style.info">
      * Unfortunately, no daily data for this area, only the latest data.
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
import * as Calendar from 'dayjs/plugin/calendar';
import * as relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(Calendar);
dayjs.extend(relativeTime);

export default {
  name: 'Date',
  props: ['ts'],
  computed: {
    relativeDate() {
      return dayjs(this.ts * 1).calendar(null, {
        sameDay: '[Today]', // The same day ( Today at 2:30 AM )
        nextDay: '[Tomorrow]', // The next day ( Tomorrow at 2:30 AM )
        nextWeek: 'dddd', // The next week ( Sunday at 2:30 AM )
        lastDay: '[Yesterday]', // The day before ( Yesterday at 2:30 AM )
        lastWeek: '[Last] dddd', // Last week ( Last Monday at 2:30 AM )
        sameElse: `[${dayjs(this.ts * 1).fromNow()}]`
      });
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
}
.relativeDate {
  font-size: 32px;
  color: #fff;
  font-weight: 900;
}
.fullDate {
  font-size: 14px;
  color: #768db1;
  font-weight: 500;
}
</style>
