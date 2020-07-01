import 'whatwg-fetch';
import 'nodelist-foreach-polyfill';
import '../scss/style.scss';
import Choices from  '../../node_modules/choices.js/src/scripts/choices';
import 'owl.carousel';
import datepicker from 'js-datepicker';
import noUiSlider from "nouislider";

(function() 
{
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                              || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
          timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };

  if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };
}());

// Вывод svg

var imgSvg = document.querySelectorAll('.img-svg');

if(imgSvg.length)
{
  for(var i = 0; i < imgSvg.length; i++)
  {
      var img = imgSvg[i];
      var imgClass = img.getAttribute('class');
      var imgUrl = img.getAttribute('src');

      var request = new XMLHttpRequest();
      request.open('GET', imgUrl, false);

      request.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            // Success!
            var data = this.response;
            var parser = new DOMParser();
            var htmlSvg = parser.parseFromString(data, 'text/html');
            var svg = htmlSvg.querySelector('svg');

            svg.setAttribute('class', 'img-svg');
            // console.log(svg);

            // img.replaceWith(svg);
            img.parentElement.insertBefore(svg, img);
            img.parentElement.removeChild(img);
            
          }
          else 
          {
            console.log('error!');
          }
        };
        
        request.onerror = function(e) {
            console.log(e);
          // There was a connection error of some sort
        };
        
        request.send();
  }

}

// Слайдеры на главной


$('.top-companies-slider-wrapper').owlCarousel({
  loop:true, //Зацикливаем слайдер
  items:3,
  margin:20, //Отступ от элемента справа в 50px
  nav:true, //Отключение навигации
  dots: false,
  autoplay: false, //Автозапуск слайдера
  smartSpeed:300, //Время движения слайда
  autoplayTimeout:300, //Время смены слайда
  mouseDrag: false,
  touchDrag: false,
  navContainer: '.navigation-top-companies',
  navText: ["<div class='arrow-slider'><img src='./img/arrow_slider_left.svg'></div>", "<div class='arrow-slider'><img src='./img/arrow_slider_right.svg'></div>"],
  responsive:{ 
    0:{
        items:1
    },
    750:{
        items:2
    },
    1220:{
        items:3
    }
  }
});

$('.usage-steps-slider-wrapper').owlCarousel({
  loop:false, //Зацикливаем слайдер
  items:1,
  margin:0, //Отступ от элемента справа в 50px
  nav:true, //Отключение навигации
  dots: false,
  autoplay: false, //Автозапуск слайдера
  smartSpeed:300, //Время движения слайда
  autoplayTimeout:300, //Время смены слайда
  mouseDrag: false,
  touchDrag: false,
  autoHeight: true,
  navContainer: '.navigation-steps-slider',
  navText : ["<div class='arrow-steps arrow-steps__left'><img src='./img/arrow_right_step.svg' style='transform:rotateZ(180deg)'>Шаг <span></span></div>","<div class='arrow-steps arrow-steps__right'>Шаг <span></span><img src='./img/arrow_right_step.svg'></div>"],
  onInitialized: function(e) 
  {
    let nextSlider = 2;
    let prevSlider = 0;

    $('.arrow-steps__right span').text(nextSlider);
    let lengthSlider  = this.items().length;

    console.log(nextSlider);

    $('.navigation-steps-slider .owl-next').click(function()
    {
      if(nextSlider <= lengthSlider)
      {
        nextSlider++;
        prevSlider++;
        $('.arrow-steps__right span').text(nextSlider);
        $('.arrow-steps__left span').text(prevSlider);
      }
    });

    $('.navigation-steps-slider .owl-prev').click(function()
    {
      if(nextSlider > 2)
      {
        nextSlider--;
        prevSlider--;
        $('.arrow-steps__right span').text(nextSlider);
        $('.arrow-steps__left span').text(prevSlider);
      }
    });

  }

});

// Слайдер Похожие вакансии

$('.similar-vacancies-slider-wrapper').owlCarousel({
  loop:true, //Зацикливаем слайдер
  items:4,
  margin: 20,
  // margin:20, //Отступ от элемента справа в 50px
  nav:true, //Отключение навигации
  dots: false,
  autoplay: false, //Автозапуск слайдера
  smartSpeed:300, //Время движения слайда
  autoplayTimeout:300, //Время смены слайда
  mouseDrag: false,
  touchDrag: false,
  navContainer: '.navigation-similar-vacancies',
  navText: ["<div class='arrow-slider'><img src='./img/arrow_slider_left.svg'></div>", "<div class='arrow-slider'><img src='./img/arrow_slider_right.svg'></div>"],
  responsive:{ 
    0:{
      items: 1
    },
    550:{
        items:2
    },
    900:{
        items:3
    },
    1220:{
        items:4
    }
  }
});

// Слайдер Партнеры

$('.partners-slider-wrapper').owlCarousel({
  loop:true, //Зацикливаем слайдер
  margin:68, //Отступ от элемента справа в 50px
  nav:true, //Отключение навигации
  dots: false,
  autoplay: false, //Автозапуск слайдера
  smartSpeed:300, //Время движения слайда
  autoplayTimeout:300, //Время смены слайда
  mouseDrag: false,
  touchDrag: false,
  navContainer: '.navigation-partners',
  navText: ["<div class='arrow-slider'><img src='./img/arrow_slider_left.svg'></div>", "<div class='arrow-slider'><img src='./img/arrow_slider_right.svg'></div>"],
  responsive:{ 
    0:{
      items: 1,
      margin: 0
    },
    550:{
      items:3
    },
    800:{
      items:4
    },
    1281:{
      items:6
    }
  }
});

// Аккордеон

let accordionContentBlock = document.querySelectorAll('.accordion-content-block');

if(accordionContentBlock.length)
{
  accordionContentBlock.forEach((elem) => 
  {
    elem.addEventListener('click', function(e)
    {
      e.preventDefault();
      // elem.classList.toggle('accordion-content-block_hide');
      if(elem.classList.contains('accordion-content-block_hide'))
      {
        elem.classList.remove('accordion-content-block_hide');
        let contentBlock = elem.querySelector('.accordion-block-desc');
        showTextAccordion(contentBlock);
      }
      else 
      {
        elem.classList.add('accordion-content-block_hide');
        let contentBlock = elem.querySelector('.accordion-block-desc');
        hideTextAccordion(contentBlock);
      }
    })
  });
}

function showTextAccordion(elem)
{
  elem.style.height = elem.scrollHeight + 'px';
}

function hideTextAccordion(elem)
{
  elem.style.height = '0';
}
    

// Проверка изображения в карточке статьи

let articleBlocks = document.querySelectorAll('.article-block');

if(articleBlocks.length)
{
  articleBlocks.forEach(article => {
    if(!article.querySelector('.article-block__image'))
    {
      article.querySelector('.article-block__content').style.height = '100%';
    }
  });
}


// Кастомизированный селект

var elemsSelect = document.querySelectorAll('select');

function initChoices(data)
{
  if(data.length)
  {
    data.forEach(function(elem)
    {
      new Choices(elem, {
        choices: [],
        placeholder: true,
        searchEnabled: false,
        itemSelectText: ''
      });
    });
  }
}

initChoices(elemsSelect);

// Определение прокрутки шапки и задание фиксированной шапки

let headerHeight = document.querySelector('.header').clientHeight;
let headerScroll = document.querySelector('.header-scroll');
let headerScrollMobile = document.querySelector('.header-scroll-mobile');

