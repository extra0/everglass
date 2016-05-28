$(function(){

	// инициализация респонсив меню
	setTimeout(function(){
		var nav = priorityNav.init();
		$('.main-menu').addClass('fadeIn'); // плавно показываем меню что бы скрыть возможные огрехи формирования респонсива
	}, 200);

	// ресайзим меню
	function menuResize() { 
		var nav = $('.main-menu__wrapper'),
			header = $('.header').width(),
			logo = $('.header__logo img').outerWidth(),
			infoBlock = $('.header__info').outerWidth();
		nav.outerWidth(header - logo - infoBlock - 100); // добавлена константа 100 как сумма всех отступов хедера
	}

	// работа слайдера на главной
	function sliderInit() {
		$('.slider__list-item').click(function(){
			$('.slider__list-item').removeClass('active');
			$(this).addClass('active');
		});
	}

	// меняем высоту слайдера
	$(window).on('load resize', function(){
		if ($(this).width() > 1199 ) {
			$('[content-fix]').height($(window).height() - $('.header').innerHeight() - $('.footer').innerHeight()); // динамически изменяем высоту контентной части
			sliderInit();
		} else {
			$('.content').height('100%');
		}
		menuResize(); 
	});

	// канвас подложка под курсор
	// CanvasBG.init({
	//   Loc: {
	//     x: window.innerWidth / 2.1,
	//     y: window.innerHeight / 2.3
	//   },
	// });

	// вызов фенсибокса
	$('[fancybox]').fancybox();

	// открываем языковую панель
	var currentLang = $('.header__info-languages-current'),
		langItem = $('.header__info-languages-item');
		langList = $('.header__info-languages-list');

	currentLang.on('click', function(){
		$(this).toggleClass('open');
		langList.slideToggle(400);
	});

	// замена языка
	langItem.on('click', function(){
		langItem.removeClass('active');
		$(this).addClass('active');
		currentLang.removeClass('open');
		currentLang.html($(this).html());
		langList.slideUp(400);
	});

	// закрываем языковую панель по клику вне области
	$(document).mouseup(function(e) {
		if (langList.has(e.target).length === 0 && currentLang.has(e.target).length === 0) {
			langList.slideUp('500');
			currentLang.removeClass('open');
			langList.removeClass('active');
		}
	});

	// карта в контактах
	ymaps.ready(function () {
	    var myMap = new ymaps.Map('map', {
	            center: [55.744566, 37.605499],
	            zoom: 16,
	            controls: []
	        }, {
	            searchControlProvider: 'yandex#search'
	        }),
	        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
	            //- hintContent: 'Собственный значок метки',
	            //- balloonContent: 'Это красивая метка'
	        }, {
	            // Опции.
	            // Необходимо указать данный тип макета.
	            iconLayout: 'default#image',
	            // Своё изображение иконки метки.
	            iconImageHref: 'img/marker.png',
	            // Размеры метки.
	            iconImageSize: [44, 44],
	            // Смещение левого верхнего угла иконки относительно
	            // её "ножки" (точки привязки).
	            iconImageOffset: [-22, -38]
	        });
        myMap.behaviors.disable('scrollZoom');
	    myMap.geoObjects.add(myPlacemark);
	});

	// замена изображений в галереи по клику
	$('[large-img-trigger]').on('click', function(){
		$('[large-img-holder]').attr('src', $(this).attr('large-img-trigger'));
	});

});