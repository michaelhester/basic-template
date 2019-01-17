var chartContainer =  d3.select('#chart-container'),
    chartSvg,
    chartG;

var chartOuterHeight,
    chartOuterWidth,
    chartMargin,
    chartHeight,
    chartWidth;

var chartXScale,
    chartYScale;

function buildChart() {
    chartContainer.selectAll('svg').remove();

    chartSvg = chartContainer.append('svg')
        .attr('class', 'chart-svg')
        .attr('width', chartOuterWidth)
        .attr('height', chartOuterHeight);

    chartG = chartSvg.append('g')
        .attr('transform', 'translate(' + chartMargin.left + ', ' + chartMargin.top + ')')
        .attr('class', 'chart-g');
}


function setupChart() {
    chartOuterWidth = chartContainer.node().offsetWidth,
    chartOuterHeight = chartContainer.node().offsetHeight,

    chartMargin = {
        top: 40,
        right: 25,
        bottom: 40,
        left: 25
    }

    chartWidth = chartOuterWidth - chartMargin.left - chartMargin.right,
    chartHeight = chartOuterHeight  - chartMargin.top - chartMargin.bottom;

    chartXScale = d3.scaleLinear()
        .range([0, chartWidth])

    chartYScale = d3.scaleLinear()
        .range([0, chartHeight]);
    
    buildChart()
}

function initChart() {
    setupChart();
}