function fixedAdaptiveHeader(block, height)
{
  var scroll = window.pageYOffset || document.documentElement.scrollTop;
    
  if (scroll >= height) 
  {
    block.classList.add('header_fixed');
  } 
  else 
  {
    block.classList.remove('header_fixed');
  }
}

if(window.matchMedia('(min-width: 651px)').matches)
{
	window.addEventListener('scroll', function()
  {
    fixedAdaptiveHeader(headerScroll, headerHeight);
  });

  fixedAdaptiveHeader(headerScroll, headerHeight);
}

if(window.matchMedia('(max-width: 650px)').matches)
{
	window.addEventListener('scroll', function()
  {
    fixedAdaptiveHeader(headerScrollMobile, headerHeight);
  });

  fixedAdaptiveHeader(headerScrollMobile, headerHeight);
}


// Для input[type="file"]

let inputFile = document.querySelectorAll('input[type="file"]');

if(inputFile.length)
{
    inputFile.forEach(function(input) 
    {
      input.addEventListener('change', function(e)
      {
          if(input.id === 'load-photo') return;
          var value = input.value;
          value = value.replace( 'C:\\fakepath\\', '');
          input.parentElement.querySelector('.file-value').innerHTML = value;
      });
    });
}


// Datapicker

let datepickerElems = document.querySelectorAll('input[data-picker="datepicker"]');

function initDatepicker(data)
{
 
  if(data.length)
  {
    data.forEach(elem => 
    {
      datepicker(elem, {
        formatter: (input, date, instance) => 
        {
          const value = date.toLocaleDateString();
          input.value = value; // => '1/1/2099'
        },
        startDay: 0,
        customDays: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
        customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        showAllDates: true, 
        overlayButton: 'Выбрать', 
        overlayPlaceholder: 'Укажите год'
      
      });
    });
  }
}

initDatepicker(datepickerElems);


// Карта

// Вставка скрипта api-key

function getScript(source, callback) 
{
  let script = document.createElement('script');
  let prior = document.getElementsByTagName('script')[0];
  script.async = 1;

  script.onload = script.onreadystatechange = function( _, isAbort ) {
      if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
          script.onload = script.onreadystatechange = null;
          script = undefined;

          if(!isAbort && callback) setTimeout(callback, 0);
      }
  };
  script.src = source;
  prior.parentNode.insertBefore(script, prior);
}


