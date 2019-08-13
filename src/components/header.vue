<template>
  <div class = "calendar-component">
    <ul class = "calendar-header">
      <li class="calendar-header-item calendar-header-left">
        <a href="javascript:void(0)" @click = "goPrev">{{prev}}</a>
        <span>{{currentDateShow | formatDate}}</span>
        <a href="javascript:void(0)" @click = "goNext">{{next}}</a>
      </li>
      <li class="calendar-header-item calendar-header-center">
        <slot name = "calendar-header-center"></slot>
      </li>
      <li class="calendar-header-item calendar-header-right">
        <slot name = "calendar-header-right"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
  import  moment from 'moment'
  export default {
    created() {
      this.setCurrentDate()
    },
    props:{
      currentDate:{
        default(){
          return moment()
        }
      }
    },
    data(){
      return {
        prev:"<",
        next:">",
        currentDateShow:''
      }
    },
    filters: {
      formatDate(value) {
        if (!value) return ''
        return moment(value).format('YYYY年MM月');
      }
    },
    watch:{
      currentDate(val){
        this.currentDateShow = val
      }
    },
    methods:{
      setCurrentDate(){
        this.currentDateShow = moment(this.currentDate);
      },
      setTime(){
        this.time = 19
      },
      goPrev(){
        this.$emit(
          'changeDate',
          moment(this.currentDateShow).subtract(1, 'months')
        )
        this.$listeners.onGoPrev()
      },
      goNext(){
        this.$emit(
          'changeDate',
          moment(this.currentDateShow).add(1, 'months')
        )
        this.$listeners.onGoNext()
      }
    }
  }
</script>

<style lang="scss" scoped>
.calendar-component{
  width:100%;min-height:30px;padding:16px;
  .calendar-header{overflow: hidden;}
}
.calendar-header{
  .calendar-header-item{float:left;
    a{text-decoration:none;padding:0 5px;}
  }
}

</style>
