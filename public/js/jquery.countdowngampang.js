/**************************************************************************************************************************************************/
/* 
 * jQuery CountdownGampang
 * written by Shidiq Fadhilah - Indonesia <akhmadshidiqfadhilah@gmail.com>
 * Licensed under the MIT license https://github.com/fadhilah1992/jquery-countdowngampang/blob/main/LICENSE
 * Version 1.0.1
 * 
 * jQuery ClassyCountdown
 * www.class.pm
 *
 * Written by Marius Stanciu - Sergiu <marius@class.pm>
 * Licensed under the MIT license www.class.pm/LICENSE-MIT
 * Version 1.0.1
 /**************************************************************************************************************************************************/

 (function ( $ ) {

 	$.fn.CountdownGampang = function(options, callback) {
 		// check for jQuery knob and throttle
 		if (!jQuery().knob) {
 			throw 'CountdownGampang require jQuery knob.';
 		}

 		if (!jQuery.throttle) {
 			throw 'CountdownGampang require jQuery throttle / debounce.';
 		}

 		var element = $(this);
 		var settings = {
 			rampung: undefined,
 			labels: true,
 			labelsOptions: {
 				lang: {
 					days: 'Days',
 					hours: 'Hours',
 					minutes: 'Minutes',
 					seconds: 'Seconds'
 				},
 				style: 'font-size: 0.5em;'
 			},
 			style: {
 				element: '',
 				labels: false,
 				textResponsive: 0.5,
 				days: {
 					gauge: {
 						thickness: 0.02,
 						bgColor: 'rgba(0, 0, 0, 0)',
 						fgColor: 'rgba(0, 0, 0, 1)',
 						lineCap: 'butt'
 					},
 					textCSS: ''
 				},
 				hours: {
 					gauge: {
 						thickness: 0.02,
 						bgColor: 'rgba(0, 0, 0, 0)',
 						fgColor: 'rgba(0, 0, 0, 1)',
 						lineCap: 'butt'
 					},
 					textCSS: ''
 				},
 				minutes: {
 					gauge: {
 						thickness: 0.02,
 						bgColor: 'rgba(0, 0, 0, 0)',
 						fgColor: 'rgba(0, 0, 0, 1)',
 						lineCap: 'butt'
 					},
 					textCSS: ''
 				},
 				seconds: {
 					gauge: {
 						thickness: 0.02,
 						bgColor: 'rgba(0, 0, 0, 0)',
 						fgColor: 'rgba(0, 0, 0, 1)',
 						lineCap: 'butt'
 					},
 					textCSS: ''
 				}
 			},
 			onEndCallback: function () {
 				if (window.console && window.console.log) {
 					window.console.log("[CountdownGampang::isRampung] Wayae, wayae ......");
 				}
 			}
 		};

 		// if not rampung passed in options
 		if (!options.rampung) {
 			throw 'Parameter options.rampung must passed bro.';
 		}

 		// append options
 		settings = $.extend(true, settings, options);

 		// callback
 		if (typeof callback !== undefined) {
 			settings.onEndCallback = callback;
 		}

 		function prepareTemplate() {
 			element.append('<div class="ClassyCountdown-wrapper">' +
 				'<div class="ClassyCountdown-days">' +
 				'<input type="text" />' +
 				'<span class="ClassyCountdown-value"><div></div><span></span></span>' +
 				'</div>' +
 				'<div class="ClassyCountdown-hours">' +
 				'<input type="text" />' +
 				'<span class="ClassyCountdown-value"><div></div><span></span></span>' +
 				'</div>' +
 				'<div class="ClassyCountdown-minutes">' +
 				'<input type="text" />' +
 				'<span class="ClassyCountdown-value"><div></div><span></span></span>' +
 				'</div>' +
 				'<div class="ClassyCountdown-seconds">' +
 				'<input type="text" />' +
 				'<span class="ClassyCountdown-value"><div></div><span></span></span>' +
 				'</div>' +
 				'</div>');

 			element.find('.ClassyCountdown-days input').knob($.extend({
 				width: '100%',
 				displayInput: false,
 				readOnly: true,
 				max: 365
 			}, settings.style.days.gauge));

 			element.find('.ClassyCountdown-hours input').knob($.extend({
 				width: '100%',
 				displayInput: false,
 				readOnly: true,
 				max: 24
 			}, settings.style.hours.gauge));

 			element.find('.ClassyCountdown-minutes input').knob($.extend({
 				width: '100%',
 				displayInput: false,
 				readOnly: true,
 				max: 60
 			}, settings.style.minutes.gauge));

 			element.find('.ClassyCountdown-seconds input').knob($.extend({
 				width: '100%',
 				displayInput: false,
 				readOnly: true,
 				max: 60
 			}, settings.style.seconds.gauge));

 			element.find('.ClassyCountdown-wrapper > div').attr("style", settings.style.element);
 			element.find('.ClassyCountdown-days .ClassyCountdown-value').attr('style', settings.style.days.textCSS);
 			element.find('.ClassyCountdown-hours .ClassyCountdown-value').attr('style', settings.style.hours.textCSS);
 			element.find('.ClassyCountdown-minutes .ClassyCountdown-value').attr('style', settings.style.minutes.textCSS);
 			element.find('.ClassyCountdown-seconds .ClassyCountdown-value').attr('style', settings.style.seconds.textCSS);
 			element.find('.ClassyCountdown-value').each(function() {
 				$(this).css('margin-top', Math.floor(0 - (parseInt($(this).height()) / 2)) + 'px');
 			});

 			if (settings.labels) {
 				element.find(".ClassyCountdown-days .ClassyCountdown-value > span").html(settings.labelsOptions.lang.days);
 				element.find(".ClassyCountdown-hours .ClassyCountdown-value > span").html(settings.labelsOptions.lang.hours);
 				element.find(".ClassyCountdown-minutes .ClassyCountdown-value > span").html(settings.labelsOptions.lang.minutes);
 				element.find(".ClassyCountdown-seconds .ClassyCountdown-value > span").html(settings.labelsOptions.lang.seconds);
 				element.find(".ClassyCountdown-value > span").attr("style", settings.labelsOptions.style);
 			}
 		}

 		function onResize() {
 			element.find('.ClassyCountdown-wrapper > div').each(function() {
 				$(this).css('height', $(this).width() + 'px');
 			});

 			if (settings.style.textResponsive) {
 				element.find('.ClassyCountdown-value').css('font-size', Math.floor(element.find('> div').eq(0).width() * settings.style.textResponsive / 10) + 'px');
 			}

 			element.find('.ClassyCountdown-value').each(function() {
 				$(this).css("margin-top", Math.floor(0 - (parseInt($(this).height()) / 2)) + 'px');
 			});

 			element.find('.ClassyCountdown-days input').trigger('change');
 			element.find('.ClassyCountdown-hours input').trigger('change');
 			element.find('.ClassyCountdown-minutes input').trigger('change');
 			element.find('.ClassyCountdown-seconds input').trigger('change');
 		}

 		function doResponsive() {
 			element.find('.ClassyCountdown-wrapper > div').each(function() {
 				$(this).css('height', $(this).width() + 'px');
 			});

 			if (settings.style.textResponsive) {
 				element.find('.ClassyCountdown-value').css('font-size', Math.floor(element.find('> div').eq(0).width() * settings.style.textResponsive / 10) + 'px');
 				element.find('.ClassyCountdown-value').each(function() {
 					$(this).css('margin-top', Math.floor(0 - (parseInt($(this).height()) / 2)) + 'px');
 				});
 			}

 			$(window).trigger('resize');

 			$(window).resize($.throttle(50, onResize));
 		}

 		function getTheme(name) {
 			switch (name) {
 				case 'flat-colors':
 				return {
 					labels: true,
 					style: {
 						element: '',
 						textResponsive: 0.5,
 						days: {
 							gauge: {
 								thickness: 0.01,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#1abc9c"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						hours: {
 							gauge: {
 								thickness: 0.01,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#2980b9"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						minutes: {
 							gauge: {
 								thickness: 0.01,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#8e44ad"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						seconds: {
 							gauge: {
 								thickness: 0.01,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#f39c12"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						}
 					}
 				};
 				case 'flat-colors-wide':
 				return {
 					labels: true,
 					style: {
 						element: '',
 						textResponsive: 0.5,
 						days: {
 							gauge: {
 								thickness: 0.03,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#1abc9c"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						hours: {
 							gauge: {
 								thickness: 0.03,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#2980b9"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						minutes: {
 							gauge: {
 								thickness: 0.03,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#8e44ad"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						seconds: {
 							gauge: {
 								thickness: 0.03,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#f39c12"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						}
 					}
 				};
 				case 'flat-colors-very-wide':
 				return {
 					labels: true,
 					style: {
 						element: '',
 						textResponsive: 0.5,
 						days: {
 							gauge: {
 								thickness: 0.2,
 								bgColor: "rgba(135, 133, 139,.3)",
 								fgColor: "rgb(248, 95, 15)"
 							},
 							textCSS: 'font-weight:600;color:rgb(135, 133, 139);'
 						},
 						hours: {
 							gauge: {
 								thickness: 0.2,
 								bgColor: "rgba(135, 133, 139,.3)",
 								fgColor: "rgb(248, 95, 15)"
 							},
 							textCSS: 'font-weight:600;color:rgb(135, 133, 139);'
 						},
 						minutes: {
 							gauge: {
 								thickness: 0.2,
 								bgColor: "rgba(135, 133, 139,.3)",
 								fgColor: "rgb(248, 95, 15)"
 							},
 							textCSS: 'font-weight:600;color:rgb(135, 133, 139);'
 						},
 						seconds: {
 							gauge: {
 								thickness: 0.2,
 								bgColor: "rgba(135, 133, 139,.3)",
 								fgColor: "rgb(248, 95, 15)"
 							},
 							textCSS: 'font-weight:600;color:rgb(135, 133, 139);'
 						}
 					}
 				};
 				case 'flat-colors-black':
 				return {
 					labels: true,
 					style: {
 						element: '',
 						textResponsive: 0.5,
 						days: {
 							gauge: {
 								thickness: 0.25,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#1abc9c",
 								lineCap: 'round'
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						hours: {
 							gauge: {
 								thickness: 0.25,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#2980b9",
 								lineCap: 'round'
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						minutes: {
 							gauge: {
 								thickness: 0.25,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#8e44ad", lineCap: 'round'
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						seconds: {
 							gauge: {
 								thickness: 0.25,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#f39c12",
 								lineCap: 'round'
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						}
 					}
 				};
 				case 'black':
 				return {
 					labels: true,
 					style: {
 						element: '',
 						textResponsive: 0.5,
 						days: {
 							gauge: {
 								thickness: 0.01,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#222"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						hours: {
 							gauge: {
 								thickness: 0.01,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#222"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						minutes: {
 							gauge: {
 								thickness: 0.01,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#222"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						seconds: {
 							gauge: {
 								thickness: 0.01,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#222"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						}
 					}
 				};
 				case 'black-wide':
 				return {
 					labels: true,
 					style: {
 						element: '',
 						textResponsive: 0.5,
 						days: {
 							gauge: {
 								thickness: 0.03,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#222"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						hours: {
 							gauge: {
 								thickness: 0.03,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#222"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						minutes: {
 							gauge: {
 								thickness: 0.03,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#222"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						seconds: {
 							gauge: {
 								thickness: 0.03,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#222"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						}
 					}
 				};
 				case 'black-very-wide':
 				return {
 					labels: true,
 					style: {
 						element: '',
 						textResponsive: 0.5,
 						days: {
 							gauge: {
 								thickness: 0.17,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#222"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						hours: {
 							gauge: {
 								thickness: 0.17,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#222"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						minutes: {
 							gauge: {
 								thickness: 0.17,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#222"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						seconds: {
 							gauge: {
 								thickness: 0.17,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#222"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						}
 					}
 				};
 				case 'black-black':
 				return {
 					labels: true,
 					style: {
 						element: '',
 						textResponsive: 0.5,
 						days: {
 							gauge: {
 								thickness: 0.25,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#222",
 								lineCap: 'round'
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						hours: {
 							gauge: {
 								thickness: 0.25,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#222",
 								lineCap: 'round'
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						minutes: {
 							gauge: {
 								thickness: 0.25,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#222",
 								lineCap: 'round'
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						},
 						seconds: {
 							gauge: {
 								thickness: 0.25,
 								bgColor: "rgba(0,0,0,0.05)",
 								fgColor: "#222",
 								lineCap: 'round'
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
 						}
 					}
 				};
 				case 'white':
 				return {
 					labels: true,
 					style: {
 						element: '',
 						textResponsive: 0.5,
 						days: {
 							gauge: {
 								thickness: 0.03,
 								bgColor: "rgba(255,255,255,0.05)",
 								fgColor: "#fff"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
 						},
 						hours: {
 							gauge: {
 								thickness: 0.03,
 								bgColor: "rgba(255,255,255,0.05)",
 								fgColor: "#fff"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
 						},
 						minutes: {
 							gauge: {
 								thickness: 0.03,
 								bgColor: "rgba(255,255,255,0.05)",
 								fgColor: "#fff"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
 						},
 						seconds: {
 							gauge: {
 								thickness: 0.03,
 								bgColor: "rgba(255,255,255,0.05)",
 								fgColor: "#fff"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
 						}
 					}
 				};
 				case 'white-wide':
 				return {
 					labels: true,
 					style: {
 						element: '',
 						textResponsive: 0.5,
 						days: {
 							gauge: {
 								thickness: 0.06,
 								bgColor: "rgba(255,255,255,0.05)",
 								fgColor: "#fff"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
 						},
 						hours: {
 							gauge: {
 								thickness: 0.06,
 								bgColor: "rgba(255,255,255,0.05)",
 								fgColor: "#fff"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
 						},
 						minutes: {
 							gauge: {
 								thickness: 0.06,
 								bgColor: "rgba(255,255,255,0.05)",
 								fgColor: "#fff"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
 						},
 						seconds: {
 							gauge: {
 								thickness: 0.06,
 								bgColor: "rgba(255,255,255,0.05)",
 								fgColor: "#fff"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
 						}
 					}
 				};
 				case 'white-very-wide':
 				return {
 					labels: true,
 					style: {
 						element: '',
 						textResponsive: 0.5,
 						days: {
 							gauge: {
 								thickness: 0.16,
 								bgColor: "rgba(255,255,255,0.05)",
 								fgColor: "#fff"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
 						},
 						hours: {
 							gauge: {
 								thickness: 0.16,
 								bgColor: "rgba(255,255,255,0.05)",
 								fgColor: "#fff"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
 						},
 						minutes: {
 							gauge: {
 								thickness: 0.16,
 								bgColor: "rgba(255,255,255,0.05)",
 								fgColor: "#fff"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
 						},
 						seconds: {
 							gauge: {
 								thickness: 0.16,
 								bgColor: "rgba(255,255,255,0.05)",
 								fgColor: "#fff"
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
 						}
 					}
 				};
 				case 'white-black':
 				return {
 					labels: true,
 					style: {
 						element: '',
 						textResponsive: 0.5,
 						days: {
 							gauge: {
 								thickness: 0.25,
 								bgColor: "rgba(255,255,255,0.05)",
 								fgColor: "#fff",
 								lineCap: 'round'
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
 						},
 						hours: {
 							gauge: {
 								thickness: 0.25,
 								bgColor: "rgba(255,255,255,0.05)",
 								fgColor: "#fff",
 								lineCap: 'round'
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
 						},
 						minutes: {
 							gauge: {
 								thickness: 0.25,
 								bgColor: "rgba(255,255,255,0.05)",
 								fgColor: "#fff",
 								lineCap: 'round'
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
 						},
 						seconds: {
 							gauge: {
 								thickness: 0.25,
 								bgColor: "rgba(255,255,255,0.05)",
 								fgColor: "#fff",
 								lineCap: 'round'
 							},
 							textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
 						}
 					}
 				};
 			}
 		}

 		// append theme from options if passed
 		if (options.theme) {
 			settings = $.extend(true, settings, getTheme(options.theme));
 		}

 		prepareTemplate();

 		var countdown = setInterval(function(){
 			doResponsive();
 			
 			var siki = new Date().getTime();
 			var sels = settings.rampung - siki;

 			var days = Math.floor(sels / (1000 * 60 * 60 * 24));
 			var hours = Math.floor((sels % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
 			var minutes = Math.floor((sels % (1000 * 60 * 60)) / (1000 * 60));
 			var seconds = Math.floor((sels % (1000 * 60)) / 1000);

 			if (sels < 0) {
 				days = 0;
 				hours = 0;
 				minutes = 0;
 				seconds = 0;
 			}

 			element.find('.ClassyCountdown-days input').val(365 - days).trigger('change');
 			element.find('.ClassyCountdown-hours input').val(24 - hours).trigger('change');
 			element.find('.ClassyCountdown-minutes input').val(60 - minutes).trigger('change');
 			element.find('.ClassyCountdown-seconds input').val(60 - seconds).trigger('change');
 			element.find('.ClassyCountdown-days .ClassyCountdown-value > div').html(days);
 			element.find('.ClassyCountdown-hours .ClassyCountdown-value > div').html(hours);
 			element.find('.ClassyCountdown-minutes .ClassyCountdown-value > div').html(minutes);
 			element.find('.ClassyCountdown-seconds .ClassyCountdown-value > div').html(seconds);
			$("#header-sec").html(seconds);
			$("#header-min").html(minutes);
			$("#header-hour").html(hours);
			$("#header-day").html(days);
 			if (sels < 0) {
 				clearInterval(countdown);
 				settings.onEndCallback();
 			}
 		}, 1000);

 	};

 }( jQuery ));