document.addEventListener('DOMContentLoaded', () => { 

  let vacanciesMap = document.querySelector('#vacancies-map');
  let companiesMap = document.querySelector('#companies-map');
  let favoritesVacanciesMap = document.querySelector('#favorites-vacancies-map');
  let resumesMap = document.querySelector('#resumes-map');
  let currentVacancyMap = document.querySelector('#current-vacancy-map');
  let currentCompanyMap = document.querySelector('#current-company-map');

  if(vacanciesMap)
  {
    fetch('./php/vacancies.php')
    .then(response => response.json())
    .then(data => {
        
        let apiKey = 'e158c5a2-b717-4552-9b2d-e21a7b7d540b';
        getScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=' + apiKey, function(){
            ymaps.ready(function () {

                let map = new ymaps.Map('vacancies-map', {
                    center: [55.751574, 37.573856],
                    zoom: 12,
                    controls: []
                });

                let objectManagerData = {
                    "type": "FeatureCollection",
                    "features": []
                };

                let MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                  '<div class="balloon-header-vacancy"><div class="balloon-header-vacancy__left"><p>$[properties.nameWork]</p><p>$[properties.salary]</p></div><div class="balloon-header-vacancy__right"><a class="button-text" href="current-vacancy.html"><img class="img-svg" src="./img/arrow_balloon.svg"></a></div></div>' +
                  '<div class="balloon-content-vacancy"><div class="balloon-content-vacancy-block"><div class="balloon-content-vacancy-block__image"><img src="$[properties.logoCompany]"></div><p class="balloon-content-vacancy-block__name">$[properties.nameCompany]</p></div></div>'
                );

                data.forEach((item, index) => {

                    let featureObj = {
                        "type": "Feature",
                        "id": index,
                        "geometry": {
                            "type": "Point", 
                            "coordinates": item.coords
                        }, 
                        "properties": {
                            "nameWork": item.nameWork,
                            "salary": item.salary,
                            "nameCompany": item.nameCompany,
                            "logoCompany":item.logoCompany
                        },
                        "options": {
                            "iconLayout": "default#image",
                            "iconColor": "#dc3535",
                            "iconImageHref": "./img/icon_pin.svg",
                            "iconImageSize": [33, 47],
                            "balloonOffset": [-70, -45],
                            "balloonContentLayout": MyBalloonContentLayout,
                            "hideIconOnBalloonOpen": false,
                            "balloonCloseButton": false,
                            "zIndex": 100,
                            "zIndexHover": 500,
                            "zIndexActive": 1000
                        }
                    };

                    objectManagerData["features"].push(featureObj);
                });

                let objectManager = new ymaps.ObjectManager({
                    clusterize: true,
                    gridSize: 128,
                    // clusterIconLayout: "default#pieChart",
                    // clusterIconLayout: "custom#icon",
                    clusterIconPieChartStrokeWidth: 0,
                    clusterDisableClickZoom: false
                });

                objectManager.clusters.options.set({
                  clusterIconLayout: ymaps.templateLayoutFactory.createClass('<div class="cluster-icon">{{ properties.geoObjects.length }}</div>')
                });

                map.geoObjects.add(objectManager);
                objectManager.add(objectManagerData);
                map.setBounds(map.geoObjects.getBounds(), {
                  checkZoomRange: true
                });

                objectManager.objects.events.add('click', function (e) {

                    var objectId = e.get('objectId');
                    if (objectManager.objects.balloon.isOpen(objectId)) {
                        objectManager.objects.balloon.close();
                    }

                    map.events.add('click', function (e) 
                    {
                      if(e.get('target') === map) 
                      { 
                        objectManager.objects.balloon.close();
                      }
                    });
                });

                objectManager.objects.events.add('balloonopen', function(e) {
                    objectManager.objects.setObjectOptions(e.get('target')._objectIdWithOpenBalloon, {'iconImageHref': './img/icon_pin_active.svg', 'zIndex': 1000});
                });

                objectManager.objects.events.add('balloonclose', function(e) {
                    objectManager.objects.setObjectOptions(e.get('target')._objectIdWithOpenBalloon, {'iconImageHref': './img/icon_pin.svg', 'zIndex': 250});
                });

            })
          })
      });

  }
  if(companiesMap)
  {
    fetch('./php/companies.php')
    .then(response => response.json())
    .then(data => {
        
      let apiKey = 'e158c5a2-b717-4552-9b2d-e21a7b7d540b';
      getScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=' + apiKey, function(){
          ymaps.ready(function () {

              let map = new ymaps.Map('companies-map', {
                  center: [55.751574, 37.573856],
                  zoom: 12,
                  controls: []
              })

              let objectManagerData = {
                  "type": "FeatureCollection",
                  "features": []
              };

              
              let MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="balloon-header-companies"><div class="balloon-header-companies__left"><div class="balloon-content-companies-block"><div class="balloon-content-companies-block__image"><img src="$[properties.logoCompany]"></div><p class="balloon-content-companies-block__name">$[properties.nameCompany]</p></div></div><div class="balloon-header-companies__right"><a class="button-text" href="current-company.html"><img class="img-svg" src="./img/arrow_balloon.svg"></a></div></div>'
              );

              data.forEach((item, index) => {

                  let featureObj = {
                      "type": "Feature",
                      "id": index,
                      "geometry": {
                          "type": "Point", 
                          "coordinates": item.coords
                      }, 
                      "properties": {
                          "nameCompany": item.nameCompany,
                          "logoCompany":item.logoCompany
                      },
                      "options": {
                          "iconLayout": "default#image",
                          "iconColor": "#dc3535",
                          "iconImageHref": "./img/icon_pin.svg",
                          "iconImageSize": [33, 47],
                          "balloonOffset": [-70, -45],
                          "balloonContentLayout": MyBalloonContentLayout,
                          "hideIconOnBalloonOpen": false,
                          "balloonCloseButton": false,
                          "zIndex": 100,
                          "zIndexHover": 500,
                          "zIndexActive": 1000
                      }
                  };

                  objectManagerData["features"].push(featureObj);
              });

              let objectManager = new ymaps.ObjectManager({
                  clusterize: true,
                  gridSize: 128,
                  clusterIconLayout: "default#pieChart",
                  clusterIconPieChartStrokeWidth: 0
              });

              objectManager.clusters.options.set({
                clusterIconLayout: ymaps.templateLayoutFactory.createClass('<div class="cluster-icon">{{ properties.geoObjects.length }}</div>')
              });

              map.geoObjects.add(objectManager);
              objectManager.add(objectManagerData);
              map.setBounds(map.geoObjects.getBounds());

              objectManager.objects.events.add('click', function (e) {

                  var objectId = e.get('objectId');
                  if (objectManager.objects.balloon.isOpen(objectId)) {
                      objectManager.objects.balloon.close();
                  }

                  map.events.add('click', function (e) 
                  {
                    if(e.get('target') === map) 
                    { 
                      objectManager.objects.balloon.close();
                    }
                  });
              });

              objectManager.objects.events.add('balloonopen', function(e) {
                  objectManager.objects.setObjectOptions(e.get('target')._objectIdWithOpenBalloon, {'iconImageHref': './img/icon_pin_active.svg', 'zIndex': 1000});
              });

              objectManager.objects.events.add('balloonclose', function(e) {
                  objectManager.objects.setObjectOptions(e.get('target')._objectIdWithOpenBalloon, {'iconImageHref': './img/icon_pin.svg', 'zIndex': 250});
              });

          })
      })
    });
  }
  if(favoritesVacanciesMap)
  {
    fetch('./php/favorites-vacancies.php')
    .then(response => response.json())
    .then(data => {
        
        let apiKey = 'e158c5a2-b717-4552-9b2d-e21a7b7d540b';
        getScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=' + apiKey, function(){
            ymaps.ready(function () 
            {

              let map = new ymaps.Map('favorites-vacancies-map', {
                  center: [55.751574, 37.573856],
                  zoom: 12,
                  controls: []
              })

              let objectManagerData = {
                  "type": "FeatureCollection",
                  "features": []
              };

              
              let MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="balloon-header-vacancy"><div class="balloon-header-vacancy__left"><p>$[properties.nameWork]</p><p>$[properties.salary]</p></div><div class="balloon-header-vacancy__right"><a class="button-text" href="current-vacancy.html"><img class="img-svg" src="./img/arrow_balloon.svg"></a></div></div>' +
                '<div class="balloon-content-vacancy"><div class="balloon-content-vacancy-block"><div class="balloon-content-vacancy-block__image"><img src="$[properties.logoCompany]"></div><p class="balloon-content-vacancy-block__name">$[properties.nameCompany]</p></div></div>'
              );

              data.forEach((item, index) => {

                  let featureObj = {
                      "type": "Feature",
                      "id": index,
                      "geometry": {
                          "type": "Point", 
                          "coordinates": item.coords
                      }, 
                      "properties": {
                          "nameWork": item.nameWork,
                          "salary": item.salary,
                          "nameCompany": item.nameCompany,
                          "logoCompany":item.logoCompany
                      },
                      "options": {
                          "iconLayout": "default#image",
                          "iconColor": "#dc3535",
                          "iconImageHref": "./img/icon_pin.svg",
                          "iconImageSize": [33, 47],
                          "balloonOffset": [-70, -45],
                          "balloonContentLayout": MyBalloonContentLayout,
                          "hideIconOnBalloonOpen": false,
                          "balloonCloseButton": false,
                          "zIndex": 100,
                          "zIndexHover": 500,
                          "zIndexActive": 1000
                      }
                  };

                  objectManagerData["features"].push(featureObj);
              });

              let objectManager = new ymaps.ObjectManager({
                  clusterize: true,
                  gridSize: 128,
                  clusterIconLayout: "default#pieChart",
                  clusterIconPieChartStrokeWidth: 0
              });

              objectManager.clusters.options.set({
                clusterIconLayout: ymaps.templateLayoutFactory.createClass('<div class="cluster-icon">{{ properties.geoObjects.length }}</div>')
              });

              map.geoObjects.add(objectManager);
              objectManager.add(objectManagerData);
              map.setBounds(map.geoObjects.getBounds());

              objectManager.objects.events.add('click', function (e) {

                  var objectId = e.get('objectId');
                  if (objectManager.objects.balloon.isOpen(objectId)) {
                      objectManager.objects.balloon.close();
                  }

                  map.events.add('click', function (e) 
                  {
                    if(e.get('target') === map) 
                    { 
                      objectManager.objects.balloon.close();
                    }
                  });
              });

              objectManager.objects.events.add('balloonopen', function(e) {
                  objectManager.objects.setObjectOptions(e.get('target')._objectIdWithOpenBalloon, {'iconImageHref': './img/icon_pin_active.svg', 'zIndex': 1000});
              });

              objectManager.objects.events.add('balloonclose', function(e) {
                  objectManager.objects.setObjectOptions(e.get('target')._objectIdWithOpenBalloon, {'iconImageHref': './img/icon_pin.svg', 'zIndex': 250});
              });

            })
        })
    });
  }
  if(resumesMap)
  {
    fetch('./php/resumes.php')
    .then(response => response.json())
    .then(data => {
        
        let apiKey = 'e158c5a2-b717-4552-9b2d-e21a7b7d540b';
        getScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=' + apiKey, function(){
            ymaps.ready(function () 
            {

              let map = new ymaps.Map('resumes-map', {
                  center: [55.751574, 37.573856],
                  zoom: 12,
                  controls: []
              })

              let objectManagerData = {
                  "type": "FeatureCollection",
                  "features": []
              };

              
              let MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="balloon-resume"><div class="balloon-resume-left"><p class="balloon-resume-left__work">$[properties.nameWork]</p><p class="balloon-resume-left__salary">$[properties.salary]</p><p class="balloon-resume-left__name">$[properties.nameResume]</p></div><div class="balloon-resume-right"><a href="#"><img src="./img/arrow_balloon.svg"></a></div></div>'
              );

              data.forEach((item, index) => {

                  let featureObj = {
                      "type": "Feature",
                      "id": index,
                      "geometry": {
                          "type": "Point", 
                          "coordinates": item.coords
                      }, 
                      "properties": {
                          "nameWork": item.nameWork,
                          "salary": item.salary,
                          "nameResume": item.nameResume
                          // "nameCompany": item.nameCompany,
                          // "logoCompany":item.logoCompany
                      },
                      "options": {
                          "iconLayout": "default#image",
                          "iconColor": "#dc3535",
                          "iconImageHref": "./img/icon_pin.svg",
                          "iconImageSize": [33, 47],
                          "balloonOffset": [-70, -45],
                          "balloonContentLayout": MyBalloonContentLayout,
                          "hideIconOnBalloonOpen": false,
                          "balloonCloseButton": false,
                          "zIndex": 100,
                          "zIndexHover": 500,
                          "zIndexActive": 1000
                      }
                  };

                  objectManagerData["features"].push(featureObj);
              });

              let objectManager = new ymaps.ObjectManager({
                  clusterize: true,
                  gridSize: 128,
                  clusterIconLayout: "default#pieChart",
                  clusterIconPieChartStrokeWidth: 0
              });

              objectManager.clusters.options.set({
                clusterIconLayout: ymaps.templateLayoutFactory.createClass('<div class="cluster-icon">{{ properties.geoObjects.length }}</div>')
              });

              map.geoObjects.add(objectManager);
              objectManager.add(objectManagerData);
              map.setBounds(map.geoObjects.getBounds());

              objectManager.objects.events.add('click', function (e) {

                  var objectId = e.get('objectId');
                  if (objectManager.objects.balloon.isOpen(objectId)) {
                      objectManager.objects.balloon.close();
                  }

                  map.events.add('click', function (e) 
                  {
                    if(e.get('target') === map) 
                    { 
                      objectManager.objects.balloon.close();
                    }
                  });
              });

              objectManager.objects.events.add('balloonopen', function(e) {
                  objectManager.objects.setObjectOptions(e.get('target')._objectIdWithOpenBalloon, {'iconImageHref': './img/icon_pin_active.svg', 'zIndex': 1000});
              });

              objectManager.objects.events.add('balloonclose', function(e) {
                  objectManager.objects.setObjectOptions(e.get('target')._objectIdWithOpenBalloon, {'iconImageHref': './img/icon_pin.svg', 'zIndex': 250});
              });

            })
        })
    });
  }
  if(currentVacancyMap)
  {
    fetch('./php/current-vacancy.php')
    .then(response => response.json())
    .then(data => {
        
        let apiKey = 'e158c5a2-b717-4552-9b2d-e21a7b7d540b';
        getScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=' + apiKey, function(){
            ymaps.ready(function () 
            {

              let map = new ymaps.Map('current-vacancy-map', {
                  center: [55.751574, 37.573856],
                  zoom: 12,
                  controls: []
              })

              let objectManagerData = {
                  "type": "FeatureCollection",
                  "features": []
              };

              
              let MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="balloon-header-vacancy"><div class="balloon-header-vacancy__left"><p>$[properties.nameWork]</p><p>$[properties.salary]</p></div><div class="balloon-header-vacancy__right"><a class="button-text" href="current-vacancy.html"><img class="img-svg" src="./img/arrow_balloon.svg"></a></div></div>' +
                '<div class="balloon-content-vacancy"><div class="balloon-content-vacancy-block"><div class="balloon-content-vacancy-block__image"><img src="$[properties.logoCompany]"></div><p class="balloon-content-vacancy-block__name">$[properties.nameCompany]</p></div></div>'
              );

              data.forEach((item, index) => {

                  let featureObj = {
                      "type": "Feature",
                      "id": index,
                      "geometry": {
                          "type": "Point", 
                          "coordinates": item.coords
                      }, 
                      "properties": {
                          "nameWork": item.nameWork,
                          "salary": item.salary,
                          "nameCompany": item.nameCompany,
                          "logoCompany":item.logoCompany
                      },
                      "options": {
                          "iconLayout": "default#image",
                          "iconColor": "#dc3535",
                          "iconImageHref": "./img/icon_marker_address.svg",
                          "iconImageSize": [47, 55],
                          "balloonOffset": [-70, -45],
                          "balloonContentLayout": MyBalloonContentLayout,
                          "hideIconOnBalloonOpen": false,
                          "balloonCloseButton": false,
                          "zIndex": 100,
                          "zIndexHover": 500,
                          "zIndexActive": 1000
                      }
                  };

                  objectManagerData["features"].push(featureObj);
              });

              let objectManager = new ymaps.ObjectManager({
                  clusterize: true,
                  gridSize: 128,
                  clusterIconLayout: "default#pieChart",
                  clusterIconPieChartStrokeWidth: 0
              });

              objectManager.clusters.options.set({
                clusterIconLayout: ymaps.templateLayoutFactory.createClass('<div class="cluster-icon">{{ properties.geoObjects.length }}</div>')
              });

              map.geoObjects.add(objectManager);
              objectManager.add(objectManagerData);
              map.setBounds(map.geoObjects.getBounds());

              objectManager.objects.events.add('click', function (e) {

                  var objectId = e.get('objectId');
                  if (objectManager.objects.balloon.isOpen(objectId)) {
                      objectManager.objects.balloon.close();
                  }

                  map.events.add('click', function (e) 
                  {
                    if(e.get('target') === map) 
                    { 
                      objectManager.objects.balloon.close();
                    }
                  });
              });

              // objectManager.objects.events.add('balloonopen', function(e) {
              //     objectManager.objects.setObjectOptions(e.get('target')._objectIdWithOpenBalloon, {'iconImageHref': './img/icon_pin_active.svg', 'zIndex': 1000});
              // });

              // objectManager.objects.events.add('balloonclose', function(e) {
              //     objectManager.objects.setObjectOptions(e.get('target')._objectIdWithOpenBalloon, {'iconImageHref': './img/icon_pin.svg', 'zIndex': 250});
              // });

            })
        })
    });
  }
  if(currentCompanyMap)
  {
    fetch('./php/current-company.php')
    .then(response => response.json())
    .then(data => {
        
        let apiKey = 'e158c5a2-b717-4552-9b2d-e21a7b7d540b';
        getScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=' + apiKey, function(){
            ymaps.ready(function () 
            {

              let map = new ymaps.Map('current-company-map', {
                  center: [55.751574, 37.573856],
                  zoom: 12,
                  controls: []
              })

              let objectManagerData = {
                  "type": "FeatureCollection",
                  "features": []
              };

              
              let MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="balloon-header-companies"><div class="balloon-header-companies__left"><div class="balloon-content-companies-block"><div class="balloon-content-companies-block__image"><img src="$[properties.logoCompany]"></div><p class="balloon-content-companies-block__name">$[properties.nameCompany]</p></div></div><div class="balloon-header-companies__right"><a class="button-text" href="current-company.html"><img class="img-svg" src="./img/arrow_balloon.svg"></a></div></div>'
              );

              data.forEach((item, index) => {

                  let featureObj = {
                      "type": "Feature",
                      "id": index,
                      "geometry": {
                          "type": "Point", 
                          "coordinates": item.coords
                      }, 
                      "properties": {
                          "nameWork": item.nameWork,
                          "salary": item.salary,
                          "nameCompany": item.nameCompany,
                          "logoCompany":item.logoCompany
                      },
                      "options": {
                          "iconLayout": "default#image",
                          "iconColor": "#dc3535",
                          "iconImageHref": "./img/icon_marker_address.svg",
                          "iconImageSize": [47, 55],
                          "balloonOffset": [-70, -45],
                          "balloonContentLayout": MyBalloonContentLayout,
                          "hideIconOnBalloonOpen": false,
                          "balloonCloseButton": false,
                          "zIndex": 100,
                          "zIndexHover": 500,
                          "zIndexActive": 1000
                      }
                  };

                  objectManagerData["features"].push(featureObj);
              });

              let objectManager = new ymaps.ObjectManager({
                  clusterize: true,
                  gridSize: 128,
                  clusterIconLayout: "default#pieChart",
                  clusterIconPieChartStrokeWidth: 0
              });

              objectManager.clusters.options.set({
                clusterIconLayout: ymaps.templateLayoutFactory.createClass('<div class="cluster-icon">{{ properties.geoObjects.length }}</div>')
              });

              map.geoObjects.add(objectManager);
              objectManager.add(objectManagerData);
              map.setBounds(map.geoObjects.getBounds());

              objectManager.objects.events.add('click', function (e) {

                  var objectId = e.get('objectId');
                  if (objectManager.objects.balloon.isOpen(objectId)) {
                      objectManager.objects.balloon.close();
                  }

                  map.events.add('click', function (e) 
                  {
                    if(e.get('target') === map) 
                    { 
                      objectManager.objects.balloon.close();
                    }
                  });
              });

              // objectManager.objects.events.add('balloonopen', function(e) {
              //     objectManager.objects.setObjectOptions(e.get('target')._objectIdWithOpenBalloon, {'iconImageHref': './img/icon_pin_active.svg', 'zIndex': 1000});
              // });

              // objectManager.objects.events.add('balloonclose', function(e) {
              //     objectManager.objects.setObjectOptions(e.get('target')._objectIdWithOpenBalloon, {'iconImageHref': './img/icon_pin.svg', 'zIndex': 250});
              // });

            })
        })
    });
  }
});

