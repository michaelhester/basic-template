var geoOverlay = d3.select('#geocluster-interactive-overlay'),
    geoInput = d3.select('#geocluster-search'),
    geoUl = d3.select('#geocluster-ul'),
    geoLi,
    geoMap = d3.select("#geocluster-map-container"),
    geoMapCover = geoMap.select('#geocluster-map-cover'),
    geoImg = geoMap.select('img');

var geoSearchItems = ['cajun', 'churches', 'farming-equipment', 'italian', 'mexican', 'pool_cleaners', 'snow_removal', 'sportsbars', 'synagogues', 'yoga'];

var geoSearchDict = {
    'cajun': 'Cajun', 
    'churches': 'Churches', 
    'farming-equipment': 'Farming Equipment', 
    'italian': 'Italian', 
    'mexican': 'Mexican', 
    'pool_cleaners': 'Pool Cleaners', 
    'snow_removal': 'Snow Removal', 
    'sportsbars': 'Sportsbars', 
    'synagogues': 'Synagogues', 
    'yoga': 'Yoga'
}

var geoHighlighted = 'Yoga';

function geoSearch() {
    geoUl.style('display', 'block');
    var filter = geoInput.node().value.toUpperCase();

    // Loop through all list items, and hide those who don't match the search query
    var foundOne = false;
    geoLi.each(function(d, i) {
        var thisLi = d3.select(this),
            thisLiText = thisLi.text().toUpperCase();

        if (thisLiText.startsWith(filter)) {
            thisLi.style('display', '');
            foundOne = true;
        } else {
            thisLi.style('display', 'none');
        }
    });

    if (!foundOne) {
        geoUl.style('display', 'none');
    }

}

function initGeoSearch() {
    geoUl.selectAll('li').remove();

    geoInput.node().value = 'Yoga';

    geoSearchItems.forEach(function(d) {

        geoUl.append('li')
            .text(geoSearchDict[d])
            .attr('id', d)
            .on('click', function() {
                /*
                if (geoHighlightedCategories.indexOf(d.category_name) == -1) {
                    if (!geoHighlighted) {
                        addgeo(d.category_name);
                        geoHighlighted = true;
                        geoHighlightedCategories.push(d.category_name);
                    } else if (geoHighlightedCategories.indexOf(d.category_name) == -1) {
                        updategeo(d.category_name);
                        geoHighlightedCategories.pop();
                        geoHighlightedCategories.push(d.category_name);
                    }
                    //highlightedgeoComponent = d.key;
                    //geoCurrentlyHighlighted = true;
                    geoUl.style('display', 'none');
                }
                */
                if (geoSearchDict[d] != geoHighlighted) {
                    /*
                    geoMapCover
                        .transition()
                        .duration(600)
                        .style('opacity', 1)
                        .transition()
                        .duration(600)
                        .style('opacity', 0)
                    */

                    
                    geoImg.attr('src', 'assets/imgs/' + d + '.png');
                    geoInput.node().value = geoSearchDict[d];
                    geoHighlighted = geoSearchDict[d];
                }
                geoUl.style('display', 'none');
            })
    });

    geoLi = geoUl.selectAll('li');
        
    geoOverlay.on('click', function() {
        geoInput.node().value = geoHighlighted;
        geoUl.style('display', 'none');
    })

    geoInput
        .on('click', function() {
            geoInput.node().value = '';
            geoSearch();
        })
        .on('keyup', function() {geoSearch()})
}

initGeoSearch();


