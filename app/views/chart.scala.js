@(poolSize: Int, data: Map[String, Int])
$(function () {

  function generateTitle (i) {
    return '味全池剩余： ' + i + '瓶'
  }

  var poolSize = @poolSize
  var positive = '#2F7ED8'
  var negative = '#AA1919'

  $('#weiquanChart').highcharts({
    chart: {
      type: 'bar'
    },
    title: {
      text: '大富翁味全龙虎榜'
    },
    xAxis: {
      categories: [@for((name,_) <- data) {'@name',}],
      title: {
        text: null
      },
      gridLineWidth: 2,
      labels: {
        useHTML: true,
        format: '<span style="font-size:25px">{value}</span><img src="@routes.Assets.at("avatars/default.jpg")" alt="cloud" width="40px" height="40px">',
        style: {
          color: '#000000'
        }
      }
    },
    yAxis: {
      title: {
        text: generateTitle(poolSize),
        margin: 50,
        style: {
          color: '#0D233A',
          'font-size': '30px'
        }
      },
      labels: {
        enabled: false
      },
      gridLineWidth: 0
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        },
        groupPadding: 0
      }
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [{
      data: [
        @for((name, value) <- data) {
          {color: @if(value > 0) {positive} else {negative} , y: @value, name:'@name'},
        }
      ]
    }]
  })

  var chart = $('#weiquanChart').highcharts()
  $(".reduce").click(function() {
    var point = chart.series[0].data[3]
    point.update(--point.y, false)
    if (point.y < 0) {
      point.update({color: negative}, false)
    }
    chart.yAxis[0].setTitle({text: generateTitle(--poolSize)});
    chart.redraw()
  })
})