// Форма Поделиться 

let radioShareVk = document.querySelector('#share-vk');
let radioShareEmail = document.querySelector('#share-email');
let dataEmailShare = document.querySelector('.data-email-share');
let submitShareEmail = document.querySelector('input[name="submit-share-email"]');
let submitShareVk = document.querySelector('#submit-share-vk');

if(radioShareVk && radioShareEmail)
{
  radioShareVk.addEventListener('change', () => {
    if(radioShareVk.checked)
    {
      dataEmailShare.style.display = 'none';
      submitShareEmail.style.display = 'none';
      submitShareVk.style.display = 'inline-block';
      submitShareVk.addEventListener('click', (e) =>
      {
        e.preventDefault();

        let url_share = location.href;
        let url_soc = "https://vk.com/share.php?url="+url_share;
        // размеры окна
        let width = 800, height = 500;
        // центруем окно
        var left = (window.screen.width - width) / 2;
        var top = (window.screen.height - height) / 2;
        // открываем окно
        let social_window = window.open(url_soc, "share_window", "height=" + height + ",width=" + width + ",top=" + top + ",left=" + left);
        // устанавливаем на окно фокус
        social_window.focus();
      });
    }
  });

  radioShareEmail.addEventListener('change', () => {
    if(radioShareEmail.checked)
    {
      dataEmailShare.style.display = 'inline-block';
      submitShareEmail.style.display = 'inline-block';
      submitShareVk.style.display = 'none';
    }
  });
}


