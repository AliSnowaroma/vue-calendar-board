#vue日历面板组件

##使用：
```
npm install vue-calendar-board
```

##暴露接口

```
<Calender
    :currentDate = "currentDate"
    @onGoPrev = 'goPrev'
    @onGoNext = 'goNext'
    :events = "dayEvents"
    startDay =0  
></Calender>
```
```
    currentDate 初始化日期 '2018-08-11'
    events      事件 数组对象
    startDay    第一列显示周几 0~6
    onGoPrev    监听切换上月事件
    onGoNext    监听切换下月事件
```