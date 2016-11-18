function jsonp(url, callback) {
    var callbackName = 'X'
      , script = document.createElement('script');

    window[callbackName] = function(data) {
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

window.onload = function() {
    jsonp('http://roberval.chaordicsystems.com/challenge/challenge.json', function(res) {
        var referenceData = res.data.reference.item
          , recommendationData = res.data.recommendation
          , recommendationLength = recommendationData.length
          , referenceTpl = ''
          , recommendationTpl = ''
          , referenceElem = document.getElementById('reference')
          , recommendationElem = document.getElementById('recommendation')
          , sliderElem = document.getElementById('slider')
          , prevElem = document.getElementById('slider-prev')
          , nextElem = document.getElementById('slider-next')
          , i;

        referenceTpl = '<div class="showcase-item"><a href="http:' + referenceData['detailUrl'] + '" class="showcase-item__figure"><img src="http:' + referenceData['imageName'] + '" class="showcase-item__img"/></a>' +
          '<div class="showcase-item__body"><a href="http:' + referenceData['detailUrl'] + '" class="showcase-item__title">' + referenceData['name'].substr(0, 70) + '...</a>';
            if (referenceData['oldPrice'] !== null) {
                referenceTpl += '<div class="showcase-item__of">De: ' + referenceData['oldPrice'] + '</div>';
            }
            referenceTpl += '<div class="showcase-item__for">Por:&nbsp;<strong class="showcase-item__price">' + referenceData['price'] + '</strong>&nbsp;<br/>' + referenceData['productInfo']['paymentConditions'] + '<br/>sem juros</div>' +
          '</div>' +
        '</div>';

        referenceElem.innerHTML = referenceTpl;

        for (i = 0; i < recommendationLength; i++) {
            recommendationTpl += '<div class="slider-item"><div class="showcase-item"><a href="http:' + recommendationData[i]['detailUrl'] + '" class="showcase-item__figure"><img src="http:' + recommendationData[i]['imageName'] + '" class="showcase-item__img"/></a>' +
              '<div class="showcase-item__body"><a href="http:' + recommendationData[i]['detailUrl'] + '" class="showcase-item__title">' + recommendationData[i]['name'].substr(0, 70) + '...</a>';
                if (recommendationData[i]['oldPrice'] !== null) {
                    recommendationTpl += '<div class="showcase-item__of">De: ' + recommendationData[i]['oldPrice'] + '</div>';
                }
                recommendationTpl += '<div class="showcase-item__for">Por:&nbsp;<strong class="showcase-item__price">' + recommendationData[i]['price'] + '</strong>&nbsp;<br/>' + recommendationData[i]['productInfo']['paymentConditions'] + '<br/>sem juros</div>' +
              '</div>' +
            '</div></div>';
        }

        recommendationElem.innerHTML = recommendationTpl;

        var slides = document.getElementsByClassName('slider-item')
          , slidesLength = slides.length
          , slideWidth = slides[0].offsetWidth
          , sliderWidth = slideWidth * recommendationLength
          , posSlide = 0
          , max = sliderWidth - slideWidth;

        recommendationElem.style.width = sliderWidth + 'px';

        for (i = 0; i < slidesLength; i++) {
            slides[i].style.left = posSlide + 'px';
            posSlide += slideWidth;
        }

        prevElem.onclick = function(e){
            var currentleft = parseInt((recommendationElem.style.left).replace('px', ''))
              , prevLeft;

            if (-currentleft > 0) {
                prevLeft = currentleft + slideWidth;
                recommendationElem.style.left = prevLeft + 'px';
            }

            e.preventDefault();
        };

        nextElem.onclick = function(e){
            var currentleft = parseInt((recommendationElem.style.left).replace('px', ''))
              , nextLeft;

            if (isNaN(currentleft)) {
                currentleft = -0;
            }

            if (-currentleft < max) {
                nextLeft = currentleft - slideWidth;
                recommendationElem.style.left = nextLeft + 'px';
            }

            e.preventDefault();
        };
    });
}