// Скрыть и показать пароль

let togglePassword = document.querySelectorAll('.toggle-password');

if(togglePassword.length)
{
  togglePassword.forEach(elem => 
  {
    elem.addEventListener('click', (e) => 
    {
      e.preventDefault();
      let inputPassword = elem.parentElement.querySelector('input[name="password"]');
      inputPassword.type === 'password' ? inputPassword.type = 'text' : inputPassword.type = 'password';
    });
  });
}

// Проверка откликов в резюме 

let resumesFeedback = document.querySelectorAll('.resumes-content-row-block.resumes-feedback-column p');

if(resumesFeedback.length)
{
  resumesFeedback.forEach(elem => {
    elem.innerHTML === '0' ? elem.style.color = '#b7b6c3' : elem.style.borderBottom = '1px dashed currentColor';
  });
}


// Блок Перезвонить мне 

let callMe = document.querySelector('#call-me');
let callMyself = document.querySelector('#call-myself');
let timeCall = document.querySelector('.block-radio .choices');

if(callMe && callMyself)
{
  timeCall.classList.add('disabled');
  [callMe, callMyself].forEach(elem => {
    elem.addEventListener('change', () => {
      if(elem.checked)
      {
        timeCall.classList.toggle('disabled');
      }
    });
  });
}


// Добавление другой должности 

let addOtherPosition = document.querySelector('.add-other-position');
let otherPositionBlock = document.querySelector('.other-position__block');
let indexPosition = 1;

if(addOtherPosition)
{
  addOtherPosition.addEventListener('click', (e) => {
    e.preventDefault();
    let newPosition = document.createElement('input');
    indexPosition++;
    newPosition.type = "text";
    newPosition.id = 'other-position' + indexPosition;
    newPosition.name = 'other-position' + indexPosition;
    newPosition.placeholder = 'ДРУГАЯ ДОЛЖНОСТЬ';
    newPosition.style.marginTop = '7px';
    otherPositionBlock.appendChild(newPosition);
  });
}

// Выбор способа рассылки

let mailingMethodOption = document.querySelector('.mailing-method-option');
let buttonMailingPhone = document.querySelector('#mailing-phone');
let buttonMailingEmail = document.querySelector('#mailing-email');


if(buttonMailingPhone && buttonMailingEmail)
{
  [buttonMailingEmail, buttonMailingPhone].forEach(button => {
    button.addEventListener('change', () => {
      let option = button.id;
      if(mailingMethodOption.querySelector('.mailing-method-option_selected').dataset.option !== option)
      {
        mailingMethodOption.querySelector('.mailing-method-option_selected').classList.remove('mailing-method-option_selected');
        mailingMethodOption.querySelector('div[data-option="' + option + '"]').classList.add('mailing-method-option_selected');
      }
    });
  });
}

// Загрузка фото

// let canvasPhoto = document.querySelector('#canvas-photo');

let loadPhoto = document.querySelector('#load-photo');
let photoBlock = document.querySelector('.load-photo__block');

if(loadPhoto && photoBlock)
{
  // let ctx = canvasPhoto.getContext("2d");

  // let initialAvatar = new Image();

  // Загружаем файл изображения

  // initialAvatar.src = "../img/img_substrate_employee.png";

  // initialAvatar.onload = function() 
  // {
  //   ctx.drawImage(initialAvatar, 0, 0, 210, 210);
  // }

  loadPhoto.addEventListener('change', () => {

    let file = loadPhoto.files[0];
    let img;
    let reader = new FileReader();
  
    reader.onload = drawNewImage;
    reader.readAsDataURL(file);
  
    function drawNewImage()
    {
      img = new Image();
      img.src = reader.result;

      img.onload = function() 
      {
        // 1 способ через канвас без масштабирования
        // ctx.drawImage(img, 0, 0, 210, 210);

        // 2 способ через канвас с масштабированием
        // let scaleFactor = Math.min((canvasPhoto.width / img.width),(canvasPhoto.height / img.height));
        // ctx.drawImage(img,0,0,img.width*scaleFactor,img.height*scaleFactor);
        // console.log(canvasPhoto.width, canvasPhoto.height, img.width, img.height, scaleFactor);

        // 3 способ через background

        photoBlock.style.backgroundImage = 'url(' + img.src + ')';
      }
     
    }

  });
}


// Выбор должности

let blockChoicePosition = document.querySelectorAll('.block-choice-position');

function choicePosition(data)
{
  if(data.length)
  {
    data.forEach(elem => {
      let select = elem.querySelector('select');
      let input = elem.querySelector('input');

      select.addEventListener('change', () => {
        if(select.value === 'other')
        {
          input.removeAttribute('disabled');
        }
        else 
        {
          input.setAttribute('disabled', 'disabled');
        }
      });
    });
  }
}

choicePosition(blockChoicePosition);


// Добавить другой город

let addOtherCity = document.querySelectorAll('.add-other-city');
let indexCity = 0

