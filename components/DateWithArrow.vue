<template>
  <div :class="$style.container">
    <div :class="$style.iconWrapper">
      <router-link v-if="prev" :class="$style.iconLeft" :to="prev">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
          <path
            d="M6.48917 6.41646H16.9167V9.58313H6.48917L10.1196 13.2135L7.88041 15.4527L0.42749 7.9998L7.88041 0.546875L10.1196 2.78605L6.48917 6.41646Z"
            fill="black"
          />
        </svg>
      </router-link>
      <div v-if="!prev" :class="$style.iconLeftDisabled">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
          <path
            d="M6.48917 6.41646H16.9167V9.58313H6.48917L10.1196 13.2135L7.88041 15.4527L0.42749 7.9998L7.88041 0.546875L10.1196 2.78605L6.48917 6.41646Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
    <div :class="$style.dateWrapper">
      <div :class="$style.relativeDate">Day {{ day }}, {{ relativeDate }}</div>
      <div :class="$style.fullDate">
        {{ fullDate }}
      </div>
    </div>
    <div :class="$style.iconWrapper">
      <router-link v-if="next" :class="$style.iconRight" :to="next">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
          <path
            d="M10.5111 9.58354L0.0835814 9.58354L0.0835814 6.41687L10.5111 6.41687L6.88066 2.78646L9.11983 0.547285L16.5728 8.0002L9.11983 15.4531L6.88066 13.214L10.5111 9.58354Z"
            fill="black"
          />
        </svg>
      </router-link>
      <div v-if="!next" :class="$style.iconRightDisabled">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none">
          <path
            d="M10.5111 9.58354L0.0835814 9.58354L0.0835814 6.41687L10.5111 6.41687L6.88066 2.78646L9.11983 0.547285L16.5728 8.0002L9.11983 15.4531L6.88066 13.214L10.5111 9.58354Z"
            fill="black"
          />
        </svg>
      </div>
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
  props: ['ts', 'next', 'prev', 'day'],
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
  flex: 1;
  display: grid;
  grid-template-columns: 75px 1fr 75px;
  background: rgba(255, 255, 255, 0.05);
}
.dateWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.iconWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.iconRight,
.iconLeft,
.iconLeftDisabled,
.iconRightDisabled {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  border-radius: 30px;
  background: #fff;
}
.iconLeftDisabled,
.iconRightDisabled {
  opacity: 0.3;
}
.relativeDate {
  font-size: 18px;
  color: #fff;
  font-weight: 900;
  text-align: center;
}
.fullDate {
  font-size: 12px;
  color: #768db1;
  font-weight: 500;
}
</style>
