<template>
  <div class = "calendar-component">
    <Header
      v-bind = "$attrs"
      v-on = "$listeners"
      :currentDate = 'currentDateInside'
      @changeDate = 'changeCurrentDateInside'
    >
      <div slot="calendar-header-center" class="header-tip">
        <slot name="calendar-header-center">
        </slot>
      </div>
      <div slot="calendar-header-right">
        <slot name="calendar-header-right">
        </slot>
      </div>
    </Header>
    <Body
      v-bind = "$attrs"
      v-on = "$listeners"
      :currentDate = 'currentDateInside'
    >
    </Body>
  </div>
</template>

<script>
  import Body from './components/body'
  import Header from './components/header'
  export default {
    components:{
      Body,
      Header
    },
    inheritAttrs:false,
    props:{
      currentDate:{
        default(){
          return new Date()
        }
      }
    },
    created(){
      this.setCurrentDateInside();
    },
    watch:{
      currentDate(val){
        this.currentDateInside = val;
      }
    },
    data(){
      return {
        currentDateInside:new Date()
      }
    },
    methods:{
      setCurrentDateInside(){
        this.currentDateInside = this.currentDate
      },
      changeCurrentDateInside(date){
        this.currentDateInside = date;
      }
    }
  }
</script>

<style lang="scss" scoped>
.calendar-component{
  min-width:960px;
  margin:0 60px;
  box-sizing:border-box;
}
</style>