if(addOtherCity.length)
{
  addOtherCity.forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      let newCity = document.createElement('input');
      indexCity++;
      newCity.type = "text";
      newCity.id = 'other-city' + indexCity;
      newCity.name = 'other-city' + indexCity;
      newCity.placeholder = 'ГОРОД';
      newCity.style.marginTop = '7px';
      elem.parentElement.parentElement.querySelector('.block-post-resume').appendChild(newCity);
    });
  });
}

// Добавление места работы 

let addPlaceWork = document.querySelectorAll('.add-place-work');

if(addPlaceWork.length)
{
  let indexPlacework = 0;

  addPlaceWork.forEach(elem => 
  {
    elem.addEventListener('click', (e) => 
    {
      e.preventDefault();
     
      indexPlacework++;

      let tempateForm = `
        <div class="data-form-experience">
          <div class="block-mb-yellow">
            <label for="company${indexPlacework}">Компания</label>
            <input type="text" name="company${indexPlacework}" id="company${indexPlacework}" placeholder="КОМПАНИЯ">
          </div>
          <div class="block-mb-orange block-choice-position">
              <label for="position${indexPlacework}">Желаемая должность</label>
              <select name="position${indexPlacework}" id="position${indexPlacework}">
                  <option value="1">Должность 1</option>
                  <option value="2">Должность 2</option>
                  <option value="3">Должность 3</option>
                  <option value="other">Другая</option>
              </select>
              <div class="block-mb-yellow">
                <input type="text" name="other-position${indexPlacework}" id="other-position${indexPlacework}" placeholder="ЖЕЛАЕМАЯ ДОЛЖНОСТЬ">
              </div>
          </div>
          <div class="block-mb-yellow">
              <div class="work-period">
                  <p>Период работы</p>
                  <div class="work-period__block">
                      <p>с</p>
                      <input type="text" name="start-work${indexPlacework}" data-picker="datepicker" id="start-work${indexPlacework}">
                  </div>
                  <div class="work-period__block">
                      <p>по</p>
                      <input type="text" name="end-work${indexPlacework}" data-picker="datepicker" id="end-work${indexPlacework}">
                  </div>
              </div>
          </div>
          <div class="block-mb-yellow">
              <div class="block-checkbox">
                  <label for="working${indexPlacework}">
                      <input type="checkbox" id="working${indexPlacework}" name="working${indexPlacework}" hidden>
                      <div class="check"></div>
                      <p>Работаю в данный момент</p>
                  </label>
              </div>
          </div>
          <div class="block-mb-yellow">
              <label for="city-work${indexPlacework}">Город</label>
              <select name="city-work${indexPlacework}" id="city-work${indexPlacework}">
                  <option value="month">Москва</option>
                  <option value="week">Казань</option>
                  <option value="year">Нижний Новгород</option>
              </select>
          </div>
          <div class="block-mb-green">
              <label for="responsibility${indexPlacework}">Обязанности</label>
              <textarea name="responsibility${indexPlacework}" id="responsibility${indexPlacework}"></textarea>
          </div>
        </div>`;

      elem.parentElement.insertAdjacentHTML('beforebegin', tempateForm);

      let dataFormNew = document.querySelectorAll('.data-form-experience')[indexPlacework];
      let datepickerElemsNew = dataFormNew.querySelectorAll('input[data-picker="datepicker"]');
      let selectsNew = dataFormNew.querySelectorAll('select');
      let blockChoicePositionNew = dataFormNew.querySelectorAll('.block-choice-position');

      initDatepicker(datepickerElemsNew);
      initChoices(selectsNew);
      choicePosition(blockChoicePositionNew);

    });
  });
}


// Формы в модальных окнах

let shadow = document.querySelector('.wrapper-shadow');
let closeModal = document.querySelectorAll('.close-modal a');
let arrayFields = [shadow, ...closeModal];

let buttonFeedback = document.querySelectorAll('.button-feedback');
let modalFeedback = document.querySelector('#modal-feedback');

let buttonFilter = document.querySelectorAll('.button-filter');
let modalFilter = document.querySelector('#modal-filter');

let buttonAccount = document.querySelectorAll('.button-account');
let modalAccount = document.querySelector('#modal-account');

let buttonDetailedSearch = document.querySelectorAll('.button-detailed-search');
let modalDetailedSearch = document.querySelector('#detailed-search');

let buttonAppBanner = document.querySelectorAll('.button-app-banner');
let modalAppBanner = document.querySelector('#modal-app-banner');


function checkFormPostPicture(button)
{
  let currentForm = button.parentElement;
  // let valid = true;

  const fieldRadio = currentForm.querySelector('input[type="radio"]:checked');
  // const fieldsRadio = currentForm.querySelectorAll('input[type="radio"]');

  // if(!fieldRadio)
  // {
  //   fieldsRadio.forEach((input) => input.classList.add('check-error'));
  //   valid = false;
  // }

  // if(valid)
  // {
    // fieldsRadio.forEach((input) => input.classList.remove('check-error'));

    let bannerInfo = document.querySelector('.banner-info');
    let sizesBanner = currentForm.elements[0].value;
    let countDays = fieldRadio.value;
    // let allRadio = Array.from(currentForm.querySelectorAll('input[type="radio"]'));
  
    // allRadio.forEach(elem => 
    // {
    //   if(elem.checked)
    //   {
    //     countDays = elem.value;
    //   }
    // });

    bannerInfo.innerHTML = `Баннер ${sizesBanner} сроком на ${countDays}`;
    return true;

  // }
  // else 
  // {
  //   return false;
  // }
}

const animationModalForm = fn =>
{
  window.requestAnimationFrame(function()
  {
    window.requestAnimationFrame(function()
    {
      fn();
    });
  });
}

function viewForm(buttons, form)
{
  buttons.forEach(button => 
  {
    button.addEventListener('click', (e) => 
    {
      e.preventDefault();

      if(button.classList.contains('button-app-banner'))
      {
        if(!checkFormPostPicture(button)) return;
      }

      let closeModal = form.querySelector('.close-modal a');

      shadow.appendChild(form);
      document.body.classList.add('disabled');
      shadow.classList.add('wrapper-shadow_active');
      
      animationModalForm(function() 
      {
        form.classList.add('modal-form_active');
      });
      
     
      shadow.addEventListener('click', (e) => 
      {
        if(e.target.classList.contains('wrapper-shadow'))
        {
          e.preventDefault();
        
          form.classList.remove('modal-form_active'); 
          shadow.classList.remove('wrapper-shadow_active');
          document.body.appendChild(form);
          document.body.classList.remove('disabled');
        
          setTimeout(() => 
          {
            shadow.innerHTML = '';
          }, 500);
        }
       
      });

      closeModal.addEventListener('click', function(e)
      {
        e.preventDefault();
        
        form.classList.remove('modal-form_active'); 
        shadow.classList.remove('wrapper-shadow_active');
        document.body.appendChild(form);
        document.body.classList.remove('disabled');
      
        setTimeout(() => 
        {
          shadow.innerHTML = '';
        }, 500);

      });
      
      // form.addEventListener('click', e => e.preventDefault());
    });
  });
}

if(buttonFeedback.length)
{
  viewForm(buttonFeedback, modalFeedback);
}
if(buttonFilter.length)
{
  viewForm(buttonFilter, modalFilter);
}
if(buttonAccount.length)
{
  viewForm(buttonAccount, modalAccount);
}
if(buttonDetailedSearch.length)
{
  viewForm(buttonDetailedSearch, modalDetailedSearch);
}
if(buttonAppBanner.length)
{
  viewForm(buttonAppBanner, modalAppBanner);
}


// Валидация формы и отправка данных

const forms = document.querySelectorAll('form[data-ajax="true"]');

if(forms.length)
{
  validationForms(forms);
}

