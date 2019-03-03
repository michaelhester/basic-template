//---->GLOBAL VARIABLES FOR ALL<-----//
var windowW,
    windowH;

var previousWidth = 0;

var isDesktop = false,
    isTablet = false,
    isMobile = false;

function resizeGeneral() {
    windowW = window.innerWidth,
    windowH = window.innerHeight;

    isDesktop = false,
    isTablet = false,
    isMobile = false;

    if (windowW >= 1000) {
        isDesktop = true;
    } else if (windowW >= 764) {
        isTablet = true;
    } else {
        isMobile = true;
    } 

    initChart();
}

window.addEventListener('resize', function() {
    var currentWidth = window.innerWidth;
	if (previousWidth !== currentWidth) {
        previousWidth = currentWidth;

        resizeGeneral();
	}
})