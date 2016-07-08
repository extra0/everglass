$(function() {

	priorityNav.init();

	// ф-я разбивки на разряды
	function numberWithCommas(x) {
		return x.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, "\$1 ");
	}

	$('[replaced-number]').each(function() {
		$(this).html(numberWithCommas($(this).html()));
	});

	// только цифры в инпутах
	$('[only-numbers]').bind("change keyup input click", function() {
		if (this.value.match(/[^0-9\.]/g, '')) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
	});

	// работа слайдера на главной
	function sliderInit() {
		$('.slider__list-item').click(function() {
			$('.slider__list-item').removeClass('active');
			$(this).addClass('active');
		});
	}

	// меняем высоту слайдера
	$(window).on('load resize', function() {
		if ($(this).width() >= 1199 - 17) { // контанта 17 необходима для того, чтобы учесть ширину полосы прокрутки
			$('[content-fix]').height($(window).height() - $('.header').innerHeight() - $('.footer').innerHeight()); // динамически изменяем высоту контентной части
			sliderInit();
		} else {
			$('.content').height('100%');

		}
	});

	// канвас подложка под курсор
	CanvasBG.init({
	  Loc: {
	    x: window.innerWidth / 2.1,
	    y: window.innerHeight / 2.3
	  },
	});

	// вызов фенсибокса
	$('[fancybox]').fancybox({
		afterClose: function() {
			$('#diller_map *').remove(); // удаляем ранее инициализированную карту на странице диллеров
		}
	});

	// открываем языковую панель
	var currentLang = $('.header__info-languages-current'),
		langItem = $('.header__info-languages-item');
	langList = $('.header__info-languages-list');

	currentLang.on('click', function() {
		$(this).toggleClass('open');
		langList.slideToggle(400);
	});

	// замена языка
	langItem.on('click', function() {
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
	ymaps.ready(function() {
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
	$('[large-img-trigger]').on('click', function() {
		$('[large-img-holder]').attr('src', $(this).attr('large-img-trigger'));
	});

	// показываем меню каталога
	$('.catalog__menu-btn').on('click', function() {
		$(this).toggleClass('active');
		$('.catalog__list').slideToggle(400);
	});

	var min = $('[range-min]'),
		max = $('[range-max]');

	// слайдер цены
	$("[ui-range]").slider({
		range: true,
		min: 1,
		max: 10000,
		step: 1,
		values: [2000, 6000],
		slide: function(event, ui) {
			$(this).parents('[range-parent]').find(min).val(ui.values[0]);
			$(this).parents('[range-parent]').find(max).val(ui.values[1]);
		}
	});

	min.on('keyup', function() {
		$(this).parents('[range-parent]').find('[ui-range]').slider("values", 0, $(this).val());
	});

	max.on('keyup', function() {
		$(this).parents('[range-parent]').find('[ui-range]').slider("values", 1, $(this).val());
	});

	$('select').selectmenu();



	// --------- КОРЗИНА

	function cart() {
		var sum = 0;

		// просчитываем общую сумму
		$('[item-total-cost]').each(function() {
			sum += parseInt($(this).attr('item-total-cost'));
		});

		// заносим данные
		$('[item-total]').html(sum);

		// корректируем вывод по разрядам числа
		$('[replaced-number]').each(function() {
			$(this).html(numberWithCommas($(this).html()));
		});
	}

	// удаляем позицию
	$('[item-delete]').click(function() {
		$(this).parents('[item-parent]').remove();
		cart();
	});

	// меняем значение кнопками
	$('[item-changer]').on('click', function() {
		var itemParent = $(this).parents('[item-parent]'),
			input = itemParent.find('[item-val]'),
			totalCost = itemParent.find('[item-total-cost]'),
			itemCost = itemParent.find('[item-cost]');

		input.val(parseInt(input.val()) + parseInt($(this).attr('data-val')));

		if (input.val() < 1) { // не даем опустится ниже 0 значению в инпуте
			input.val('1');
		}
		if (input.val() > parseInt(input.attr('item-max-val'))) { // проверяем на максимально допутисмое значение в инпуте
			input.val(input.attr('item-max-val'));
		}

		totalCost.attr('item-total-cost', parseInt(input.val()) * parseInt(itemCost.attr('item-cost')));
		totalCost.html(totalCost.attr('item-total-cost'));

		cart();
	});

	var tSum = 0;
	$('[item-total-cost]').each(function() {
		var totalItem = parseInt($(this).parents('[item-parent]').find('[item-val]').val()) * parseInt($(this).parents('[item-parent]').find('[item-cost]').attr('item-cost'));
		$(this).attr('item-total-cost', totalItem);
		$(this).html(totalItem);

		tSum += totalItem;
		$('[item-total]').html(tSum);
	});

	//  обработка изменения значения в инпуте в товаре
	$('[item-val]').keyup(function() {
		if ($(this).val() == 0) {
			$(this).val('1');
		}
		if ($(this).val() > parseInt($(this).attr('item-max-val'))) {
			$(this).val($(this).attr('item-max-val'));
		}

		var itemParent = $(this).parents('[item-parent]'),
			totalCost = itemParent.find('[item-total-cost]'),
			itemCost = itemParent.find('[item-cost]');

		totalCost.attr('item-total-cost', parseInt($(this).val()) * parseInt(itemCost.attr('item-cost')));
		totalCost.html(totalCost.attr('item-total-cost'));

		cart();
	});
	cart();

	
	$(window).load(function() {
		// кастонмый скролл
		$("[custom-scroll]").mCustomScrollbar();

		// bxSlider
		$('[slider]').bxSlider({
			controls: false,
			pagerCustom: '#product-thumbs'
		});
		
	});

	$('.product__block-img-thumbs-link').each(function(i){
		$(this).attr('data-slide-index', i);
	});

});