function validationForms(forms)
{
  forms.forEach(function(form)
  {
    // Подпишемся на событие отправки
    form.addEventListener('submit', function(e)
    {
      e.preventDefault();
    
      let valid = true;

      // Проверим все текстовые инпуты

      const fieldsText = form.querySelectorAll('input[type="text"][data-required="true"]');

      fieldsText.forEach(function(input)
      {
        // if(input.style.display === 'none') console.log('yes');
        if(getComputedStyle(input, null).display === 'none' || input.disabled)
        {
          input.classList.remove('field-error');
          return;
        }

        if(!checkFieldText(input)) valid = false;
      });

      // Проверим все textarea

      const fieldsTextarea = form.querySelectorAll('textarea[data-required="true"]');

      fieldsTextarea.forEach(function(textarea)
      {
        if(getComputedStyle(textarea, null).display === 'none' || textarea.disabled)
        {
          textarea.classList.remove('field-error');
          return;
        }

        if(!checkFieldTextarea(textarea)) valid = false;
      });

      // Проверим все чекбоксы

      // const fieldsCheckbox = form.querySelectorAll('input[type="checkbox"]');

      // fieldsCheckbox.forEach(function(input)
      // {
      //   if(input.style.display === 'none') return;
      //   if(!checkFieldCheckbox(input)) valid = false;
      // });

      // Проверим все радиокнопки

      // const fieldsRadio = form.querySelectorAll('input[type="radio"]');

      // fieldsRadio.forEach(function(input)
      // {
      //   if(input.style.display === 'none') return;
      //   if(!checkFieldCheckbox(input)) valid = false;
      // });

      // Проверка пароля

      const fieldsPassword = form.querySelectorAll('input[type="password"]');

      fieldsPassword.forEach(function(input)
      {
        if(getComputedStyle(input, null).display === 'none' || input.disabled)
        {
          input.classList.remove('field-error');
          return;
        }

        if(!checkFieldPassword(input)) valid = false;
      });

      
      // Если были ошибки, не отправляем форму

      if(valid)
      {
        sendForm(form);
      }

    });
  });
}

function checkFieldText(input) 
{
  var errorClass = 'field-error';
  var pattern = input.pattern;
  var result;
  var value = input.value;
  
  result = value.match(pattern);
  result ? input.classList.remove(errorClass) : input.classList.add(errorClass);
  return result;
}

function checkFieldCheckbox(input) 
{
  var errorClass = 'check-error';
  const result = input.checked;
  result ? input.classList.remove(errorClass) : input.classList.add(errorClass);
  return result;
}

function checkFieldTextarea(textarea)
{
  var errorClass = 'field-error';
  var value = textarea.value;
  var result;

  if(value.trim() === '')
  {
    result = false;
  }
  else 
  {
    result = true;
  }

  result ? textarea.classList.remove(errorClass) : textarea.classList.add(errorClass);
  return result;
}

function checkFieldPassword(password)
{
  var errorClass = 'field-error';
  var value = password.value;
  var result;

  if(value.trim() === '' || value.trim().split('').length < 6)
  {
    result = false;
  }
  else 
  {
    result = true;
  }

  result ? password.classList.remove(errorClass) : password.classList.add(errorClass);
  return result;
}

function sendForm(form)
{
  fetch(form.action, { method: 'POST', body: new FormData(form)})
    .then(response => 
    {
      if(document.querySelector('.modal-form_active'))
      {
        document.querySelector('.modal-form_active').classList.remove('modal-form_active');             
        document.body.appendChild(shadow.querySelector('.modal-form'));
        shadow.innerHTML = '';
        var successSending = document.querySelector('.successful-sending');
        successSending.classList.add('successful-sending_active');
        shadow.appendChild(successSending);

        arrayFields.forEach(field => 
        {
          field.addEventListener('click', (e) => 
          {
              e.preventDefault();
              
              successSending.classList.remove('successful-sending_active'); 
              shadow.classList.remove('wrapper-shadow_active');
              document.body.classList.remove('disabled');
              document.body.appendChild(successSending);
              shadow.innerHTML = '';
                      
          });
        });
      }
      else 
      {
        var successSending = document.querySelector('.successful-sending');
        shadow.appendChild(successSending);
        shadow.classList.add('wrapper-shadow_active');
        successSending.classList.add('successful-sending_active');

        arrayFields.forEach(field => 
        {
            field.addEventListener('click', (e) => 
            {
              e.preventDefault();
              
              successSending.classList.remove('successful-sending_active'); 
              shadow.classList.remove('wrapper-shadow_active');
              document.body.classList.remove('disabled');
              document.body.appendChild(successSending);
              shadow.innerHTML = '';
                        
            });
        });

      }
    })
    .catch(error => console.error(error));
}


// Меню

let buttonHelp = document.querySelector('.button-help');
let menuMain = document.querySelector('.menu-main');

if(buttonHelp && menuMain)
{
  buttonHelp.addEventListener('click', (e) => {
    e.preventDefault();
    menuMain.classList.add('menu-main_active');

    let changeRefs = menuMain.querySelectorAll('.change-ref');

    changeRefs.forEach(ref => {
      ref.addEventListener('click', (e) => {
        e.preventDefault();
        let dataChange = ref.dataset.change;
        menuMain.querySelector('.menu-submenu[data-change='+dataChange+']').classList.add('menu-submenu_active');
      });
    });

    let menuClose = menuMain.querySelectorAll('.menu__close');

    menuClose.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        menuMain.classList.remove('menu-main_active');
      });
    });

    let backMenu = menuMain.querySelectorAll('.back-menu');

    backMenu.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        menuMain.querySelector('.menu-submenu_active').classList.remove('menu-submenu_active');
      });
    });

  });
}


// Адаптив для таблицы Резюме и Отклики 

let tables = document.querySelectorAll('.table');
let responses = document.querySelectorAll('.response');
let invoicePayment = document.querySelectorAll('.invoice-payment');
let rates = document.querySelectorAll('.rates');
let employees = document.querySelectorAll('.employees');

// if(tables.length)
// {
//   tables.forEach(function(table)
//   {
//     table.insertAdjacentHTML('beforebegin', '<div class="wrapper-table"></div>');
//     let wrapperTable = table.previousElementSibling;
//     wrapperTable.appendChild(table);
//   });
// }

// if(responses.length)
// {
//   responses.forEach(function(response)
//   {
//     response.insertAdjacentHTML('beforebegin', '<div class="wrapper-table"></div>');
//     let wrapperTable = response.previousElementSibling;
//     wrapperTable.appendChild(response);
//   });
// }

function wrapTable(tables)
{
  if(tables.length)
  {
    tables.forEach(function(table)
    {
      table.insertAdjacentHTML('beforebegin', '<div class="wrapper-table"></div>');
      let wrapperTable = table.previousElementSibling;
      wrapperTable.appendChild(table);
    });
  }
}

wrapTable(tables);
wrapTable(responses);
wrapTable(invoicePayment);
wrapTable(rates);
wrapTable(employees);

// Адаптив для формы быстрого поиска

if(window.matchMedia('(max-width: 650px)').matches)
{
  let submitButton = document.querySelectorAll('input[name="submit-quick-search-form"]');

  if(submitButton.length)
  {
    submitButton.forEach(button => 
    {
      button.value = '';
    });
  }
}


// Выравнивание тарифов по высоте 

let rows = document.querySelectorAll('.row-tariffs');

