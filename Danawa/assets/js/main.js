/*
	Future Imperfect by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$menu = $('#menu'),
		$sidebar = $('#sidebar'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Menu.
		$menu
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Search (header).
		var $search = $('#search'),
			$search_input = $search.find('input');

		$body
			.on('click', '[href="#search"]', function(event) {

				event.preventDefault();

				// Not visible?
					if (!$search.hasClass('visible')) {

						// Reset form.
							$search[0].reset();

						// Show.
							$search.addClass('visible');

						// Focus input.
							$search_input.focus();

					}

			});

		$search_input
			.on('keydown', function(event) {

				if (event.keyCode == 27)
					$search_input.blur();

			})
			.on('blur', function() {
				window.setTimeout(function() {
					$search.removeClass('visible');
				}, 100);
			});

			// 웹페이지 이동 시 부드럽게 이동
			$('.smooth').click(function () {
			  $('html, body').animate({
				scrollTop: $($.attr(this, 'href')).offset().top
			  }, 1000);
			  return false;
			});

	// Intro.
		var $intro = $('#intro');

		// Move to main on <=large, back to sidebar on >large.
			breakpoints.on('<=large', function() {
				$intro.prependTo($main);
			});

			breakpoints.on('>large', function() {
				$intro.prependTo($sidebar);
			});

			$(window).resize(function () {
				var byt = $("body").width();
				if (byt < 768) {
					tabToAcor("#myDiv");
				}
			});

			
})(jQuery);

			function tabToAcor(id) {
				var link = "";
				var inn = "";
				var ic = "";
				var ic2 = "";
				$(id).removeClass();
				$(id).addClass("panel-group");
				$(id).find(".nav li").each(function (e) {
					if (e < 1) {
						inn = "in";
					} else {
						inn = "";
					}
					link = $(this).find("a").attr("href");
					ic2 = $(this).find("a").html();
					$(link).removeAttr("role");
					$(link).removeClass();
					$(link).css("padding", "0");
					$(link).addClass("panel panel-default pull-left col-xs-12 nopadding");
					ic = $(link).html();
					$(link).html("");
					$(link).prepend('<div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="' + link + '" href="' + link + '1">' + ic2 + '</a></h4></div>');
					$(link).append('<div id="' + link.substring(1, link.length) + '1" class="panel-collapse collapse ' + inn + '"><div class="panel-body"> ' + ic + '</div></div>');
				});
				$(id).find(".nav").remove();
			}
			
			function changeCoordMode(mode) {
	
				// 옷 설정 모드
				if (mode === 0) {
					$('#id-div-char-win').css('display', 'flex');
					$('#id-div-coord-win').css('display', 'none');
	
					const $parent = $('#id-div-mode-change');
					$parent.find('.btn-light').addClass('active')
					$parent.find('.btn-dark').removeClass('active')
	
					setTimeout(function () {
						setPartsHeights();
					}, 20)
				}
				// 코디하기 모드
				else {
					$('#id-div-char-win').css('display', 'none');
					$('#id-div-coord-win').css('display', 'flex');
	
					const $parent = $('#id-div-mode-change');
					$parent.find('.btn-light').removeClass('active')
					$parent.find('.btn-dark').addClass('active')
	
				}
			}
		
			$("div.row.control .btn-group > .btn").click(function () {
				$("div.row.control .btn-group > .btn").removeClass("active");
				$(this).addClass("active");
			});
			
			function ChangeBack(t) {
				if (t === '1') {
					$(".coord-post").css('background-image', "url(./images/spring.jpg)")
				}
				else if (t === '2') {
					$(".coord-post").css('background-image', "url(./images/summer.jpg)")
				}
				else if (t == 3) {
					$(".coord-post").css('background-image', "url(./images/autumn.jpg)")
				}
				else if (t == 4) {
					$(".coord-post").css('background-image', "url(./images/snow.jpg)")
				}
				else if (t == 5) {
					$(".coord-post").css('background-image', "url(./images/indoors.jpg)")
				}
			}


			function addCateChange(e) {
				var head = ["모자","안경"];
				var sang = ["아우터","기본 티","셔츠","원피스","기타"];
				var ha = ["바지","치마","기타"];
				var foot = ["신발","양말"];
				var other = ["액세서리","가방"];
				var target = document.getElementById("id-additem_cate");
			
				if(e.value == "머리") var d = head;
				else if(e.value == "상의") var d = sang;
				else if(e.value == "하의") var d = ha;
				else if(e.value == "발") var d = foot;
				else if(e.value == "기타") var d = other;
			
				target.options.length = 0;
			
				for (x in d) {
					var opt = document.createElement("option");
					opt.value = d[x];
					opt.innerHTML = d[x];
					target.appendChild(opt);
				}   
			}

						function readURL(input) {
							if (input.files && input.files[0]) {
							  var reader = new FileReader();
							  
							  reader.onload = function(e) {
								$('#blah').attr('src', e.target.result);
							  }
							  
							  reader.readAsDataURL(input.files[0]); // convert to base64 string
							}
						  }
						  
						  $("#imgInp").change(function() {
							readURL(this);
						  });

						
						  function callModal(title, text){
							$('#myListModal').modal('show'); 
							$('#myListModal .modal-title').html(title);
							$('#myListModal .modal-body').html(text);
							}
							var myList = "<h6>이미지 가져와서 리스트에 넣어야해용 이미지 저장이 급선무...</h6>";

							$('#item_hat, #id-coord-head').click(function(){
							callModal('내가 가진 모자 리스트', myList);
							});
							
							$('#item_top, #id-coord-top1').click(function(){
							callModal('내가 가진 상의 리스트', myList);
							});
							$('#item_acc, #id-coord-acc2, #id-coord-acc3, #id-coord-acc5, #id-coord-acc6').click(function(){
							callModal('내가 가진 액세서리 리스트',myList);
							});
							$('#item_out, #id-coord-outer').click(function(){
								callModal('내가 가진 아우터 리스트', myList);
							});
							$('#item_btm, #id-coord-bottom1').click(function(){
								callModal('내가 가진 하의 리스트',myList);
							});
							$('#item_bag, #id-coord-acc4').click(function(){
								callModal('내가 가진 가방 리스트', myList);
							});
							$('#item_sock, #id-coord-foot2').click(function(){
								callModal('내가 가진 양말 리스트', myList);
							});
							$('#item_shoe, #id-coord-foot1').click(function(){
								callModal('내가 가진 신발 리스트',myList);
							});
							$('#item_else').click(function(){
								callModal('내가 가진 기타 리스트',myList);
							});
						  