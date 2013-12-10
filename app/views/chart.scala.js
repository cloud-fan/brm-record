@(poolSize: Int, players: List[Player])
$(function () {

  function generateTitle (i) {
    return '味全池剩余： ' + i + '瓶'
  }

  var values = [@players.map(p => math.abs(p.weiquan)).mkString(",")]
  var looser = '@players.minBy(_.weiquan).name'
  var maxY = Math.max.apply(Math, values) + 1
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
      categories: [@for(p <- players) {'@p.name',}],
      title: {
        text: null
      },
      gridLineWidth: 2,
      labels: {
        useHTML: true,
        format: '<span style="font-size:25px">{value}</span><img src="avatars/{value}.jpg" alt="cloud" width="40px" height="40px">',
        style: {
          color: '#000000'
        }
      }
    },
    yAxis: {
      min: -maxY,
      max: maxY,
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
        @for(p <- players) {
          {color: @if(p.weiquan > 0) {positive} else {negative} , y: @p.weiquan},
        }
      ]
    }]
  })

  Messenger.options = {
    extraClasses: 'messenger-fixed messenger-on-top',
    theme: 'future'
  }

  var chart = $('#weiquanChart').highcharts()
  $(".reduce").click(function() {
    if (poolSize == 0) {
      Messenger().post({
        message: '味全已经被喝完啦，快去催' + looser +'买',
        type: 'error',
        showCloseButton: true
      })
      return
    }

    var point = chart.series[0].data[2]
    var value = --point.y
    values[2] = Math.abs(value)
    maxY = Math.max.apply(Math, values) + 1
    point.update(value, false)
    if (value < 0) {
      point.update({color: negative}, false)
    }
    chart.yAxis[0].setTitle({text: generateTitle(--poolSize)}, false)
    chart.yAxis[0].update({min: -maxY, max: maxY}, false)
    chart.redraw()

    Messenger().post({
      message: '成功领取蛋总的味全～',
      type: 'success',
      showCloseButton: true
    })
  })
})