if(rows.length)
{
  rows.forEach(row => {
    let tariffContents = row.querySelectorAll('.tariff-block__content');

    if(tariffContents.length)
    {
      window.addEventListener('load', function()
      {
        let maxHeight = tariffContents[0].getBoundingClientRect().height;

        console.log(maxHeight);

        tariffContents.forEach(content => 
        {
          if(maxHeight < content.getBoundingClientRect().height)
          {
            maxHeight = content.getBoundingClientRect().height;
          }
        });

        tariffContents.forEach(content => 
        {
          content.style.height = maxHeight + 'px';
        });

      });
    }
  });
}

// Скрытие табов 

window.addEventListener('load', function()
{
  if(document.querySelectorAll('.tabs-content-block'))
  {
    document.querySelectorAll('.tabs-content-block').forEach(content => {
      if(!content.classList.contains('tabs-content-block_active')) 
      {
        content.style.display = 'none';
      }
    });
  }
});

// Табы 

var tabs = document.querySelectorAll('.tabs');

if(tabs.length)
{
  window.addEventListener('load', () => 
  {
    tabs.forEach(function(elem, index)
    {
      var tabsItem = elem.querySelectorAll('.tabs-item');
      var tabsContent = elem.querySelector('.tabs-content');
      var tabsItems = elem.querySelector('.tabs-items')

      tabsItem.forEach(function(elem, index)
      {
        elem.addEventListener('click', function(e)
        {
          e.preventDefault();
          if(!elem.classList.contains('tabs-item_active'))
          {
            // var prevDataTab = tabsItems.querySelector('.tabs-item_active').dataset.tab;
            tabsItems.querySelector('.tabs-item_active').classList.remove('tabs-item_active');
            elem.classList.add('tabs-item_active');
            var dataTab = elem.dataset.tab;
            if(tabsContent.querySelectorAll('.tabs-content-block_active').length > 0)
            {
              let oldTabsContent = tabsContent.querySelectorAll('.tabs-content-block_active');
              oldTabsContent.forEach(tab => {
                tab.classList.remove('tabs-content-block_active');
                tab.style.display = 'none';
              });
              // tabsContent.querySelector('.tabs-content-block_active').classList.remove('tabs-content-block_active');
            }
            if(tabsContent.querySelectorAll('div[data-tab="' + dataTab + '"]').length > 0)
            {
              let newTabsContent = tabsContent.querySelectorAll('div[data-tab="' + dataTab + '"]');
              newTabsContent.forEach(tab => {
                tab.classList.add('tabs-content-block_active');
              });
              // tabsContent.querySelector('div[data-tab="' + dataTab + '"]').classList.add('tabs-content-block_active');
            }
          }
        });
      });
    });
  });
}


// Range Slider 

let blockRangeSliders = document.querySelectorAll('.block-range-slider');

if(blockRangeSliders.length)
{
  blockRangeSliders.forEach(block => 
  {
    let rangeSlider = block.querySelector('[data-id="range-slider"]');

    let snapValues = [
      block.querySelector('input[name="min-value-range"]'),
      block.querySelector('input[name="max-value-range"]')
    ];

    noUiSlider.create(rangeSlider, {
      start: [18, 52],
      tooltips: false,
      step: 1,
      connect: true,
      range: {
          'min': 18,
          'max': 99
      }
    });
    
    rangeSlider.noUiSlider.on('update', function (values, handle) {
        snapValues[handle].value = Math.round(values[handle]);
    });

    snapValues.forEach((field, index) => 
    {
      field.addEventListener('change', function(e)
      {
        let value = field.value;
        if(index === 0)
        {
          rangeSlider.noUiSlider.set([value, null]);
        }
        else 
        {
          rangeSlider.noUiSlider.set([null, value]);
        }
      });
    });
    
  });
 
}

// Скрипт для отображния фильтра для таблиц 

let filterBlock = document.querySelectorAll('.filter-block');

if(filterBlock.length)
{
  filterBlock.forEach(block => {
    let ref = block.querySelector('.filter-block__ref');

    ref.addEventListener('click', (e) => {
      e.preventDefault();

      ref.classList.toggle('filter-block__ref_active');
      block.querySelector('.filter-block__content').classList.toggle('filter-block__content_active');
    });
  });
}

// Скрипт для выбора периода времени в фильтре

let filterBlockContent = document.querySelectorAll('.filter-block__content');

if(filterBlockContent.length)
{
  filterBlockContent.forEach(block => 
  {
    let radioButtons = block.querySelectorAll('input[type="radio"]');
    let inputDate = block.querySelectorAll('[data-picker="datepicker"]');

    radioButtons.forEach((button, index) => {
      button.addEventListener('change', () => {
        if(index === 1 && button.checked)
        {
          inputDate.forEach(input => {
            input.removeAttribute('disabled');
          });
        }
        if(index === 0 && button.checked)
        {
          inputDate.forEach(input => {
            input.setAttribute('disabled', 'disabled');
          });
        }
      });
    });
  });
}


// Добавление маски для поля с телефоном

function addMask(event)
{
  if( !(event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace' || event.key == 'Tab')) { event.preventDefault() }
  var mask = '+7 (111) 111-11-11'; // Задаем маску

  if (/[0-9\+\ \-\(\)]/.test(event.key)) {
      // Здесь начинаем сравнивать this.value и mask
      // к примеру опять же
      var currentString = this.value;
      var currentLength = currentString.length;
      if (/[0-9]/.test(event.key)) {
          if (mask[currentLength] == '1') {
              this.value = currentString + event.key;
          } else {
              for (var i=currentLength; i<mask.length; i++) {
              if (mask[i] == '1') {
                  this.value = currentString + event.key;
                  break;
              }
              currentString += mask[i];
              }
        }
      }
  } 
}
     

let fieldPhones = document.querySelectorAll('input[data-phone="true"]');

if(fieldPhones.length)
{
    fieldPhones.forEach(input => 
    {
        input.addEventListener('keydown', addMask);
    });
}

// Окно поиска города 

let choiceCity = document.querySelector('.header-top-left .choice-city');
let modalSearchCity = document.querySelector('.modal-search-city');

if(choiceCity && modalSearchCity) 
{
  choiceCity.addEventListener('click', (e) => 
  {
    e.preventDefault();
    document.body.classList.toggle('disabled');
    choiceCity.classList.toggle('choice-city_active');
    modalSearchCity.classList.toggle('modal-search-city_active');

    modalSearchCity.querySelector('.close-modal a').addEventListener('click', (e) => 
    {
      e.preventDefault();
      document.body.classList.remove('disabled');
      choiceCity.classList.remove('choice-city_active');
      modalSearchCity.classList.remove('modal-search-city_active');
    });
  });
}

// Окно поиска 

let findRef = document.querySelectorAll('.find-ref');
let modalFind = document.querySelector('.modal-find');

if(modalFind && findRef.length)
{
  findRef.forEach(ref => 
  {
    ref.addEventListener('click', (e) => 
    {
      e.preventDefault();

      if(window.matchMedia('(min-width: 651px)').matches)
      {
        let headerHeight = document.querySelector('.header').clientHeight;
        let scroll = window.pageYOffset || document.documentElement.scrollTop;
  
        if(scroll >= headerHeight)
        {
          modalFind.style.top = '60px';
        }
        else if(scroll === 0)
        {
          modalFind.style.top = '76px';
        }
        else 
        {
          modalFind.style.top = '0px';
        }
      }

      document.body.classList.add('disabled');
      modalFind.classList.add('modal-find_active');
  
      modalFind.querySelector('.close-modal a').addEventListener('click', (e) => 
      {
        e.preventDefault();
        modalFind.classList.remove('modal-find_active');
        document.body.classList.remove('disabled');
      });
    });
  });
}





























