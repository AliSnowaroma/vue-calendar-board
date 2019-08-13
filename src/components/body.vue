<template>
  <div class = "weeks-box">
    <div class="weeks-title">
      <strong class="week-day-title" v-for="(week,index) in weekTitles" :key="index">{{week}}</strong>
    </div>
    <div class="weeks-bg">
      <div class="week-row" v-for = "(week, weekIndex) in currentDates" :key = "weekIndex">
        <div
          class="day-cell"
          v-for = "(day, dayIndex) in week"
          :key ="dayIndex"
          @click = "onDayClick(day)"
        >
          <p :class="{ 'today':day.isToday }">{{day.monthDay}}</p>
          <div class="event-box" v-show = " day.events.length > 0">
            <div class="event-item" v-for = "(event,eventIndex) in day.events" :key = "eventIndex">
              {{event.title}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getStartDate, getDay  } from '../utils'
  import config from './config'
  export default {
    props:{
      currentDate:{
        default(){
          return new Date()
        }
      },
      startDay:{
        default:0
      },
      language:{
        default:'zh'
      },
      events:{
        default(){
          return []
        }
      }
    },
    data(){
      return {
        weekTitles:[]
      }
    },
    created(){
      this.getWeekTitles();
    },
    beforeUpdate(){
    },
    upDate(){

    },
    computed:{
      currentDateMock(){
        const currentDate = [];
        for(let i =0; i<5; i++){
          currentDate[i] = [];
          for(let k =0; k<7; k++){
            currentDate[i].push({
              monthDay:i.toString()+k,
              event:[
                {
                  title:'测试'
                }
              ]
            })
          }
        }
        return currentDate;
      },
      currentDates() {
        return this.getCalendar() //获取日历
      }
    },
    watch:{
      startDay(val){
        const { weekNames } = config[this.language];
        this.weekTitles = weekNames.slice(this.startDay).concat(weekNames.slice(0,this.startDay))
      }
    },
    methods:{
      getCalendar(){
        const self = this;
        let now = new Date();
        //获取当前日期所在月份的第一天
        let current = new Date(this.currentDate)
        let startDate = getStartDate(current);

        //获取当前日期的第一天的星期
        let curWeek = getDay(startDate)

        //根据开始日期是周几，第一列展示周几，计算出当前月份从哪一列开始展示 当月第一天向右偏移几天
        let deviationNum = parseInt(this.startDay) - curWeek;
        if(deviationNum>0){
          deviationNum = deviationNum -7;
        }
        //设置第一行第一列的日期，循环时逐个增加一天
        startDate.setDate(startDate.getDate() + deviationNum)
        //计算出当前月份展示完成需要几个星期（几行）
        let weeks = this.getWeeks(curWeek,current);

        let calendar = [];
        //给每一个星期（每一行添加数据）
        for (let perWeek = 0; perWeek < weeks; perWeek++) {
          calendar[perWeek] = [];
          for(let i = 0;i<7;i++){
            calendar[perWeek].push({
              monthDay:startDate.getDate(),
              isToday:now.toDateString() == startDate.toDateString(),
              isCurMonth: startDate.getMonth() == current.getMonth(),
              weekDay: i,
              date:new Date(startDate),
              events: self.filterEvents(startDate)
            })
            startDate.setDate(startDate.getDate()+1)
          }
        }
        return calendar

      },
      //获取要展示的星期数，可能5行，也可能6行
      getWeeks(curWeek,current){
        //获取当前月份的天数（即获取本月的最后一天）
        let curDayNum = new Date(current.getFullYear(),current.getMonth()+1,0).getDate()
        let weeks;
        //获取第一行展示当前月的天数 并计算显示几个星期（几行）
        if(this.startDay == curWeek){
          weeks = Math.ceil((31-7)/7)+1
        }else if(this.startDay < curWeek){
          weeks = Math.ceil((curWeek - this.startDay -7 + 31)/7)+1
        }else{
          weeks = Math.ceil((curWeek - this.startDay + 31)/7)+1
        }
        return weeks;
      },
      getWeekTitles(){
        const { weekNames } = config[this.language];
        this.weekTitles = weekNames.slice(this.startDay).concat(weekNames.slice(0,this.startDay))
      },
      filterEvents(date){
        let thisDayEvents = this.events.filter(day => {
          let dt = new Date(day.start)
          let st = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())
          let ed = day.end ? new Date(day.end) : st
          return date >= st && date <= ed
        })
        return thisDayEvents
      },
      onDayClick(day){
        this.$listeners.onDayClick && this.$listeners.onDayClick()
      }
    }
  }
</script>

<style lang="scss" scoped>
.weeks-box{
  position: relative;
  .weeks-title{
    display: flex;
    .week-day-title{
      flex:1;height:30px;line-height:30px;flex:1;border-left:1px solid #333;border-bottom:1px solid #333;border-top:1px solid #333;
      background:rgb(136, 140, 143);
      &:nth-last-child(1){border-right:1px solid #333;}
    }
  }
  .weeks-bg{
    border-right:1px solid #333;
    .week-row{
      display: flex;
      .day-cell{position:relative;
        flex:1;border-left:1px solid #333;border-bottom:1px solid #333;min-height:110px;cursor:pointer;
        &:hover{
          background: rgb(26, 152, 165);
          .event-box{
            position:absolute;top:0px;height:auto;background:rgb(26, 152, 165);z-index:10;
            
          }
        }
        .today{background: rgb(26, 152, 165);}
        .event-box{
          height:80px;width:100%;overflow:hidden;
          .event-item{
            height:30px;line-height:30px;
            &:hover{color:#fff;}
          }
        }
      }
    }
  }
}
</style>
