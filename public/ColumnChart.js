const ColumnChart = function (title_text, name, data, categories) {
  const container = document.getElementById('column-chart');
  const chart = new Highcharts.Chart({
    chart: {
      type: 'column',
      renderTo: container
    },
    title: {
      title_text
  },
  series: [{
    name: name,
    data: data
  }],
  xAxis: {
    categories: categories
  }
});
}
