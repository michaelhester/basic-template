//load in data for all vizzes and then build
var cleanedData,
    nestedData;

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

getData();

function getData() {
	// Load data sources
    var sampleDataUnresolved = d3.csv('assets/data/sample_file.csv').then(function(rawData) { return rawData; });
    Promise.all([sampleDataUnresolved]).then(function(response) {
        cleanedData = cleanData(response[0]);
        nestedData = nestData(cleanedData);

        resizeGeneral();
	});
}

function cleanData(data) {
    /*
    data.forEach(function(d) {
        d.something = +d.something;
    })
    var sortedData = data.sort(function(x, y){
        return d3.ascending(x.something, y.something);
    })
    */

    return data;
}

function nestData(data) {
    /*
    var nestedData = d3.nest()
        .key(function(d) {
            return d.something;
        })
        .entries(data);
    return nestedData;
    */

    return data;
}