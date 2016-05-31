/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.4 (Thu, 10 Jan 2013)
 * @requires jQuery v1.6 or later
 */
!function(e,t,i,n){"use strict";var o=i(e),a=i(t),r=i.fancybox=function(){r.open.apply(this,arguments)},s=navigator.userAgent.match(/msie/),l=null,c=t.createTouch!==n,d=function(e){return e&&e.hasOwnProperty&&e instanceof i},p=function(e){return e&&"string"===i.type(e)},h=function(e){return p(e)&&e.indexOf("%")>0},f=function(e){return e&&!(e.style.overflow&&"hidden"===e.style.overflow)&&(e.clientWidth&&e.scrollWidth>e.clientWidth||e.clientHeight&&e.scrollHeight>e.clientHeight)},u=function(e,t){var i=parseInt(e,10)||0;return t&&h(e)&&(i=r.getViewport()[t]/100*i),Math.ceil(i)},g=function(e,t){return u(e,t)+"px"};i.extend(r,{version:"2.1.4",defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!c,fitToView:!0,aspectRatio:!1,topRatio:.5,leftRatio:.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3e3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+(s?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:i.noop,beforeLoad:i.noop,afterLoad:i.noop,beforeShow:i.noop,afterShow:i.noop,beforeChange:i.noop,beforeClose:i.noop,afterClose:i.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(e,t){return e&&(i.isPlainObject(t)||(t={}),!1!==r.close(!0))?(i.isArray(e)||(e=d(e)?i(e).get():[e]),i.each(e,function(o,a){var s,l,c,h,f,u,g,m={};"object"===i.type(a)&&(a.nodeType&&(a=i(a)),d(a)?(m={href:a.data("fancybox-href")||a.attr("href"),title:a.data("fancybox-title")||a.attr("title"),isDom:!0,element:a},i.metadata&&i.extend(!0,m,a.metadata())):m=a),s=t.href||m.href||(p(a)?a:null),l=t.title!==n?t.title:m.title||"",c=t.content||m.content,h=c?"html":t.type||m.type,!h&&m.isDom&&(h=a.data("fancybox-type"),h||(f=a.prop("class").match(/fancybox\.(\w+)/),h=f?f[1]:null)),p(s)&&(h||(r.isImage(s)?h="image":r.isSWF(s)?h="swf":"#"===s.charAt(0)?h="inline":p(a)&&(h="html",c=a)),"ajax"===h&&(u=s.split(/\s+/,2),s=u.shift(),g=u.shift())),c||("inline"===h?s?c=i(p(s)?s.replace(/.*(?=#[^\s]+$)/,""):s):m.isDom&&(c=a):"html"===h?c=s:h||s||!m.isDom||(h="inline",c=a)),i.extend(m,{href:s,type:h,content:c,title:l,selector:g}),e[o]=m}),r.opts=i.extend(!0,{},r.defaults,t),t.keys!==n&&(r.opts.keys=t.keys?i.extend({},r.defaults.keys,t.keys):!1),r.group=e,r._start(r.opts.index)):void 0},cancel:function(){var e=r.coming;e&&!1!==r.trigger("onCancel")&&(r.hideLoading(),r.ajaxLoad&&r.ajaxLoad.abort(),r.ajaxLoad=null,r.imgPreload&&(r.imgPreload.onload=r.imgPreload.onerror=null),e.wrap&&e.wrap.stop(!0,!0).trigger("onReset").remove(),r.coming=null,r.current||r._afterZoomOut(e))},close:function(e){r.cancel(),!1!==r.trigger("beforeClose")&&(r.unbindEvents(),r.isActive&&(r.isOpen&&e!==!0?(r.isOpen=r.isOpened=!1,r.isClosing=!0,i(".fancybox-item, .fancybox-nav").remove(),r.wrap.stop(!0,!0).removeClass("fancybox-opened"),r.transitions[r.current.closeMethod]()):(i(".fancybox-wrap").stop(!0).trigger("onReset").remove(),r._afterZoomOut())))},play:function(e){var t=function(){clearTimeout(r.player.timer)},n=function(){t(),r.current&&r.player.isActive&&(r.player.timer=setTimeout(r.next,r.current.playSpeed))},o=function(){t(),i("body").unbind(".player"),r.player.isActive=!1,r.trigger("onPlayEnd")},a=function(){r.current&&(r.current.loop||r.current.index<r.group.length-1)&&(r.player.isActive=!0,i("body").bind({"afterShow.player onUpdate.player":n,"onCancel.player beforeClose.player":o,"beforeLoad.player":t}),n(),r.trigger("onPlayStart"))};e===!0||!r.player.isActive&&e!==!1?a():o()},next:function(e){var t=r.current;t&&(p(e)||(e=t.direction.next),r.jumpto(t.index+1,e,"next"))},prev:function(e){var t=r.current;t&&(p(e)||(e=t.direction.prev),r.jumpto(t.index-1,e,"prev"))},jumpto:function(e,t,i){var o=r.current;o&&(e=u(e),r.direction=t||o.direction[e>=o.index?"next":"prev"],r.router=i||"jumpto",o.loop&&(0>e&&(e=o.group.length+e%o.group.length),e%=o.group.length),o.group[e]!==n&&(r.cancel(),r._start(e)))},reposition:function(e,t){var n,o=r.current,a=o?o.wrap:null;a&&(n=r._getPosition(t),e&&"scroll"===e.type?(delete n.position,a.stop(!0,!0).animate(n,200)):(a.css(n),o.pos=i.extend({},o.dim,n)))},update:function(e){var t=e&&e.type,i=!t||"orientationchange"===t;i&&(clearTimeout(l),l=null),r.isOpen&&!l&&(l=setTimeout(function(){var n=r.current;n&&!r.isClosing&&(r.wrap.removeClass("fancybox-tmp"),(i||"load"===t||"resize"===t&&n.autoResize)&&r._setDimension(),"scroll"===t&&n.canShrink||r.reposition(e),r.trigger("onUpdate"),l=null)},i&&!c?0:300))},toggle:function(e){r.isOpen&&(r.current.fitToView="boolean"===i.type(e)?e:!r.current.fitToView,c&&(r.wrap.removeAttr("style").addClass("fancybox-tmp"),r.trigger("onUpdate")),r.update())},hideLoading:function(){a.unbind(".loading"),i("#fancybox-loading").remove()},showLoading:function(){var e,t;r.hideLoading(),e=i('<div id="fancybox-loading"><div></div></div>').click(r.cancel).appendTo("body"),a.bind("keydown.loading",function(e){27===(e.which||e.keyCode)&&(e.preventDefault(),r.cancel())}),r.defaults.fixed||(t=r.getViewport(),e.css({position:"absolute",top:.5*t.h+t.y,left:.5*t.w+t.x}))},getViewport:function(){var t=r.current&&r.current.locked||!1,i={x:o.scrollLeft(),y:o.scrollTop()};return t?(i.w=t[0].clientWidth,i.h=t[0].clientHeight):(i.w=c&&e.innerWidth?e.innerWidth:o.width(),i.h=c&&e.innerHeight?e.innerHeight:o.height()),i},unbindEvents:function(){r.wrap&&d(r.wrap)&&r.wrap.unbind(".fb"),a.unbind(".fb"),o.unbind(".fb")},bindEvents:function(){var e,t=r.current;t&&(o.bind("orientationchange.fb"+(c?"":" resize.fb")+(t.autoCenter&&!t.locked?" scroll.fb":""),r.update),e=t.keys,e&&a.bind("keydown.fb",function(o){var a=o.which||o.keyCode,s=o.target||o.srcElement;return 27===a&&r.coming?!1:void(o.ctrlKey||o.altKey||o.shiftKey||o.metaKey||s&&(s.type||i(s).is("[contenteditable]"))||i.each(e,function(e,s){return t.group.length>1&&s[a]!==n?(r[e](s[a]),o.preventDefault(),!1):i.inArray(a,s)>-1?(r[e](),o.preventDefault(),!1):void 0}))}),i.fn.mousewheel&&t.mouseWheel&&r.wrap.bind("mousewheel.fb",function(e,n,o,a){for(var s=e.target||null,l=i(s),c=!1;l.length&&!(c||l.is(".fancybox-skin")||l.is(".fancybox-wrap"));)c=f(l[0]),l=i(l).parent();0===n||c||r.group.length>1&&!t.canShrink&&(a>0||o>0?r.prev(a>0?"down":"left"):(0>a||0>o)&&r.next(0>a?"up":"right"),e.preventDefault())}))},trigger:function(e,t){var n,o=t||r.coming||r.current;if(o){if(i.isFunction(o[e])&&(n=o[e].apply(o,Array.prototype.slice.call(arguments,1))),n===!1)return!1;o.helpers&&i.each(o.helpers,function(t,n){n&&r.helpers[t]&&i.isFunction(r.helpers[t][e])&&(n=i.extend(!0,{},r.helpers[t].defaults,n),r.helpers[t][e](n,o))}),i.event.trigger(e+".fb")}},isImage:function(e){return p(e)&&e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$)/i)},isSWF:function(e){return p(e)&&e.match(/\.(swf)((\?|#).*)?$/i)},_start:function(e){var t,n,o,a,s,l={};if(e=u(e),t=r.group[e]||null,!t)return!1;if(l=i.extend(!0,{},r.opts,t),a=l.margin,s=l.padding,"number"===i.type(a)&&(l.margin=[a,a,a,a]),"number"===i.type(s)&&(l.padding=[s,s,s,s]),l.modal&&i.extend(!0,l,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}}),l.autoSize&&(l.autoWidth=l.autoHeight=!0),"auto"===l.width&&(l.autoWidth=!0),"auto"===l.height&&(l.autoHeight=!0),l.group=r.group,l.index=e,r.coming=l,!1===r.trigger("beforeLoad"))return void(r.coming=null);if(o=l.type,n=l.href,!o)return r.coming=null,r.current&&r.router&&"jumpto"!==r.router?(r.current.index=e,r[r.router](r.direction)):!1;if(r.isActive=!0,("image"===o||"swf"===o)&&(l.autoHeight=l.autoWidth=!1,l.scrolling="visible"),"image"===o&&(l.aspectRatio=!0),"iframe"===o&&c&&(l.scrolling="scroll"),l.wrap=i(l.tpl.wrap).addClass("fancybox-"+(c?"mobile":"desktop")+" fancybox-type-"+o+" fancybox-tmp "+l.wrapCSS).appendTo(l.parent||"body"),i.extend(l,{skin:i(".fancybox-skin",l.wrap),outer:i(".fancybox-outer",l.wrap),inner:i(".fancybox-inner",l.wrap)}),i.each(["Top","Right","Bottom","Left"],function(e,t){l.skin.css("padding"+t,g(l.padding[e]))}),r.trigger("onReady"),"inline"===o||"html"===o){if(!l.content||!l.content.length)return r._error("content")}else if(!n)return r._error("href");"image"===o?r._loadImage():"ajax"===o?r._loadAjax():"iframe"===o?r._loadIframe():r._afterLoad()},_error:function(e){i.extend(r.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:e,content:r.coming.tpl.error}),r._afterLoad()},_loadImage:function(){var e=r.imgPreload=new Image;e.onload=function(){this.onload=this.onerror=null,r.coming.width=this.width,r.coming.height=this.height,r._afterLoad()},e.onerror=function(){this.onload=this.onerror=null,r._error("image")},e.src=r.coming.href,e.complete!==!0&&r.showLoading()},_loadAjax:function(){var e=r.coming;r.showLoading(),r.ajaxLoad=i.ajax(i.extend({},e.ajax,{url:e.href,error:function(e,t){r.coming&&"abort"!==t?r._error("ajax",e):r.hideLoading()},success:function(t,i){"success"===i&&(e.content=t,r._afterLoad())}}))},_loadIframe:function(){var e=r.coming,t=i(e.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",c?"auto":e.iframe.scrolling).attr("src",e.href);i(e.wrap).bind("onReset",function(){try{i(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(e){}}),e.iframe.preload&&(r.showLoading(),t.one("load",function(){i(this).data("ready",1),c||i(this).bind("load.fb",r.update),i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(),r._afterLoad()})),e.content=t.appendTo(e.inner),e.iframe.preload||r._afterLoad()},_preloadImages:function(){var e,t,i=r.group,n=r.current,o=i.length,a=n.preload?Math.min(n.preload,o-1):0;for(t=1;a>=t;t+=1)e=i[(n.index+t)%o],"image"===e.type&&e.href&&((new Image).src=e.href)},_afterLoad:function(){var e,t,n,o,a,s,l=r.coming,c=r.current,p="fancybox-placeholder";if(r.hideLoading(),l&&r.isActive!==!1){if(!1===r.trigger("afterLoad",l,c))return l.wrap.stop(!0).trigger("onReset").remove(),void(r.coming=null);switch(c&&(r.trigger("beforeChange",c),c.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()),r.unbindEvents(),e=l,t=l.content,n=l.type,o=l.scrolling,i.extend(r,{wrap:e.wrap,skin:e.skin,outer:e.outer,inner:e.inner,current:e,previous:c}),a=e.href,n){case"inline":case"ajax":case"html":e.selector?t=i("<div>").html(t).find(e.selector):d(t)&&(t.data(p)||t.data(p,i('<div class="'+p+'"></div>').insertAfter(t).hide()),t=t.show().detach(),e.wrap.bind("onReset",function(){i(this).find(t).length&&t.hide().replaceAll(t.data(p)).data(p,!1)}));break;case"image":t=e.tpl.image.replace("{href}",a);break;case"swf":t='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+a+'"></param>',s="",i.each(e.swf,function(e,i){t+='<param name="'+e+'" value="'+i+'"></param>',s+=" "+e+'="'+i+'"'}),t+='<embed src="'+a+'" type="application/x-shockwave-flash" width="100%" height="100%"'+s+"></embed></object>"}d(t)&&t.parent().is(e.inner)||e.inner.append(t),r.trigger("beforeShow"),e.inner.css("overflow","yes"===o?"scroll":"no"===o?"hidden":o),r._setDimension(),r.reposition(),r.isOpen=!1,r.coming=null,r.bindEvents(),r.isOpened?c.prevMethod&&r.transitions[c.prevMethod]():i(".fancybox-wrap").not(e.wrap).stop(!0).trigger("onReset").remove(),r.transitions[r.isOpened?e.nextMethod:e.openMethod](),r._preloadImages()}},_setDimension:function(){var e,t,n,o,a,s,l,c,d,p,f,m,y,v,x,w=r.getViewport(),b=0,k=!1,C=!1,W=r.wrap,O=r.skin,S=r.inner,_=r.current,E=_.width,T=_.height,j=_.minWidth,L=_.minHeight,P=_.maxWidth,M=_.maxHeight,A=_.scrolling,H=_.scrollOutside?_.scrollbarWidth:0,R=_.margin,I=u(R[1]+R[3]),D=u(R[0]+R[2]);if(W.add(O).add(S).width("auto").height("auto").removeClass("fancybox-tmp"),e=u(O.outerWidth(!0)-O.width()),t=u(O.outerHeight(!0)-O.height()),n=I+e,o=D+t,a=h(E)?(w.w-n)*u(E)/100:E,s=h(T)?(w.h-o)*u(T)/100:T,"iframe"===_.type){if(v=_.content,_.autoHeight&&1===v.data("ready"))try{v[0].contentWindow.document.location&&(S.width(a).height(9999),x=v.contents().find("body"),H&&x.css("overflow-x","hidden"),s=x.height())}catch(z){}}else(_.autoWidth||_.autoHeight)&&(S.addClass("fancybox-tmp"),_.autoWidth||S.width(a),_.autoHeight||S.height(s),_.autoWidth&&(a=S.width()),_.autoHeight&&(s=S.height()),S.removeClass("fancybox-tmp"));if(E=u(a),T=u(s),d=a/s,j=u(h(j)?u(j,"w")-n:j),P=u(h(P)?u(P,"w")-n:P),L=u(h(L)?u(L,"h")-o:L),M=u(h(M)?u(M,"h")-o:M),l=P,c=M,_.fitToView&&(P=Math.min(w.w-n,P),M=Math.min(w.h-o,M)),m=w.w-I,y=w.h-D,_.aspectRatio?(E>P&&(E=P,T=u(E/d)),T>M&&(T=M,E=u(T*d)),j>E&&(E=j,T=u(E/d)),L>T&&(T=L,E=u(T*d))):(E=Math.max(j,Math.min(E,P)),_.autoHeight&&"iframe"!==_.type&&(S.width(E),T=S.height()),T=Math.max(L,Math.min(T,M))),_.fitToView)if(S.width(E).height(T),W.width(E+e),p=W.width(),f=W.height(),_.aspectRatio)for(;(p>m||f>y)&&E>j&&T>L&&!(b++>19);)T=Math.max(L,Math.min(M,T-10)),E=u(T*d),j>E&&(E=j,T=u(E/d)),E>P&&(E=P,T=u(E/d)),S.width(E).height(T),W.width(E+e),p=W.width(),f=W.height();else E=Math.max(j,Math.min(E,E-(p-m))),T=Math.max(L,Math.min(T,T-(f-y)));H&&"auto"===A&&s>T&&m>E+e+H&&(E+=H),S.width(E).height(T),W.width(E+e),p=W.width(),f=W.height(),k=(p>m||f>y)&&E>j&&T>L,C=_.aspectRatio?l>E&&c>T&&a>E&&s>T:(l>E||c>T)&&(a>E||s>T),i.extend(_,{dim:{width:g(p),height:g(f)},origWidth:a,origHeight:s,canShrink:k,canExpand:C,wPadding:e,hPadding:t,wrapSpace:f-O.outerHeight(!0),skinSpace:O.height()-T}),!v&&_.autoHeight&&T>L&&M>T&&!C&&S.height("auto")},_getPosition:function(e){var t=r.current,i=r.getViewport(),n=t.margin,o=r.wrap.width()+n[1]+n[3],a=r.wrap.height()+n[0]+n[2],s={position:"absolute",top:n[0],left:n[3]};return t.autoCenter&&t.fixed&&!e&&a<=i.h&&o<=i.w?s.position="fixed":t.locked||(s.top+=i.y,s.left+=i.x),s.top=g(Math.max(s.top,s.top+(i.h-a)*t.topRatio)),s.left=g(Math.max(s.left,s.left+(i.w-o)*t.leftRatio)),s},_afterZoomIn:function(){var e=r.current;e&&(r.isOpen=r.isOpened=!0,r.wrap.css("overflow","visible").addClass("fancybox-opened"),r.update(),(e.closeClick||e.nextClick&&r.group.length>1)&&r.inner.css("cursor","pointer").bind("click.fb",function(t){i(t.target).is("a")||i(t.target).parent().is("a")||(t.preventDefault(),r[e.closeClick?"close":"next"]())}),e.closeBtn&&i(e.tpl.closeBtn).appendTo(r.skin).bind("click.fb",function(e){e.preventDefault(),r.close()}),e.arrows&&r.group.length>1&&((e.loop||e.index>0)&&i(e.tpl.prev).appendTo(r.outer).bind("click.fb",r.prev),(e.loop||e.index<r.group.length-1)&&i(e.tpl.next).appendTo(r.outer).bind("click.fb",r.next)),r.trigger("afterShow"),e.loop||e.index!==e.group.length-1?r.opts.autoPlay&&!r.player.isActive&&(r.opts.autoPlay=!1,r.play()):r.play(!1))},_afterZoomOut:function(e){e=e||r.current,i(".fancybox-wrap").trigger("onReset").remove(),i.extend(r,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null}),r.trigger("afterClose",e)}}),r.transitions={getOrigPosition:function(){var e=r.current,t=e.element,i=e.orig,n={},o=50,a=50,s=e.hPadding,l=e.wPadding,c=r.getViewport();return!i&&e.isDom&&t.is(":visible")&&(i=t.find("img:first"),i.length||(i=t)),d(i)?(n=i.offset(),i.is("img")&&(o=i.outerWidth(),a=i.outerHeight())):(n.top=c.y+(c.h-a)*e.topRatio,n.left=c.x+(c.w-o)*e.leftRatio),("fixed"===r.wrap.css("position")||e.locked)&&(n.top-=c.y,n.left-=c.x),n={top:g(n.top-s*e.topRatio),left:g(n.left-l*e.leftRatio),width:g(o+l),height:g(a+s)}},step:function(e,t){var i,n,o,a=t.prop,s=r.current,l=s.wrapSpace,c=s.skinSpace;("width"===a||"height"===a)&&(i=t.end===t.start?1:(e-t.start)/(t.end-t.start),r.isClosing&&(i=1-i),n="width"===a?s.wPadding:s.hPadding,o=e-n,r.skin[a](u("width"===a?o:o-l*i)),r.inner[a](u("width"===a?o:o-l*i-c*i)))},zoomIn:function(){var e=r.current,t=e.pos,n=e.openEffect,o="elastic"===n,a=i.extend({opacity:1},t);delete a.position,o?(t=this.getOrigPosition(),e.openOpacity&&(t.opacity=.1)):"fade"===n&&(t.opacity=.1),r.wrap.css(t).animate(a,{duration:"none"===n?0:e.openSpeed,easing:e.openEasing,step:o?this.step:null,complete:r._afterZoomIn})},zoomOut:function(){var e=r.current,t=e.closeEffect,i="elastic"===t,n={opacity:.1};i&&(n=this.getOrigPosition(),e.closeOpacity&&(n.opacity=.1)),r.wrap.animate(n,{duration:"none"===t?0:e.closeSpeed,easing:e.closeEasing,step:i?this.step:null,complete:r._afterZoomOut})},changeIn:function(){var e,t=r.current,i=t.nextEffect,n=t.pos,o={opacity:1},a=r.direction,s=200;n.opacity=.1,"elastic"===i&&(e="down"===a||"up"===a?"top":"left","down"===a||"right"===a?(n[e]=g(u(n[e])-s),o[e]="+="+s+"px"):(n[e]=g(u(n[e])+s),o[e]="-="+s+"px")),"none"===i?r._afterZoomIn():r.wrap.css(n).animate(o,{duration:t.nextSpeed,easing:t.nextEasing,complete:r._afterZoomIn})},changeOut:function(){var e=r.previous,t=e.prevEffect,n={opacity:.1},o=r.direction,a=200;"elastic"===t&&(n["down"===o||"up"===o?"top":"left"]=("up"===o||"left"===o?"-":"+")+"="+a+"px"),e.wrap.animate(n,{duration:"none"===t?0:e.prevSpeed,easing:e.prevEasing,complete:function(){i(this).trigger("onReset").remove()}})}},r.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!c,fixed:!0},overlay:null,fixed:!1,create:function(e){e=i.extend({},this.defaults,e),this.overlay&&this.close(),this.overlay=i('<div class="fancybox-overlay"></div>').appendTo("body"),this.fixed=!1,e.fixed&&r.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(e){var t=this;e=i.extend({},this.defaults,e),this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(e),this.fixed||(o.bind("resize.overlay",i.proxy(this.update,this)),this.update()),e.closeClick&&this.overlay.bind("click.overlay",function(e){i(e.target).hasClass("fancybox-overlay")&&(r.isActive?r.close():t.close())}),this.overlay.css(e.css).show()},close:function(){i(".fancybox-overlay").remove(),o.unbind("resize.overlay"),this.overlay=null,this.margin!==!1&&(i("body").css("margin-right",this.margin),this.margin=!1),this.el&&this.el.removeClass("fancybox-lock")},update:function(){var e,i="100%";this.overlay.width(i).height("100%"),s?(e=Math.max(t.documentElement.offsetWidth,t.body.offsetWidth),a.width()>e&&(i=a.width())):a.width()>o.width()&&(i=a.width()),this.overlay.width(i).height(a.height())},onReady:function(e,n){i(".fancybox-overlay").stop(!0,!0),this.overlay||(this.margin=a.height()>o.height()||"scroll"===i("body").css("overflow-y")?i("body").css("margin-right"):!1,this.el=i(t.all&&!t.querySelector?"html":"body"),this.create(e)),e.locked&&this.fixed&&(n.locked=this.overlay.append(n.wrap),n.fixed=!1),e.showEarly===!0&&this.beforeShow.apply(this,arguments)},beforeShow:function(e,t){t.locked&&(this.el.addClass("fancybox-lock"),this.margin!==!1&&i("body").css("margin-right",u(this.margin)+t.scrollbarWidth)),this.open(e)},onUpdate:function(){this.fixed||this.update()},afterClose:function(e){this.overlay&&!r.isActive&&this.overlay.fadeOut(e.speedOut,i.proxy(this.close,this))}},r.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(e){var t,n,o=r.current,a=o.title,l=e.type;if(i.isFunction(a)&&(a=a.call(o.element,o)),p(a)&&""!==i.trim(a)){switch(t=i('<div class="fancybox-title fancybox-title-'+l+'-wrap">'+a+"</div>"),l){case"inside":n=r.skin;break;case"outside":n=r.wrap;break;case"over":n=r.inner;break;default:n=r.skin,t.appendTo("body"),s&&t.width(t.width()),t.wrapInner('<span class="child"></span>'),r.current.margin[2]+=Math.abs(u(t.css("margin-bottom")))}t["top"===e.position?"prependTo":"appendTo"](n)}}},i.fn.fancybox=function(e){var t,n=i(this),o=this.selector||"",s=function(a){var s,l,c=i(this).blur(),d=t;a.ctrlKey||a.altKey||a.shiftKey||a.metaKey||c.is(".fancybox-wrap")||(s=e.groupAttr||"data-fancybox-group",l=c.attr(s),l||(s="rel",l=c.get(0)[s]),l&&""!==l&&"nofollow"!==l&&(c=o.length?i(o):n,c=c.filter("["+s+'="'+l+'"]'),d=c.index(this)),e.index=d,r.open(c,e)!==!1&&a.preventDefault())};return e=e||{},t=e.index||0,o&&e.live!==!1?a.undelegate(o,"click.fb-start").delegate(o+":not('.fancybox-item, .fancybox-nav')","click.fb-start",s):n.unbind("click.fb-start").bind("click.fb-start",s),this.filter("[data-fancybox-start=1]").trigger("click"),this},a.ready(function(){i.scrollbarWidth===n&&(i.scrollbarWidth=function(){var e=i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),t=e.children(),n=t.innerWidth()-t.height(99).innerWidth();return e.remove(),n}),i.support.fixedPosition===n&&(i.support.fixedPosition=function(){var e=i('<div style="position:fixed;top:20px;"></div>').appendTo("body"),t=20===e[0].offsetTop||15===e[0].offsetTop;return e.remove(),t}()),i.extend(r.defaults,{scrollbarWidth:i.scrollbarWidth(),fixed:i.support.fixedPosition,parent:i("body")})})}(window,document,jQuery);

/*
    Masked Input plugin for jQuery
    Version: 1.3.1
*/
!(function(e){function t(){var e=document.createElement("input"),t="onpaste";return e.setAttribute(t,""),"function"==typeof e[t]?"paste":"input"}var n,a=t()+".mask",r=navigator.userAgent,i=/iphone/i.test(r),o=/android/i.test(r);e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(t,r){var c,l,s,u,f,h;return!t&&this.length>0?(c=e(this[0]),c.data(e.mask.dataName)()):(r=e.extend({placeholder:e.mask.placeholder,completed:null},r),l=e.mask.definitions,s=[],u=h=t.length,f=null,e.each(t.split(""),function(e,t){"?"==t?(h--,u=e):l[t]?(s.push(RegExp(l[t])),null===f&&(f=s.length-1)):s.push(null)}),this.trigger("unmask").each(function(){function c(e){for(;h>++e&&!s[e];);return e}function d(e){for(;--e>=0&&!s[e];);return e}function m(e,t){var n,a;if(!(0>e)){for(n=e,a=c(t);h>n;n++)if(s[n]){if(!(h>a&&s[n].test(R[a])))break;R[n]=R[a],R[a]=r.placeholder,a=c(a)}b(),x.caret(Math.max(f,e))}}function p(e){var t,n,a,i;for(t=e,n=r.placeholder;h>t;t++)if(s[t]){if(a=c(t),i=R[t],R[t]=n,!(h>a&&s[a].test(i)))break;n=i}}function g(e){var t,n,a,r=e.which;8===r||46===r||i&&127===r?(t=x.caret(),n=t.begin,a=t.end,0===a-n&&(n=46!==r?d(n):a=c(n-1),a=46===r?c(a):a),k(n,a),m(n,a-1),e.preventDefault()):27==r&&(x.val(S),x.caret(0,y()),e.preventDefault())}function v(t){var n,a,i,l=t.which,u=x.caret();t.ctrlKey||t.altKey||t.metaKey||32>l||l&&(0!==u.end-u.begin&&(k(u.begin,u.end),m(u.begin,u.end-1)),n=c(u.begin-1),h>n&&(a=String.fromCharCode(l),s[n].test(a)&&(p(n),R[n]=a,b(),i=c(n),o?setTimeout(e.proxy(e.fn.caret,x,i),0):x.caret(i),r.completed&&i>=h&&r.completed.call(x))),t.preventDefault())}function k(e,t){var n;for(n=e;t>n&&h>n;n++)s[n]&&(R[n]=r.placeholder)}function b(){x.val(R.join(""))}function y(e){var t,n,a=x.val(),i=-1;for(t=0,pos=0;h>t;t++)if(s[t]){for(R[t]=r.placeholder;pos++<a.length;)if(n=a.charAt(pos-1),s[t].test(n)){R[t]=n,i=t;break}if(pos>a.length)break}else R[t]===a.charAt(pos)&&t!==u&&(pos++,i=t);return e?b():u>i+1?(x.val(""),k(0,h)):(b(),x.val(x.val().substring(0,i+1))),u?t:f}var x=e(this),R=e.map(t.split(""),function(e){return"?"!=e?l[e]?r.placeholder:e:void 0}),S=x.val();x.data(e.mask.dataName,function(){return e.map(R,function(e,t){return s[t]&&e!=r.placeholder?e:null}).join("")}),x.attr("readonly")||x.one("unmask",function(){x.unbind(".mask").removeData(e.mask.dataName)}).bind("focus.mask",function(){clearTimeout(n);var e;S=x.val(),e=y(),n=setTimeout(function(){b(),e==t.length?x.caret(0,e):x.caret(e)},10)}).bind("blur.mask",function(){y(),x.val()!=S&&x.change()}).bind("keydown.mask",g).bind("keypress.mask",v).bind(a,function(){setTimeout(function(){var e=y(!0);x.caret(e),r.completed&&e==x.val().length&&r.completed.call(x)},0)}),y()}))}})})(jQuery);




(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define("priorityNav", factory(root));
    } else if (typeof exports === "object") {
        module.exports = factory(root);
    } else {
        root.priorityNav = factory(root);
    }
})(window || this, function (root) {

    "use strict";

    /**
     * Variables
     */
    var priorityNav = {}; // Object for public APIs
    var breaks = []; // Object to store instances with breakpoints where the instances menu item"s didin"t fit.
    var supports = !!document.querySelector && !!root.addEventListener // Feature test
    var settings = {};
    var instance = 0;
    var count = 0;
    var mainNavWrapper, totalWidth, restWidth, mainNav, navDropdown, navDropdownToggle, dropDownWidth, toggleWrapper;
    var viewportWidth = 0;

    /**
     * Default settings
     * @type {{initClass: string, navDropdown: string, navDropdownToggle: string, mainNavWrapper: string, moved: Function, movedBack: Function}}
     */
    var defaults = {
        initClass:                  "js-priorityNav", // Class that will be printed on html element to allow conditional css styling.
        mainNavWrapper:             ".priority-nav", // mainnav wrapper selector (must be direct parent from mainNav)
        mainNav:                    ".responsive-menu", // mainnav selector. (must be inline-block)
        navDropdown:                "nav__dropdown", // class used for the dropdown.
        navDropdownToggle:          "main-menu__mob-btn", // class used for the dropdown toggle.
        navDropdownLabel:           "", // Text that is used for the dropdown toggle.
        navDropdownBreakpointLabel: "", //button label for navDropdownToggle when the breakPoint is reached.
        breakPoint:                 500, //amount of pixels when all menu items should be moved to dropdown to simulate a mobile menu
        throttleDelay:              0, // this will throttle the calculating logic on resize because i'm a responsible dev.
        offsetPixels:               25, // increase to decrease the time it takes to move an item.
        count:                      false, // prints the amount of items are moved to the attribute data-count to style with css counter.

        //Callbacks
        moved: function () {
        },
        movedBack: function () {
        }
    };


    /**
     * A simple forEach() implementation for Arrays, Objects and NodeLists
     * @private
     * @param {Array|Object|NodeList} collection Collection of items to iterate
     * @param {Function} callback Callback function for each iteration
     * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
     */
    var forEach = function (collection, callback, scope) {
        if (Object.prototype.toString.call(collection) === "[object Object]") {
            for (var prop in collection) {
                if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                    callback.call(scope, collection[prop], prop, collection);
                }
            }
        } else {
            for (var i = 0, len = collection.length; i < len; i++) {
                callback.call(scope, collection[i], i, collection);
            }
        }
    };


    /**
     * Get the closest matching element up the DOM tree
     * @param {Element} elem Starting element
     * @param {String} selector Selector to match against (class, ID, or data attribute)
     * @return {Boolean|Element} Returns false if not match found
     */
    var getClosest = function (elem, selector) {
        var firstChar = selector.charAt(0);
        for (; elem && elem !== document; elem = elem.parentNode) {
            if (firstChar === ".") {
                if (elem.classList.contains(selector.substr(1))) {
                    return elem;
                }
            } else if (firstChar === "#") {
                if (elem.id === selector.substr(1)) {
                    return elem;
                }
            } else if (firstChar === "[") {
                if (elem.hasAttribute(selector.substr(1, selector.length - 2))) {
                    return elem;
                }
            }
        }
        return false;
    };


    /**
     * Merge defaults with user options
     * @private
     * @param {Object} defaults Default settings
     * @param {Object} options User options
     * @returns {Object} Merged values of defaults and options
     */
    var extend = function (defaults, options) {
        var extended = {};
        forEach(defaults, function (value, prop) {
            extended[prop] = defaults[prop];
        });
        forEach(options, function (value, prop) {
            extended[prop] = options[prop];
        });
        return extended;
    };


    /**
     * Debounced resize to throttle execution
     * @param func
     * @param wait
     * @param immediate
     * @returns {Function}
     */
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }


    /**
     * Toggle class on element
     * @param el
     * @param className
     */
    var toggleClass = function (el, className) {
        if (el.classList) {
            el.classList.toggle(className);
        } else {
            var classes = el.className.split(" ");
            var existingIndex = classes.indexOf(className);

            if (existingIndex >= 0)
                classes.splice(existingIndex, 1); else
                classes.push(className);

            el.className = classes.join(" ");
        }
    };


    /**
     * Check if dropdown menu is already on page before creating it
     * @param mainNavWrapper
     */
    var prepareHtml = function (_this, settings) {

        /**
         * Create dropdow menu
         * @type {HTMLElement}
         */
        toggleWrapper = document.createElement("span");
        navDropdown = document.createElement("ul");
        navDropdownToggle = document.createElement("button");

        /**
         * Set label for dropdown toggle
         * @type {string}
         */
        navDropdownToggle.innerHTML = settings.navDropdownLabel;


        /**
         * Move elements to the right spot
         */
        _this.insertAfter(toggleWrapper, _this.querySelector(mainNav));

        toggleWrapper.appendChild(navDropdown);
        toggleWrapper.appendChild(navDropdownToggle);

        /**
         * Add classes so we can target elements
         */
        navDropdown.classList.add(settings.navDropdown);
        navDropdown.classList.add("priority-nav__dropdown");

        navDropdownToggle.classList.add(settings.navDropdownToggle);
        navDropdownToggle.classList.add("priority-nav__dropdown-toggle");

        toggleWrapper.classList.add(settings.navDropdown+"-wrapper");
        toggleWrapper.classList.add("priority-nav__wrapper");

        _this.classList.add("priority-nav");
    };


    /**
     * Get innerwidth without padding
     * @param element
     * @returns {number}
     */
    var getElementContentWidth = function(element) {
        var styles = window.getComputedStyle(element);
        var padding = parseFloat(styles.paddingLeft) +
            parseFloat(styles.paddingRight);

        return element.clientWidth - padding;
    };


    /**
     * Get viewport size
     * @returns {{width: number, height: number}}
     */
    var viewportSize = function() {
        var doc = document, w = window;
        var docEl = (doc.compatMode && doc.compatMode === "CSS1Compat")?
            doc.documentElement: doc.body;

        var width = docEl.clientWidth;
        var height = docEl.clientHeight;

        // mobile zoomed in?
        if ( w.innerWidth && width > w.innerWidth ) {
            width = w.innerWidth;
            height = w.innerHeight;
        }

        return {width: width, height: height};
    };


    /**
     * Get width
     * @param elem
     * @returns {number}
     */
    var calculateWidths = function (_this) {
        totalWidth = getElementContentWidth(_this);
        //Check if parent is the navwrapper before calculating its width
        if (_this.querySelector(navDropdown).parentNode === _this) {
            dropDownWidth = _this.querySelector(navDropdown).offsetWidth;
        } else {
            dropDownWidth = 0;
        }
        restWidth = getChildrenWidth(_this) + settings.offsetPixels;
        viewportWidth = viewportSize().width;
    };


    /**
     * Move item to array
     * @param item
     */
    priorityNav.doesItFit = function (_this, settings) {

        /**
         * Check if it is the first run
         */
        var delay = _this.getAttribute("instance") === 0 ? delay : settings.throttleDelay;

        /**
         * Increase instance
         */
        instance++;

        /**
         * Debounced execution of the main logic
         */
        (debounce(function () {

            /**
             * Get the current element"s instance
             * @type {string}
             */
            var identifier = _this.getAttribute("instance");

            /**
             * Update width
             */
            calculateWidths(_this);

            /**
             * Keep executing until all menu items that are overflowing are moved
             */
            while (totalWidth <= restWidth  && _this.querySelector(mainNav).children.length > 0 || viewportWidth < settings.breakPoint && _this.querySelector(mainNav).children.length > 0) {
                //move item to dropdown
                priorityNav.toDropdown(_this, identifier);
                //recalculate widths
                calculateWidths(_this, identifier);
                //update dropdownToggle label
                if(viewportWidth < settings.breakPoint) updateLabel(_this, identifier, settings.navDropdownBreakpointLabel);
            }

            /**
             * Keep executing until all menu items that are able to move back are moved
             */
            while (totalWidth >= breaks[identifier][breaks[identifier].length - 1] && viewportWidth > settings.breakPoint) {
                //move item to menu
                priorityNav.toMenu(_this, identifier);
                //update dropdownToggle label
                if(viewportWidth > settings.breakPoint) updateLabel(_this, identifier, settings.navDropdownLabel);
            }

            /**
             * If there are no items in dropdown hide dropdown
             */
            if (breaks[identifier].length < 1) {
                _this.querySelector(navDropdown).classList.remove("show");
                //show navDropdownLabel
                updateLabel(_this, identifier, settings.navDropdownLabel);
            }

            /**
             * If there are no items in menu
             */
            if (_this.querySelector(mainNav).children.length < 1){
                //show navDropdownBreakpointLabel
                updateLabel(_this, identifier, settings.navDropdownBreakpointLabel);
            }

            /**
             * Check if we need to show toggle menu button
             */
            showToggle(_this, identifier);

        }, delay ))();
    };


    /**
     * Show/hide toggle button
     */
    var showToggle = function (_this, identifier) {
        if (breaks[identifier].length < 1) {
            _this.querySelector(navDropdownToggle).classList.add("priority-nav-is-hidden");
            _this.querySelector(navDropdownToggle).classList.remove("priority-nav-is-visible");
            _this.classList.remove("priority-nav-has-dropdown");
        } else {
            _this.querySelector(navDropdownToggle).classList.add("priority-nav-is-visible");
            _this.querySelector(navDropdownToggle).classList.remove("priority-nav-is-hidden");
            _this.classList.add("priority-nav-has-dropdown");
        }
    };


    /**
     * Update count on dropdown toggle button
     */
    var updateCount = function (_this, identifier) {
        _this.querySelector(navDropdownToggle).setAttribute("priorityNav-count", breaks[identifier].length);
    };

    var updateLabel = function(_this, identifier, label){
        _this.querySelector(navDropdownToggle).innerHTML = label;
    };


    /**
     * Move item to dropdown
     */
    priorityNav.toDropdown = function (_this, identifier) {


        /**
         * move last child of navigation menu to dropdown
         */
        if (_this.querySelector(navDropdown).firstChild && _this.querySelector(mainNav).children.length > 0) {
            _this.querySelector(navDropdown).insertBefore(_this.querySelector(mainNav).lastElementChild, _this.querySelector(navDropdown).firstChild);
        } else if (_this.querySelector(mainNav).children.length > 0) {
            _this.querySelector(navDropdown).appendChild(_this.querySelector(mainNav).lastElementChild);
        }

        /**
         * store breakpoints
         */
        breaks[identifier].push(restWidth);

        /**
         * check if we need to show toggle menu button
         */
        showToggle(_this, identifier);

        /**
         * update count on dropdown toggle button
         */
        if (_this.querySelector(mainNav).children.length > 0 && settings.count) {
            updateCount(_this, identifier);
        }

        /**
         * If item has been moved to dropdown trigger the callback
         */
        settings.moved();
    };


    /**
     * Move item to menu
     */
    priorityNav.toMenu = function (_this, identifier) {

        /**
         * move last child of navigation menu to dropdown
         */
        if (_this.querySelector(navDropdown).children.length > 0) _this.querySelector(mainNav).appendChild(_this.querySelector(navDropdown).firstElementChild);

        /**
         * remove last breakpoint
         */
        breaks[identifier].pop();

        /**
         * Check if we need to show toggle menu button
         */
        showToggle(_this, identifier);

        /**
         * update count on dropdown toggle button
         */
        if (_this.querySelector(mainNav).children.length > 0 && settings.count) {
            updateCount(_this, identifier);
        }

        /**
         * If item has been moved back to the main menu trigger the callback
         */
        settings.movedBack();
    };


    /**
     * Count width of children and return the value
     * @param e
     */
    var getChildrenWidth = function (e) {
        var children = e.childNodes;
        var sum = 0;
        for (var i = 0; i < children.length; i++) {
            if (children[i].nodeType !== 3) {
                if(!isNaN(children[i].offsetWidth)){
                    sum += children[i].offsetWidth;
                }

            }
        }
        return sum;
    };


    /**
     * Bind eventlisteners
     */
    var listeners = function (_this, settings) {

        // Check if an item needs to move
        if(window.attachEvent) {
            window.attachEvent("onresize", function() {
                if(priorityNav.doesItFit)priorityNav.doesItFit(_this, settings);
            });
        }
        else if(window.addEventListener) {
            window.addEventListener("resize", function() {
                if(priorityNav.doesItFit)priorityNav.doesItFit(_this, settings);
            }, true);
        }

        // Toggle dropdown
        _this.querySelector(navDropdownToggle).addEventListener("click", function () {
            toggleClass(_this.querySelector(navDropdown), "show");
            toggleClass(this, "is-open");
            toggleClass(_this, "is-open");
            $('.main-menu__mob-btn').toggleClass('active');
        });

        /*
         * Remove when clicked outside dropdown
         */
        document.addEventListener("click", function (event) {
            if (!getClosest(event.target, settings.navDropdown) && event.target !== _this.querySelector(navDropdownToggle)) {
                _this.querySelector(navDropdown).classList.remove("show");
                _this.querySelector(navDropdownToggle).classList.remove("is-open");
                _this.classList.remove("is-open");
                $('.main-menu__mob-btn').removeClass('active');
            }
        });

        /**
         * Remove when escape key is pressed
         */
        document.onkeydown = function (evt) {
            evt = evt || window.event;
            if (evt.keyCode === 27) {
                navDropdown.classList.remove("show");
                navDropdownToggle.classList.remove("is-open");
                mainNavWrapper.classList.remove("is-open");
            }
        };
    };


    /**
     * Remove function
     */
    Element.prototype.remove = function() {
        this.parentElement.removeChild(this);
    };

    /*global HTMLCollection */
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
        for(var i = 0, len = this.length; i < len; i++) {
            if(this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
    };


    /**
     * Destroy the current initialization.
     * @public
     */
    priorityNav.destroy = function () {
        // If plugin isn"t already initialized, stop
        if (!settings) return;
        // Remove feedback class
        document.documentElement.classList.remove(settings.initClass);
        // Remove toggle
        toggleWrapper.remove();
        // Remove settings
        settings = null;
        delete priorityNav.init;
        delete priorityNav.doesItFit;
    };


    /**
     * insertAfter function
     * @param n
     * @param r
     */
    if (supports && typeof Node !== 'undefined'){
        Node.prototype.insertAfter = function(n,r) {this.insertBefore(n,r.nextSibling);};
    }


    /**
     * Initialize Plugin
     * @public
     * @param {Object} options User settings
     */
    priorityNav.init = function (options) {


        // Feature test.
        if (!supports && typeof Node === 'undefined'){
            console.warn("This browser doesn't support priorityNav");
            return;
        }

        /**
         * Merge user options with defaults
         * @type {Object}
         */
        settings = extend(defaults, options || {});

        /**
         * Store nodes
         * @type {NodeList}
         */
        var elements = document.querySelectorAll(settings.mainNavWrapper);

        /**
         * Loop over every instance and reference _this
         */
        forEach(elements, function(_this){

            /**
             * Create breaks array
             * @type {number}
             */
            breaks[count] = [];

            /**
             * Set the instance number as data attribute
             */
            _this.setAttribute("instance", count++);

            /**
             * Store the wrapper element
             */
            mainNavWrapper = _this;
            if (!mainNavWrapper) {
                console.warn("couldn't find the specified mainNavWrapper element");
                return;
            }

            /**
             * Store the menu elementStore the menu element
             */
            mainNav = settings.mainNav;
            if (!_this.querySelector(mainNav)) {
                console.warn("couldn't find the specified mainNav element");
                return;
            }

            /**
             * Check if we need to create the dropdown elements
             */
            prepareHtml(_this, settings);

            /**
             * Store the dropdown element
             */
            navDropdown = "."+settings.navDropdown;
            if (!_this.querySelector(navDropdown)) {
                console.warn("couldn't find the specified navDropdown element");
                return;
            }

            /**
             * Store the dropdown toggle element
             */
            navDropdownToggle = "."+settings.navDropdownToggle;
            if (!_this.querySelector(navDropdownToggle)) {
                console.warn("couldn't find the specified navDropdownToggle element");
                return;
            }

            /**
             * Event listeners
             */
            listeners(_this, settings);

            /**
             * Start first check
             */
            priorityNav.doesItFit(_this, settings);

        });

        /**
         * Count amount of instances
         */
        instance++;

        /**
         * Add class to HTML element to activate conditional CSS
         */
        document.documentElement.classList.add(settings.initClass);
    };


    /**
     * Public APIs
     */
    return priorityNav;

});

/*! jQuery UI - v1.11.4 - 2016-05-29
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, position.js, menu.js, selectmenu.js, slider.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){function e(e,s){var n,a,o,r=e.nodeName.toLowerCase();return"area"===r?(n=e.parentNode,a=n.name,e.href&&a&&"map"===n.nodeName.toLowerCase()?(o=t("img[usemap='#"+a+"']")[0],!!o&&i(o)):!1):(/^(input|select|textarea|button|object)$/.test(r)?!e.disabled:"a"===r?e.href||s:s)&&i(e)}function i(e){return t.expr.filters.visible(e)&&!t(e).parents().addBack().filter(function(){return"hidden"===t.css(this,"visibility")}).length}t.ui=t.ui||{},t.extend(t.ui,{version:"1.11.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),t.fn.extend({scrollParent:function(e){var i=this.css("position"),s="absolute"===i,n=e?/(auto|scroll|hidden)/:/(auto|scroll)/,a=this.parents().filter(function(){var e=t(this);return s&&"static"===e.css("position")?!1:n.test(e.css("overflow")+e.css("overflow-y")+e.css("overflow-x"))}).eq(0);return"fixed"!==i&&a.length?a:t(this[0].ownerDocument||document)},uniqueId:function(){var t=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++t)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&t(this).removeAttr("id")})}}),t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(i){return!!t.data(i,e)}}):function(e,i,s){return!!t.data(e,s[3])},focusable:function(i){return e(i,!isNaN(t.attr(i,"tabindex")))},tabbable:function(i){var s=t.attr(i,"tabindex"),n=isNaN(s);return(n||s>=0)&&e(i,!n)}}),t("<a>").outerWidth(1).jquery||t.each(["Width","Height"],function(e,i){function s(e,i,s,a){return t.each(n,function(){i-=parseFloat(t.css(e,"padding"+this))||0,s&&(i-=parseFloat(t.css(e,"border"+this+"Width"))||0),a&&(i-=parseFloat(t.css(e,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],a=i.toLowerCase(),o={innerWidth:t.fn.innerWidth,innerHeight:t.fn.innerHeight,outerWidth:t.fn.outerWidth,outerHeight:t.fn.outerHeight};t.fn["inner"+i]=function(e){return void 0===e?o["inner"+i].call(this):this.each(function(){t(this).css(a,s(this,e)+"px")})},t.fn["outer"+i]=function(e,n){return"number"!=typeof e?o["outer"+i].call(this,e):this.each(function(){t(this).css(a,s(this,e,!0,n)+"px")})}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(t.fn.removeData=function(e){return function(i){return arguments.length?e.call(this,t.camelCase(i)):e.call(this)}}(t.fn.removeData)),t.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),t.fn.extend({focus:function(e){return function(i,s){return"number"==typeof i?this.each(function(){var e=this;setTimeout(function(){t(e).focus(),s&&s.call(e)},i)}):e.apply(this,arguments)}}(t.fn.focus),disableSelection:function(){var t="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(t+".ui-disableSelection",function(t){t.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(e){if(void 0!==e)return this.css("zIndex",e);if(this.length)for(var i,s,n=t(this[0]);n.length&&n[0]!==document;){if(i=n.css("position"),("absolute"===i||"relative"===i||"fixed"===i)&&(s=parseInt(n.css("zIndex"),10),!isNaN(s)&&0!==s))return s;n=n.parent()}return 0}}),t.ui.plugin={add:function(e,i,s){var n,a=t.ui[e].prototype;for(n in s)a.plugins[n]=a.plugins[n]||[],a.plugins[n].push([i,s[n]])},call:function(t,e,i,s){var n,a=t.plugins[e];if(a&&(s||t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType))for(n=0;a.length>n;n++)t.options[a[n][0]]&&a[n][1].apply(t.element,i)}};var s=0,n=Array.prototype.slice;t.cleanData=function(e){return function(i){var s,n,a;for(a=0;null!=(n=i[a]);a++)try{s=t._data(n,"events"),s&&s.remove&&t(n).triggerHandler("remove")}catch(o){}e(i)}}(t.cleanData),t.widget=function(e,i,s){var n,a,o,r,h={},l=e.split(".")[0];return e=e.split(".")[1],n=l+"-"+e,s||(s=i,i=t.Widget),t.expr[":"][n.toLowerCase()]=function(e){return!!t.data(e,n)},t[l]=t[l]||{},a=t[l][e],o=t[l][e]=function(t,e){return this._createWidget?(arguments.length&&this._createWidget(t,e),void 0):new o(t,e)},t.extend(o,a,{version:s.version,_proto:t.extend({},s),_childConstructors:[]}),r=new i,r.options=t.widget.extend({},r.options),t.each(s,function(e,s){return t.isFunction(s)?(h[e]=function(){var t=function(){return i.prototype[e].apply(this,arguments)},n=function(t){return i.prototype[e].apply(this,t)};return function(){var e,i=this._super,a=this._superApply;return this._super=t,this._superApply=n,e=s.apply(this,arguments),this._super=i,this._superApply=a,e}}(),void 0):(h[e]=s,void 0)}),o.prototype=t.widget.extend(r,{widgetEventPrefix:a?r.widgetEventPrefix||e:e},h,{constructor:o,namespace:l,widgetName:e,widgetFullName:n}),a?(t.each(a._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete a._childConstructors):i._childConstructors.push(o),t.widget.bridge(e,o),o},t.widget.extend=function(e){for(var i,s,a=n.call(arguments,1),o=0,r=a.length;r>o;o++)for(i in a[o])s=a[o][i],a[o].hasOwnProperty(i)&&void 0!==s&&(e[i]=t.isPlainObject(s)?t.isPlainObject(e[i])?t.widget.extend({},e[i],s):t.widget.extend({},s):s);return e},t.widget.bridge=function(e,i){var s=i.prototype.widgetFullName||e;t.fn[e]=function(a){var o="string"==typeof a,r=n.call(arguments,1),h=this;return o?this.each(function(){var i,n=t.data(this,s);return"instance"===a?(h=n,!1):n?t.isFunction(n[a])&&"_"!==a.charAt(0)?(i=n[a].apply(n,r),i!==n&&void 0!==i?(h=i&&i.jquery?h.pushStack(i.get()):i,!1):void 0):t.error("no such method '"+a+"' for "+e+" widget instance"):t.error("cannot call methods on "+e+" prior to initialization; "+"attempted to call method '"+a+"'")}):(r.length&&(a=t.widget.extend.apply(null,[a].concat(r))),this.each(function(){var e=t.data(this,s);e?(e.option(a||{}),e._init&&e._init()):t.data(this,s,new i(a,this))})),h}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(e,i){i=t(i||this.defaultElement||this)[0],this.element=t(i),this.uuid=s++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),i!==this&&(t.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===i&&this.destroy()}}),this.document=t(i.style?i.ownerDocument:i.document||i),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var s,n,a,o=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(o={},s=e.split("."),e=s.shift(),s.length){for(n=o[e]=t.widget.extend({},this.options[e]),a=0;s.length-1>a;a++)n[s[a]]=n[s[a]]||{},n=n[s[a]];if(e=s.pop(),1===arguments.length)return void 0===n[e]?null:n[e];n[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];o[e]=i}return this._setOptions(o),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return this.options[t]=e,"disabled"===t&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!e),e&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(e,i,s){var n,a=this;"boolean"!=typeof e&&(s=i,i=e,e=!1),s?(i=n=t(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),t.each(s,function(s,o){function r(){return e||a.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof o?a[o]:o).apply(a,arguments):void 0}"string"!=typeof o&&(r.guid=o.guid=o.guid||r.guid||t.guid++);var h=s.match(/^([\w:-]*)\s*(.*)$/),l=h[1]+a.eventNamespace,u=h[2];u?n.delegate(u,l,r):i.bind(l,r)})},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(i).undelegate(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,i,s){var n,a,o=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(t.isFunction(o)&&o.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,n,a){"string"==typeof n&&(n={effect:n});var o,r=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),o=!t.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),o&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,a):s.queue(function(i){t(this)[e](),a&&a.call(s[0]),i()})}}),t.widget;var a=!1;t(document).mouseup(function(){a=!1}),t.widget("ui.mouse",{version:"1.11.4",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.bind("mousedown."+this.widgetName,function(t){return e._mouseDown(t)}).bind("click."+this.widgetName,function(i){return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(e){if(!a){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(e),this._mouseDownEvent=e;var i=this,s=1===e.which,n="string"==typeof this.options.cancel&&e.target.nodeName?t(e.target).closest(this.options.cancel).length:!1;return s&&!n&&this._mouseCapture(e)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(e)!==!1,!this._mouseStarted)?(e.preventDefault(),!0):(!0===t.data(e.target,this.widgetName+".preventClickEvent")&&t.removeData(e.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(t){return i._mouseMove(t)},this._mouseUpDelegate=function(t){return i._mouseUp(t)},this.document.bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),e.preventDefault(),a=!0,!0)):!0}},_mouseMove:function(e){if(this._mouseMoved){if(t.ui.ie&&(!document.documentMode||9>document.documentMode)&&!e.button)return this._mouseUp(e);if(!e.which)return this._mouseUp(e)}return(e.which||e.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==!1,this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(e){return this.document.unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&t.data(e.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(e)),a=!1,!1},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),function(){function e(t,e,i){return[parseFloat(t[0])*(p.test(t[0])?e/100:1),parseFloat(t[1])*(p.test(t[1])?i/100:1)]}function i(e,i){return parseInt(t.css(e,i),10)||0}function s(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var n,a,o=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,u=/top|center|bottom/,c=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,p=/%$/,f=t.fn.position;t.position={scrollbarWidth:function(){if(void 0!==n)return n;var e,i,s=t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),a=s.children()[0];return t("body").append(s),e=a.offsetWidth,s.css("overflow","scroll"),i=a.offsetWidth,e===i&&(i=s[0].clientWidth),s.remove(),n=e-i},getScrollInfo:function(e){var i=e.isWindow||e.isDocument?"":e.element.css("overflow-x"),s=e.isWindow||e.isDocument?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,a="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:a?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:s,isDocument:n,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s||n?i.width():i.outerWidth(),height:s||n?i.height():i.outerHeight()}}},t.fn.position=function(n){if(!n||!n.of)return f.apply(this,arguments);n=t.extend({},n);var p,m,g,v,_,b,y=t(n.of),x=t.position.getWithinInfo(n.within),w=t.position.getScrollInfo(x),k=(n.collision||"flip").split(" "),D={};return b=s(y),y[0].preventDefault&&(n.at="left top"),m=b.width,g=b.height,v=b.offset,_=t.extend({},v),t.each(["my","at"],function(){var t,e,i=(n[this]||"").split(" ");1===i.length&&(i=l.test(i[0])?i.concat(["center"]):u.test(i[0])?["center"].concat(i):["center","center"]),i[0]=l.test(i[0])?i[0]:"center",i[1]=u.test(i[1])?i[1]:"center",t=c.exec(i[0]),e=c.exec(i[1]),D[this]=[t?t[0]:0,e?e[0]:0],n[this]=[d.exec(i[0])[0],d.exec(i[1])[0]]}),1===k.length&&(k[1]=k[0]),"right"===n.at[0]?_.left+=m:"center"===n.at[0]&&(_.left+=m/2),"bottom"===n.at[1]?_.top+=g:"center"===n.at[1]&&(_.top+=g/2),p=e(D.at,m,g),_.left+=p[0],_.top+=p[1],this.each(function(){var s,l,u=t(this),c=u.outerWidth(),d=u.outerHeight(),f=i(this,"marginLeft"),b=i(this,"marginTop"),T=c+f+i(this,"marginRight")+w.width,C=d+b+i(this,"marginBottom")+w.height,S=t.extend({},_),M=e(D.my,u.outerWidth(),u.outerHeight());"right"===n.my[0]?S.left-=c:"center"===n.my[0]&&(S.left-=c/2),"bottom"===n.my[1]?S.top-=d:"center"===n.my[1]&&(S.top-=d/2),S.left+=M[0],S.top+=M[1],a||(S.left=h(S.left),S.top=h(S.top)),s={marginLeft:f,marginTop:b},t.each(["left","top"],function(e,i){t.ui.position[k[e]]&&t.ui.position[k[e]][i](S,{targetWidth:m,targetHeight:g,elemWidth:c,elemHeight:d,collisionPosition:s,collisionWidth:T,collisionHeight:C,offset:[p[0]+M[0],p[1]+M[1]],my:n.my,at:n.at,within:x,elem:u})}),n.using&&(l=function(t){var e=v.left-S.left,i=e+m-c,s=v.top-S.top,a=s+g-d,h={target:{element:y,left:v.left,top:v.top,width:m,height:g},element:{element:u,left:S.left,top:S.top,width:c,height:d},horizontal:0>i?"left":e>0?"right":"center",vertical:0>a?"top":s>0?"bottom":"middle"};c>m&&m>r(e+i)&&(h.horizontal="center"),d>g&&g>r(s+a)&&(h.vertical="middle"),h.important=o(r(e),r(i))>o(r(s),r(a))?"horizontal":"vertical",n.using.call(this,t,h)}),u.offset(t.extend(S,{using:l}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=t.left-e.collisionPosition.marginLeft,h=n-r,l=r+e.collisionWidth-a-n;e.collisionWidth>a?h>0&&0>=l?(i=t.left+h+e.collisionWidth-a-n,t.left+=h-i):t.left=l>0&&0>=h?n:h>l?n+a-e.collisionWidth:n:h>0?t.left+=h:l>0?t.left-=l:t.left=o(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,a=e.within.height,r=t.top-e.collisionPosition.marginTop,h=n-r,l=r+e.collisionHeight-a-n;e.collisionHeight>a?h>0&&0>=l?(i=t.top+h+e.collisionHeight-a-n,t.top+=h-i):t.top=l>0&&0>=h?n:h>l?n+a-e.collisionHeight:n:h>0?t.top+=h:l>0?t.top-=l:t.top=o(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,a=n.offset.left+n.scrollLeft,o=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=t.left-e.collisionPosition.marginLeft,u=l-h,c=l+e.collisionWidth-o-h,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>u?(i=t.left+d+p+f+e.collisionWidth-o-a,(0>i||r(u)>i)&&(t.left+=d+p+f)):c>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-h,(s>0||c>r(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,a=n.offset.top+n.scrollTop,o=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=t.top-e.collisionPosition.marginTop,u=l-h,c=l+e.collisionHeight-o-h,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,m=-2*e.offset[1];0>u?(s=t.top+p+f+m+e.collisionHeight-o-a,(0>s||r(u)>s)&&(t.top+=p+f+m)):c>0&&(i=t.top-e.collisionPosition.marginTop+p+f+m-h,(i>0||c>r(i))&&(t.top+=p+f+m))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,s,n,o,r=document.getElementsByTagName("body")[0],h=document.createElement("div");e=document.createElement(r?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},r&&t.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(o in s)e.style[o]=s[o];e.appendChild(h),i=r||document.documentElement,i.insertBefore(e,i.firstChild),h.style.cssText="position: absolute; left: 10.7432222px;",n=t(h).offset().left,a=n>10&&11>n,e.innerHTML="",i.removeChild(e)}()}(),t.ui.position,t.widget("ui.menu",{version:"1.11.4",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},items:"> *",menus:"ul",position:{my:"left-1 top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item":function(t){t.preventDefault()},"click .ui-menu-item":function(e){var i=t(e.target);!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(e),e.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(e):!this.element.is(":focus")&&t(this.document[0].activeElement).closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(e){if(!this.previousFilter){var i=t(e.currentTarget);i.siblings(".ui-state-active").removeClass("ui-state-active"),this.focus(e,i)}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(t,e){var i=this.active||this.element.find(this.options.items).eq(0);e||this.focus(t,i)},blur:function(e){this._delay(function(){t.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(e)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(t){this._closeOnDocumentClick(t)&&this.collapseAll(t),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var e=t(this);e.data("ui-menu-submenu-carat")&&e.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(e){var i,s,n,a,o=!0;switch(e.keyCode){case t.ui.keyCode.PAGE_UP:this.previousPage(e);break;case t.ui.keyCode.PAGE_DOWN:this.nextPage(e);break;case t.ui.keyCode.HOME:this._move("first","first",e);break;case t.ui.keyCode.END:this._move("last","last",e);break;case t.ui.keyCode.UP:this.previous(e);break;case t.ui.keyCode.DOWN:this.next(e);break;case t.ui.keyCode.LEFT:this.collapse(e);break;case t.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(e);break;case t.ui.keyCode.ENTER:case t.ui.keyCode.SPACE:this._activate(e);break;case t.ui.keyCode.ESCAPE:this.collapse(e);break;default:o=!1,s=this.previousFilter||"",n=String.fromCharCode(e.keyCode),a=!1,clearTimeout(this.filterTimer),n===s?a=!0:n=s+n,i=this._filterMenuItems(n),i=a&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i,i.length||(n=String.fromCharCode(e.keyCode),i=this._filterMenuItems(n)),i.length?(this.focus(e,i),this.previousFilter=n,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}o&&e.preventDefault()},_activate:function(t){this.active.is(".ui-state-disabled")||(this.active.is("[aria-haspopup='true']")?this.expand(t):this.select(t))},refresh:function(){var e,i,s=this,n=this.options.icons.submenu,a=this.element.find(this.options.menus);this.element.toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length),a.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var e=t(this),i=e.parent(),s=t("<span>").addClass("ui-menu-icon ui-icon "+n).data("ui-menu-submenu-carat",!0);i.attr("aria-haspopup","true").prepend(s),e.attr("aria-labelledby",i.attr("id"))}),e=a.add(this.element),i=e.find(this.options.items),i.not(".ui-menu-item").each(function(){var e=t(this);s._isDivider(e)&&e.addClass("ui-widget-content ui-menu-divider")}),i.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),i.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!t.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(t,e){"icons"===t&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu),"disabled"===t&&this.element.toggleClass("ui-state-disabled",!!e).attr("aria-disabled",e),this._super(t,e)},focus:function(t,e){var i,s;this.blur(t,t&&"focus"===t.type),this._scrollIntoView(e),this.active=e.first(),s=this.active.addClass("ui-state-focus").removeClass("ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"),t&&"keydown"===t.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=e.children(".ui-menu"),i.length&&t&&/^mouse/.test(t.type)&&this._startOpening(i),this.activeMenu=e.parent(),this._trigger("focus",t,{item:e})},_scrollIntoView:function(e){var i,s,n,a,o,r;this._hasScroll()&&(i=parseFloat(t.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(t.css(this.activeMenu[0],"paddingTop"))||0,n=e.offset().top-this.activeMenu.offset().top-i-s,a=this.activeMenu.scrollTop(),o=this.activeMenu.height(),r=e.outerHeight(),0>n?this.activeMenu.scrollTop(a+n):n+r>o&&this.activeMenu.scrollTop(a+n-o+r))},blur:function(t,e){e||clearTimeout(this.timer),this.active&&(this.active.removeClass("ui-state-focus"),this.active=null,this._trigger("blur",t,{item:this.active}))},_startOpening:function(t){clearTimeout(this.timer),"true"===t.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(t)},this.delay))},_open:function(e){var i=t.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden","true"),e.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(e,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:t(e&&e.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(e),this.activeMenu=s},this.delay)},_close:function(t){t||(t=this.active?this.active.parent():this.element),t.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")},_closeOnDocumentClick:function(e){return!t(e.target).closest(".ui-menu").length},_isDivider:function(t){return!/[^\-\u2014\u2013\s]/.test(t.text())},collapse:function(t){var e=this.active&&this.active.parent().closest(".ui-menu-item",this.element);e&&e.length&&(this._close(),this.focus(t,e))},expand:function(t){var e=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();e&&e.length&&(this._open(e.parent()),this._delay(function(){this.focus(t,e)}))},next:function(t){this._move("next","first",t)},previous:function(t){this._move("prev","last",t)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(t,e,i){var s;this.active&&(s="first"===t||"last"===t?this.active["first"===t?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[t+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.find(this.options.items)[e]()),this.focus(i,s)},nextPage:function(e){var i,s,n;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=t(this),0>i.offset().top-s-n}),this.focus(e,i)):this.focus(e,this.activeMenu.find(this.options.items)[this.active?"last":"first"]())),void 0):(this.next(e),void 0)},previousPage:function(e){var i,s,n;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=t(this),i.offset().top-s+n>0}),this.focus(e,i)):this.focus(e,this.activeMenu.find(this.options.items).first())),void 0):(this.next(e),void 0)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(e){this.active=this.active||t(e.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(e,!0),this._trigger("select",e,i)},_filterMenuItems:function(e){var i=e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),s=RegExp("^"+i,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return s.test(t.trim(t(this).text()))})}}),t.widget("ui.selectmenu",{version:"1.11.4",defaultElement:"<select>",options:{appendTo:null,disabled:null,icons:{button:"ui-icon-triangle-1-s"},position:{my:"left top",at:"left bottom",collision:"none"},width:null,change:null,close:null,focus:null,open:null,select:null},_create:function(){var t=this.element.uniqueId().attr("id");this.ids={element:t,button:t+"-button",menu:t+"-menu"},this._drawButton(),this._drawMenu(),this.options.disabled&&this.disable()},_drawButton:function(){var e=this;this.label=t("label[for='"+this.ids.element+"']").attr("for",this.ids.button),this._on(this.label,{click:function(t){this.button.focus(),t.preventDefault()}}),this.element.hide(),this.button=t("<span>",{"class":"ui-selectmenu-button ui-widget ui-state-default ui-corner-all",tabindex:this.options.disabled?-1:0,id:this.ids.button,role:"combobox","aria-expanded":"false","aria-autocomplete":"list","aria-owns":this.ids.menu,"aria-haspopup":"true"}).insertAfter(this.element),t("<span>",{"class":"ui-icon "+this.options.icons.button}).prependTo(this.button),this.buttonText=t("<span>",{"class":"ui-selectmenu-text"}).appendTo(this.button),this._setText(this.buttonText,this.element.find("option:selected").text()),this._resizeButton(),this._on(this.button,this._buttonEvents),this.button.one("focusin",function(){e.menuItems||e._refreshMenu()}),this._hoverable(this.button),this._focusable(this.button)},_drawMenu:function(){var e=this;this.menu=t("<ul>",{"aria-hidden":"true","aria-labelledby":this.ids.button,id:this.ids.menu}),this.menuWrap=t("<div>",{"class":"ui-selectmenu-menu ui-front"}).append(this.menu).appendTo(this._appendTo()),this.menuInstance=this.menu.menu({role:"listbox",select:function(t,i){t.preventDefault(),e._setSelection(),e._select(i.item.data("ui-selectmenu-item"),t)},focus:function(t,i){var s=i.item.data("ui-selectmenu-item");null!=e.focusIndex&&s.index!==e.focusIndex&&(e._trigger("focus",t,{item:s}),e.isOpen||e._select(s,t)),e.focusIndex=s.index,e.button.attr("aria-activedescendant",e.menuItems.eq(s.index).attr("id"))}}).menu("instance"),this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"),this.menuInstance._off(this.menu,"mouseleave"),this.menuInstance._closeOnDocumentClick=function(){return!1},this.menuInstance._isDivider=function(){return!1}},refresh:function(){this._refreshMenu(),this._setText(this.buttonText,this._getSelectedItem().text()),this.options.width||this._resizeButton()},_refreshMenu:function(){this.menu.empty();var t,e=this.element.find("option");e.length&&(this._parseOptions(e),this._renderMenu(this.menu,this.items),this.menuInstance.refresh(),this.menuItems=this.menu.find("li").not(".ui-selectmenu-optgroup"),t=this._getSelectedItem(),this.menuInstance.focus(null,t),this._setAria(t.data("ui-selectmenu-item")),this._setOption("disabled",this.element.prop("disabled")))},open:function(t){this.options.disabled||(this.menuItems?(this.menu.find(".ui-state-focus").removeClass("ui-state-focus"),this.menuInstance.focus(null,this._getSelectedItem())):this._refreshMenu(),this.isOpen=!0,this._toggleAttr(),this._resizeMenu(),this._position(),this._on(this.document,this._documentClick),this._trigger("open",t))},_position:function(){this.menuWrap.position(t.extend({of:this.button},this.options.position))},close:function(t){this.isOpen&&(this.isOpen=!1,this._toggleAttr(),this.range=null,this._off(this.document),this._trigger("close",t))
},widget:function(){return this.button},menuWidget:function(){return this.menu},_renderMenu:function(e,i){var s=this,n="";t.each(i,function(i,a){a.optgroup!==n&&(t("<li>",{"class":"ui-selectmenu-optgroup ui-menu-divider"+(a.element.parent("optgroup").prop("disabled")?" ui-state-disabled":""),text:a.optgroup}).appendTo(e),n=a.optgroup),s._renderItemData(e,a)})},_renderItemData:function(t,e){return this._renderItem(t,e).data("ui-selectmenu-item",e)},_renderItem:function(e,i){var s=t("<li>");return i.disabled&&s.addClass("ui-state-disabled"),this._setText(s,i.label),s.appendTo(e)},_setText:function(t,e){e?t.text(e):t.html("&#160;")},_move:function(t,e){var i,s,n=".ui-menu-item";this.isOpen?i=this.menuItems.eq(this.focusIndex):(i=this.menuItems.eq(this.element[0].selectedIndex),n+=":not(.ui-state-disabled)"),s="first"===t||"last"===t?i["first"===t?"prevAll":"nextAll"](n).eq(-1):i[t+"All"](n).eq(0),s.length&&this.menuInstance.focus(e,s)},_getSelectedItem:function(){return this.menuItems.eq(this.element[0].selectedIndex)},_toggle:function(t){this[this.isOpen?"close":"open"](t)},_setSelection:function(){var t;this.range&&(window.getSelection?(t=window.getSelection(),t.removeAllRanges(),t.addRange(this.range)):this.range.select(),this.button.focus())},_documentClick:{mousedown:function(e){this.isOpen&&(t(e.target).closest(".ui-selectmenu-menu, #"+this.ids.button).length||this.close(e))}},_buttonEvents:{mousedown:function(){var t;window.getSelection?(t=window.getSelection(),t.rangeCount&&(this.range=t.getRangeAt(0))):this.range=document.selection.createRange()},click:function(t){this._setSelection(),this._toggle(t)},keydown:function(e){var i=!0;switch(e.keyCode){case t.ui.keyCode.TAB:case t.ui.keyCode.ESCAPE:this.close(e),i=!1;break;case t.ui.keyCode.ENTER:this.isOpen&&this._selectFocusedItem(e);break;case t.ui.keyCode.UP:e.altKey?this._toggle(e):this._move("prev",e);break;case t.ui.keyCode.DOWN:e.altKey?this._toggle(e):this._move("next",e);break;case t.ui.keyCode.SPACE:this.isOpen?this._selectFocusedItem(e):this._toggle(e);break;case t.ui.keyCode.LEFT:this._move("prev",e);break;case t.ui.keyCode.RIGHT:this._move("next",e);break;case t.ui.keyCode.HOME:case t.ui.keyCode.PAGE_UP:this._move("first",e);break;case t.ui.keyCode.END:case t.ui.keyCode.PAGE_DOWN:this._move("last",e);break;default:this.menu.trigger(e),i=!1}i&&e.preventDefault()}},_selectFocusedItem:function(t){var e=this.menuItems.eq(this.focusIndex);e.hasClass("ui-state-disabled")||this._select(e.data("ui-selectmenu-item"),t)},_select:function(t,e){var i=this.element[0].selectedIndex;this.element[0].selectedIndex=t.index,this._setText(this.buttonText,t.label),this._setAria(t),this._trigger("select",e,{item:t}),t.index!==i&&this._trigger("change",e,{item:t}),this.close(e)},_setAria:function(t){var e=this.menuItems.eq(t.index).attr("id");this.button.attr({"aria-labelledby":e,"aria-activedescendant":e}),this.menu.attr("aria-activedescendant",e)},_setOption:function(t,e){"icons"===t&&this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(e.button),this._super(t,e),"appendTo"===t&&this.menuWrap.appendTo(this._appendTo()),"disabled"===t&&(this.menuInstance.option("disabled",e),this.button.toggleClass("ui-state-disabled",e).attr("aria-disabled",e),this.element.prop("disabled",e),e?(this.button.attr("tabindex",-1),this.close()):this.button.attr("tabindex",0)),"width"===t&&this._resizeButton()},_appendTo:function(){var e=this.options.appendTo;return e&&(e=e.jquery||e.nodeType?t(e):this.document.find(e).eq(0)),e&&e[0]||(e=this.element.closest(".ui-front")),e.length||(e=this.document[0].body),e},_toggleAttr:function(){this.button.toggleClass("ui-corner-top",this.isOpen).toggleClass("ui-corner-all",!this.isOpen).attr("aria-expanded",this.isOpen),this.menuWrap.toggleClass("ui-selectmenu-open",this.isOpen),this.menu.attr("aria-hidden",!this.isOpen)},_resizeButton:function(){var t=this.options.width;t||(t=this.element.show().outerWidth(),this.element.hide()),this.button.outerWidth(t)},_resizeMenu:function(){this.menu.outerWidth(Math.max(this.button.outerWidth(),this.menu.width("").outerWidth()+1))},_getCreateOptions:function(){return{disabled:this.element.prop("disabled")}},_parseOptions:function(e){var i=[];e.each(function(e,s){var n=t(s),a=n.parent("optgroup");i.push({element:n,index:e,value:n.val(),label:n.text(),optgroup:a.attr("label")||"",disabled:a.prop("disabled")||n.prop("disabled")})}),this.items=i},_destroy:function(){this.menuWrap.remove(),this.button.remove(),this.element.show(),this.element.removeUniqueId(),this.label.attr("for",this.ids.element)}}),t.widget("ui.slider",t.ui.mouse,{version:"1.11.4",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var e,i,s=this.options,n=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),a="<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",o=[];for(i=s.values&&s.values.length||1,n.length>i&&(n.slice(i).remove(),n=n.slice(0,i)),e=n.length;i>e;e++)o.push(a);this.handles=n.add(t(o.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(e){t(this).data("ui-slider-handle-index",e)})},_createRange:function(){var e=this.options,i="";e.range?(e.range===!0&&(e.values?e.values.length&&2!==e.values.length?e.values=[e.values[0],e.values[0]]:t.isArray(e.values)&&(e.values=e.values.slice(0)):e.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=t("<div></div>").appendTo(this.element),i="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(i+("min"===e.range||"max"===e.range?" ui-slider-range-"+e.range:""))):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(e){var i,s,n,a,o,r,h,l,u=this,c=this.options;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:e.pageX,y:e.pageY},s=this._normValueFromMouse(i),n=this._valueMax()-this._valueMin()+1,this.handles.each(function(e){var i=Math.abs(s-u.values(e));(n>i||n===i&&(e===u._lastChangedValue||u.values(e)===c.min))&&(n=i,a=t(this),o=e)}),r=this._start(e,o),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=o,a.addClass("ui-state-active").focus(),h=a.offset(),l=!t(e.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:e.pageX-h.left-a.width()/2,top:e.pageY-h.top-a.height()/2-(parseInt(a.css("borderTopWidth"),10)||0)-(parseInt(a.css("borderBottomWidth"),10)||0)+(parseInt(a.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(e,o,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(t){var e={x:t.pageX,y:t.pageY},i=this._normValueFromMouse(e);return this._slide(t,this._handleIndex,i),!1},_mouseStop:function(t){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(t,this._handleIndex),this._change(t,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(t){var e,i,s,n,a;return"horizontal"===this.orientation?(e=this.elementSize.width,i=t.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(e=this.elementSize.height,i=t.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/e,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),n=this._valueMax()-this._valueMin(),a=this._valueMin()+s*n,this._trimAlignValue(a)},_start:function(t,e){var i={handle:this.handles[e],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("start",t,i)},_slide:function(t,e,i){var s,n,a;this.options.values&&this.options.values.length?(s=this.values(e?0:1),2===this.options.values.length&&this.options.range===!0&&(0===e&&i>s||1===e&&s>i)&&(i=s),i!==this.values(e)&&(n=this.values(),n[e]=i,a=this._trigger("slide",t,{handle:this.handles[e],value:i,values:n}),s=this.values(e?0:1),a!==!1&&this.values(e,i))):i!==this.value()&&(a=this._trigger("slide",t,{handle:this.handles[e],value:i}),a!==!1&&this.value(i))},_stop:function(t,e){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("stop",t,i)},_change:function(t,e){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._lastChangedValue=e,this._trigger("change",t,i)}},value:function(t){return arguments.length?(this.options.value=this._trimAlignValue(t),this._refreshValue(),this._change(null,0),void 0):this._value()},values:function(e,i){var s,n,a;if(arguments.length>1)return this.options.values[e]=this._trimAlignValue(i),this._refreshValue(),this._change(null,e),void 0;if(!arguments.length)return this._values();if(!t.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(e):this.value();for(s=this.options.values,n=arguments[0],a=0;s.length>a;a+=1)s[a]=this._trimAlignValue(n[a]),this._change(null,a);this._refreshValue()},_setOption:function(e,i){var s,n=0;switch("range"===e&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),t.isArray(this.options.values)&&(n=this.options.values.length),"disabled"===e&&this.element.toggleClass("ui-state-disabled",!!i),this._super(e,i),e){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue(),this.handles.css("horizontal"===i?"bottom":"left","");break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=0;n>s;s+=1)this._change(null,s);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var t=this.options.value;return t=this._trimAlignValue(t)},_values:function(t){var e,i,s;if(arguments.length)return e=this.options.values[t],e=this._trimAlignValue(e);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(t){if(this._valueMin()>=t)return this._valueMin();if(t>=this._valueMax())return this._valueMax();var e=this.options.step>0?this.options.step:1,i=(t-this._valueMin())%e,s=t-i;return 2*Math.abs(i)>=e&&(s+=i>0?e:-e),parseFloat(s.toFixed(5))},_calculateNewMax:function(){var t=this.options.max,e=this._valueMin(),i=this.options.step,s=Math.floor(+(t-e).toFixed(this._precision())/i)*i;t=s+e,this.max=parseFloat(t.toFixed(this._precision()))},_precision:function(){var t=this._precisionOf(this.options.step);return null!==this.options.min&&(t=Math.max(t,this._precisionOf(this.options.min))),t},_precisionOf:function(t){var e=""+t,i=e.indexOf(".");return-1===i?0:e.length-i-1},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshValue:function(){var e,i,s,n,a,o=this.options.range,r=this.options,h=this,l=this._animateOff?!1:r.animate,u={};this.options.values&&this.options.values.length?this.handles.each(function(s){i=100*((h.values(s)-h._valueMin())/(h._valueMax()-h._valueMin())),u["horizontal"===h.orientation?"left":"bottom"]=i+"%",t(this).stop(1,1)[l?"animate":"css"](u,r.animate),h.options.range===!0&&("horizontal"===h.orientation?(0===s&&h.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({width:i-e+"%"},{queue:!1,duration:r.animate})):(0===s&&h.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({height:i-e+"%"},{queue:!1,duration:r.animate}))),e=i}):(s=this.value(),n=this._valueMin(),a=this._valueMax(),i=a!==n?100*((s-n)/(a-n)):0,u["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](u,r.animate),"min"===o&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},r.animate),"max"===o&&"horizontal"===this.orientation&&this.range[l?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:r.animate}),"min"===o&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},r.animate),"max"===o&&"vertical"===this.orientation&&this.range[l?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:r.animate}))},_handleEvents:{keydown:function(e){var i,s,n,a,o=t(e.target).data("ui-slider-handle-index");switch(e.keyCode){case t.ui.keyCode.HOME:case t.ui.keyCode.END:case t.ui.keyCode.PAGE_UP:case t.ui.keyCode.PAGE_DOWN:case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(e.preventDefault(),!this._keySliding&&(this._keySliding=!0,t(e.target).addClass("ui-state-active"),i=this._start(e,o),i===!1))return}switch(a=this.options.step,s=n=this.options.values&&this.options.values.length?this.values(o):this.value(),e.keyCode){case t.ui.keyCode.HOME:n=this._valueMin();break;case t.ui.keyCode.END:n=this._valueMax();break;case t.ui.keyCode.PAGE_UP:n=this._trimAlignValue(s+(this._valueMax()-this._valueMin())/this.numPages);break;case t.ui.keyCode.PAGE_DOWN:n=this._trimAlignValue(s-(this._valueMax()-this._valueMin())/this.numPages);break;case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:if(s===this._valueMax())return;n=this._trimAlignValue(s+a);break;case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(s===this._valueMin())return;n=this._trimAlignValue(s-a)}this._slide(e,o,n)},keyup:function(e){var i=t(e.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(e,i),this._change(e,i),t(e.target).removeClass("ui-state-active"))}}})});

/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);


/* == malihu jquery custom scrollbar plugin == Version: 3.1.3, License: MIT License (MIT) */
!function(e){"undefined"!=typeof module&&module.exports?module.exports=e:e(jQuery,window,document)}(function(e){!function(t){var o="function"==typeof define&&define.amd,a="undefined"!=typeof module&&module.exports,n="https:"==document.location.protocol?"https:":"http:",i="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";o||(a?require("jquery-mousewheel")(e):e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//"+i+"%3E%3C/script%3E"))),t()}(function(){var t,o="mCustomScrollbar",a="mCS",n=".mCustomScrollbar",i={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,documentTouchScroll:!0,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:"auto",autoUpdateTimeout:60},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},r=0,l={},s=window.attachEvent&&!window.addEventListener?1:0,c=!1,d=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],u={init:function(t){var t=e.extend(!0,{},i,t),o=f.call(this);if(t.live){var s=t.liveSelector||this.selector||n,c=e(s);if("off"===t.live)return void m(s);l[s]=setTimeout(function(){c.mCustomScrollbar(t),"once"===t.live&&c.length&&m(s)},500)}else m(s);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":p(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=g(t.scrollButtons.scrollType),h(t),e(o).each(function(){var o=e(this);if(!o.data(a)){o.data(a,{idx:++r,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:o.css("direction"),cbOffsets:null,trigger:null,poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}});var n=o.data(a),i=n.opt,l=o.data("mcs-axis"),s=o.data("mcs-scrollbar-position"),c=o.data("mcs-theme");l&&(i.axis=l),s&&(i.scrollbarPosition=s),c&&(i.theme=c,h(i)),v.call(this),n&&i.callbacks.onCreate&&"function"==typeof i.callbacks.onCreate&&i.callbacks.onCreate.call(this),e("#mCSB_"+n.idx+"_container img:not(."+d[2]+")").addClass(d[2]),u.update.call(null,o)}})},update:function(t,o){var n=t||f.call(this);return e(n).each(function(){var t=e(this);if(t.data(a)){var n=t.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container"),l=e("#mCSB_"+n.idx),s=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];if(!r.length)return;n.tweenRunning&&N(t),o&&n&&i.callbacks.onBeforeUpdate&&"function"==typeof i.callbacks.onBeforeUpdate&&i.callbacks.onBeforeUpdate.call(this),t.hasClass(d[3])&&t.removeClass(d[3]),t.hasClass(d[4])&&t.removeClass(d[4]),l.css("max-height","none"),l.height()!==t.height()&&l.css("max-height",t.height()),_.call(this),"y"===i.axis||i.advanced.autoExpandHorizontalScroll||r.css("width",x(r)),n.overflowed=y.call(this),M.call(this),i.autoDraggerLength&&S.call(this),b.call(this),T.call(this);var c=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];"x"!==i.axis&&(n.overflowed[0]?s[0].height()>s[0].parent().height()?B.call(this):(V(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}),n.contentReset.y=null):(B.call(this),"y"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[1]&&V(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==i.axis&&(n.overflowed[1]?s[1].width()>s[1].parent().width()?B.call(this):(V(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}),n.contentReset.x=null):(B.call(this),"x"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[0]&&V(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),o&&n&&(2===o&&i.callbacks.onImageLoad&&"function"==typeof i.callbacks.onImageLoad?i.callbacks.onImageLoad.call(this):3===o&&i.callbacks.onSelectorChange&&"function"==typeof i.callbacks.onSelectorChange?i.callbacks.onSelectorChange.call(this):i.callbacks.onUpdate&&"function"==typeof i.callbacks.onUpdate&&i.callbacks.onUpdate.call(this)),X.call(this)}})},scrollTo:function(t,o){if("undefined"!=typeof t&&null!=t){var n=f.call(this);return e(n).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l={trigger:"external",scrollInertia:r.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},s=e.extend(!0,{},l,o),c=q.call(this,t),d=s.scrollInertia>0&&s.scrollInertia<17?17:s.scrollInertia;c[0]=Y.call(this,c[0],"y"),c[1]=Y.call(this,c[1],"x"),s.moveDragger&&(c[0]*=i.scrollRatio.y,c[1]*=i.scrollRatio.x),s.dur=oe()?0:d,setTimeout(function(){null!==c[0]&&"undefined"!=typeof c[0]&&"x"!==r.axis&&i.overflowed[0]&&(s.dir="y",s.overwrite="all",V(n,c[0].toString(),s)),null!==c[1]&&"undefined"!=typeof c[1]&&"y"!==r.axis&&i.overflowed[1]&&(s.dir="x",s.overwrite="none",V(n,c[1].toString(),s))},s.timeout)}})}},stop:function(){var t=f.call(this);return e(t).each(function(){var t=e(this);t.data(a)&&N(t)})},disable:function(t){var o=f.call(this);return e(o).each(function(){var o=e(this);if(o.data(a)){{o.data(a)}X.call(this,"remove"),k.call(this),t&&B.call(this),M.call(this,!0),o.addClass(d[3])}})},destroy:function(){var t=f.call(this);return e(t).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),c=e(".mCSB_"+i.idx+"_scrollbar");r.live&&m(r.liveSelector||e(t).selector),X.call(this,"remove"),k.call(this),B.call(this),n.removeData(a),K(this,"mcs"),c.remove(),s.find("img."+d[2]).removeClass(d[2]),l.replaceWith(s.contents()),n.removeClass(o+" _"+a+"_"+i.idx+" "+d[6]+" "+d[7]+" "+d[5]+" "+d[3]).addClass(d[4])}})}},f=function(){return"object"!=typeof e(this)||e(this).length<1?n:this},h=function(t){var o=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],a=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],n=["minimal","minimal-dark"],i=["minimal","minimal-dark"],r=["minimal","minimal-dark"];t.autoDraggerLength=e.inArray(t.theme,o)>-1?!1:t.autoDraggerLength,t.autoExpandScrollbar=e.inArray(t.theme,a)>-1?!1:t.autoExpandScrollbar,t.scrollButtons.enable=e.inArray(t.theme,n)>-1?!1:t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,i)>-1?!0:t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,r)>-1?"outside":t.scrollbarPosition},m=function(e){l[e]&&(clearTimeout(l[e]),K(l,e))},p=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},g=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},v=function(){var t=e(this),n=t.data(a),i=n.opt,r=i.autoExpandScrollbar?" "+d[1]+"_expand":"",l=["<div id='mCSB_"+n.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_vertical"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+n.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_horizontal"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],s="yx"===i.axis?"mCSB_vertical_horizontal":"x"===i.axis?"mCSB_horizontal":"mCSB_vertical",c="yx"===i.axis?l[0]+l[1]:"x"===i.axis?l[1]:l[0],u="yx"===i.axis?"<div id='mCSB_"+n.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",f=i.autoHideScrollbar?" "+d[6]:"",h="x"!==i.axis&&"rtl"===n.langDir?" "+d[7]:"";i.setWidth&&t.css("width",i.setWidth),i.setHeight&&t.css("height",i.setHeight),i.setLeft="y"!==i.axis&&"rtl"===n.langDir?"989999px":i.setLeft,t.addClass(o+" _"+a+"_"+n.idx+f+h).wrapInner("<div id='mCSB_"+n.idx+"' class='mCustomScrollBox mCS-"+i.theme+" "+s+"'><div id='mCSB_"+n.idx+"_container' class='mCSB_container' style='position:relative; top:"+i.setTop+"; left:"+i.setLeft+";' dir="+n.langDir+" /></div>");var m=e("#mCSB_"+n.idx),p=e("#mCSB_"+n.idx+"_container");"y"===i.axis||i.advanced.autoExpandHorizontalScroll||p.css("width",x(p)),"outside"===i.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),m.addClass("mCSB_outside").after(c)):(m.addClass("mCSB_inside").append(c),p.wrap(u)),w.call(this);var g=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},x=function(t){var o=[t[0].scrollWidth,Math.max.apply(Math,t.children().map(function(){return e(this).outerWidth(!0)}).get())],a=t.parent().width();return o[0]>a?o[0]:o[1]>a?o[1]:"100%"},_=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx+"_container");if(n.advanced.autoExpandHorizontalScroll&&"y"!==n.axis){i.css({width:"auto","min-width":0,"overflow-x":"scroll"});var r=Math.ceil(i[0].scrollWidth);3===n.advanced.autoExpandHorizontalScroll||2!==n.advanced.autoExpandHorizontalScroll&&r>i.parent().width()?i.css({width:r,"min-width":"100%","overflow-x":"inherit"}):i.css({"overflow-x":"inherit",position:"absolute"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(i[0].getBoundingClientRect().right+.4)-Math.floor(i[0].getBoundingClientRect().left),"min-width":"100%",position:"relative"}).unwrap()}},w=function(){var t=e(this),o=t.data(a),n=o.opt,i=e(".mCSB_"+o.idx+"_scrollbar:first"),r=ee(n.scrollButtons.tabindex)?"tabindex='"+n.scrollButtons.tabindex+"'":"",l=["<a href='#' class='"+d[13]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[14]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[15]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[16]+"' oncontextmenu='return false;' "+r+" />"],s=["x"===n.axis?l[2]:l[0],"x"===n.axis?l[3]:l[1],l[2],l[3]];n.scrollButtons.enable&&i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])},S=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[n.height()/i.outerHeight(!1),n.width()/i.outerWidth(!1)],c=[parseInt(r[0].css("min-height")),Math.round(l[0]*r[0].parent().height()),parseInt(r[1].css("min-width")),Math.round(l[1]*r[1].parent().width())],d=s&&c[1]<c[0]?c[0]:c[1],u=s&&c[3]<c[2]?c[2]:c[3];r[0].css({height:d,"max-height":r[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":c[0]+"px"}),r[1].css({width:u,"max-width":r[1].parent().width()-10})},b=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[i.outerHeight(!1)-n.height(),i.outerWidth(!1)-n.width()],s=[l[0]/(r[0].parent().height()-r[0].height()),l[1]/(r[1].parent().width()-r[1].width())];o.scrollRatio={y:s[0],x:s[1]}},C=function(e,t,o){var a=o?d[0]+"_expanded":"",n=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(d[0]+" "+a),n.toggleClass(d[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(d[0]),n.removeClass(d[1])):(e.addClass(d[0]),n.addClass(d[1])))},y=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=null==o.overflowed?i.height():i.outerHeight(!1),l=null==o.overflowed?i.width():i.outerWidth(!1),s=i[0].scrollHeight,c=i[0].scrollWidth;return s>r&&(r=s),c>l&&(l=c),[r>n.height(),l>n.width()]},B=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx),r=e("#mCSB_"+o.idx+"_container"),l=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(N(t),("x"!==n.axis&&!o.overflowed[0]||"y"===n.axis&&o.overflowed[0])&&(l[0].add(r).css("top",0),V(t,"_resetY")),"y"!==n.axis&&!o.overflowed[1]||"x"===n.axis&&o.overflowed[1]){var s=dx=0;"rtl"===o.langDir&&(s=i.width()-r.outerWidth(!1),dx=Math.abs(s/o.scrollRatio.x)),r.css("left",s),l[1].css("left",dx),V(t,"_resetX")}},T=function(){function t(){r=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(r),R.call(o[0])):t()},100)}var o=e(this),n=o.data(a),i=n.opt;if(!n.bindEvents){if(I.call(this),i.contentTouchScroll&&D.call(this),E.call(this),i.mouseWheel.enable){var r;t()}L.call(this),P.call(this),i.advanced.autoScrollOnFocus&&z.call(this),i.scrollButtons.enable&&H.call(this),i.keyboard.enable&&U.call(this),n.bindEvents=!0}},k=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=".mCSB_"+o.idx+"_scrollbar",l=e("#mCSB_"+o.idx+",#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,"+r+" ."+d[12]+",#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal,"+r+">a"),s=e("#mCSB_"+o.idx+"_container");n.advanced.releaseDraggableSelectors&&l.add(e(n.advanced.releaseDraggableSelectors)),n.advanced.extraDraggableSelectors&&l.add(e(n.advanced.extraDraggableSelectors)),o.bindEvents&&(e(document).add(e(!W()||top.document)).unbind("."+i),l.each(function(){e(this).unbind("."+i)}),clearTimeout(t[0]._focusTimeout),K(t[0],"_focusTimeout"),clearTimeout(o.sequential.step),K(o.sequential,"step"),clearTimeout(s[0].onCompleteTimeout),K(s[0],"onCompleteTimeout"),o.bindEvents=!1)},M=function(t){var o=e(this),n=o.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container_wrapper"),l=r.length?r:e("#mCSB_"+n.idx+"_container"),s=[e("#mCSB_"+n.idx+"_scrollbar_vertical"),e("#mCSB_"+n.idx+"_scrollbar_horizontal")],c=[s[0].find(".mCSB_dragger"),s[1].find(".mCSB_dragger")];"x"!==i.axis&&(n.overflowed[0]&&!t?(s[0].add(c[0]).add(s[0].children("a")).css("display","block"),l.removeClass(d[8]+" "+d[10])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[0].css("display","none"),l.removeClass(d[10])):(s[0].css("display","none"),l.addClass(d[10])),l.addClass(d[8]))),"y"!==i.axis&&(n.overflowed[1]&&!t?(s[1].add(c[1]).add(s[1].children("a")).css("display","block"),l.removeClass(d[9]+" "+d[11])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[1].css("display","none"),l.removeClass(d[11])):(s[1].css("display","none"),l.addClass(d[11])),l.addClass(d[9]))),n.overflowed[0]||n.overflowed[1]?o.removeClass(d[5]):o.addClass(d[5])},O=function(t){var o=t.type,a=t.target.ownerDocument!==document?[e(frameElement).offset().top,e(frameElement).offset().left]:null,n=W()&&t.target.ownerDocument!==top.document?[e(t.view.frameElement).offset().top,e(t.view.frameElement).offset().left]:[0,0];switch(o){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return a?[t.originalEvent.pageY-a[0]+n[0],t.originalEvent.pageX-a[1]+n[1],!1]:[t.originalEvent.pageY,t.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var i=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],r=t.originalEvent.touches.length||t.originalEvent.changedTouches.length;return t.target.ownerDocument!==document?[i.screenY,i.screenX,r>1]:[i.pageY,i.pageX,r>1];default:return a?[t.pageY-a[0]+n[0],t.pageX-a[1]+n[1],!1]:[t.pageY,t.pageX,!1]}},I=function(){function t(e){var t=m.find("iframe");if(t.length){var o=e?"auto":"none";t.css("pointer-events",o)}}function o(e,t,o,a){if(m[0].idleTimer=u.scrollInertia<233?250:0,n.attr("id")===h[1])var i="x",r=(n[0].offsetLeft-t+a)*d.scrollRatio.x;else var i="y",r=(n[0].offsetTop-e+o)*d.scrollRatio.y;V(l,r.toString(),{dir:i,drag:!0})}var n,i,r,l=e(this),d=l.data(a),u=d.opt,f=a+"_"+d.idx,h=["mCSB_"+d.idx+"_dragger_vertical","mCSB_"+d.idx+"_dragger_horizontal"],m=e("#mCSB_"+d.idx+"_container"),p=e("#"+h[0]+",#"+h[1]),g=u.advanced.releaseDraggableSelectors?p.add(e(u.advanced.releaseDraggableSelectors)):p,v=u.advanced.extraDraggableSelectors?e(!W()||top.document).add(e(u.advanced.extraDraggableSelectors)):e(!W()||top.document);p.bind("mousedown."+f+" touchstart."+f+" pointerdown."+f+" MSPointerDown."+f,function(o){if(o.stopImmediatePropagation(),o.preventDefault(),Z(o)){c=!0,s&&(document.onselectstart=function(){return!1}),t(!1),N(l),n=e(this);var a=n.offset(),d=O(o)[0]-a.top,f=O(o)[1]-a.left,h=n.height()+a.top,m=n.width()+a.left;h>d&&d>0&&m>f&&f>0&&(i=d,r=f),C(n,"active",u.autoExpandScrollbar)}}).bind("touchmove."+f,function(e){e.stopImmediatePropagation(),e.preventDefault();var t=n.offset(),a=O(e)[0]-t.top,l=O(e)[1]-t.left;o(i,r,a,l)}),e(document).add(v).bind("mousemove."+f+" pointermove."+f+" MSPointerMove."+f,function(e){if(n){var t=n.offset(),a=O(e)[0]-t.top,l=O(e)[1]-t.left;if(i===a&&r===l)return;o(i,r,a,l)}}).add(g).bind("mouseup."+f+" touchend."+f+" pointerup."+f+" MSPointerUp."+f,function(e){n&&(C(n,"active",u.autoExpandScrollbar),n=null),c=!1,s&&(document.onselectstart=null),t(!0)})},D=function(){function o(e){if(!$(e)||c||O(e)[2])return void(t=0);t=1,b=0,C=0,d=1,y.removeClass("mCS_touch_action");var o=I.offset();u=O(e)[0]-o.top,f=O(e)[1]-o.left,z=[O(e)[0],O(e)[1]]}function n(e){if($(e)&&!c&&!O(e)[2]&&(T.documentTouchScroll||e.preventDefault(),e.stopImmediatePropagation(),(!C||b)&&d)){g=G();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left,n="mcsLinearOut";if(E.push(o),R.push(a),z[2]=Math.abs(O(e)[0]-z[0]),z[3]=Math.abs(O(e)[1]-z[1]),B.overflowed[0])var i=D[0].parent().height()-D[0].height(),r=u-o>0&&o-u>-(i*B.scrollRatio.y)&&(2*z[3]<z[2]||"yx"===T.axis);if(B.overflowed[1])var l=D[1].parent().width()-D[1].width(),h=f-a>0&&a-f>-(l*B.scrollRatio.x)&&(2*z[2]<z[3]||"yx"===T.axis);r||h?(U||e.preventDefault(),b=1):(C=1,y.addClass("mCS_touch_action")),U&&e.preventDefault(),w="yx"===T.axis?[u-o,f-a]:"x"===T.axis?[null,f-a]:[u-o,null],I[0].idleTimer=250,B.overflowed[0]&&s(w[0],A,n,"y","all",!0),B.overflowed[1]&&s(w[1],A,n,"x",L,!0)}}function i(e){if(!$(e)||c||O(e)[2])return void(t=0);t=1,e.stopImmediatePropagation(),N(y),p=G();var o=M.offset();h=O(e)[0]-o.top,m=O(e)[1]-o.left,E=[],R=[]}function r(e){if($(e)&&!c&&!O(e)[2]){d=0,e.stopImmediatePropagation(),b=0,C=0,v=G();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left;if(!(v-g>30)){_=1e3/(v-p);var n="mcsEaseOut",i=2.5>_,r=i?[E[E.length-2],R[R.length-2]]:[0,0];x=i?[o-r[0],a-r[1]]:[o-h,a-m];var u=[Math.abs(x[0]),Math.abs(x[1])];_=i?[Math.abs(x[0]/4),Math.abs(x[1]/4)]:[_,_];var f=[Math.abs(I[0].offsetTop)-x[0]*l(u[0]/_[0],_[0]),Math.abs(I[0].offsetLeft)-x[1]*l(u[1]/_[1],_[1])];w="yx"===T.axis?[f[0],f[1]]:"x"===T.axis?[null,f[1]]:[f[0],null],S=[4*u[0]+T.scrollInertia,4*u[1]+T.scrollInertia];var y=parseInt(T.contentTouchScroll)||0;w[0]=u[0]>y?w[0]:0,w[1]=u[1]>y?w[1]:0,B.overflowed[0]&&s(w[0],S[0],n,"y",L,!1),B.overflowed[1]&&s(w[1],S[1],n,"x",L,!1)}}}function l(e,t){var o=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?o[0]:o[3]:e>60?t>3?o[3]:o[2]:e>30?t>8?o[1]:t>6?o[0]:t>4?t:o[2]:t>8?t:o[3]}function s(e,t,o,a,n,i){e&&V(y,e.toString(),{dur:t,scrollEasing:o,dir:a,overwrite:n,drag:i})}var d,u,f,h,m,p,g,v,x,_,w,S,b,C,y=e(this),B=y.data(a),T=B.opt,k=a+"_"+B.idx,M=e("#mCSB_"+B.idx),I=e("#mCSB_"+B.idx+"_container"),D=[e("#mCSB_"+B.idx+"_dragger_vertical"),e("#mCSB_"+B.idx+"_dragger_horizontal")],E=[],R=[],A=0,L="yx"===T.axis?"none":"all",z=[],P=I.find("iframe"),H=["touchstart."+k+" pointerdown."+k+" MSPointerDown."+k,"touchmove."+k+" pointermove."+k+" MSPointerMove."+k,"touchend."+k+" pointerup."+k+" MSPointerUp."+k],U=void 0!==document.body.style.touchAction;I.bind(H[0],function(e){o(e)}).bind(H[1],function(e){n(e)}),M.bind(H[0],function(e){i(e)}).bind(H[2],function(e){r(e)}),P.length&&P.each(function(){e(this).load(function(){W(this)&&e(this.contentDocument||this.contentWindow.document).bind(H[0],function(e){o(e),i(e)}).bind(H[1],function(e){n(e)}).bind(H[2],function(e){r(e)})})})},E=function(){function o(){return window.getSelection?window.getSelection().toString():document.selection&&"Control"!=document.selection.type?document.selection.createRange().text:0}function n(e,t,o){d.type=o&&i?"stepped":"stepless",d.scrollAmount=10,F(r,e,t,"mcsLinearOut",o?60:null)}var i,r=e(this),l=r.data(a),s=l.opt,d=l.sequential,u=a+"_"+l.idx,f=e("#mCSB_"+l.idx+"_container"),h=f.parent();f.bind("mousedown."+u,function(e){t||i||(i=1,c=!0)}).add(document).bind("mousemove."+u,function(e){if(!t&&i&&o()){var a=f.offset(),r=O(e)[0]-a.top+f[0].offsetTop,c=O(e)[1]-a.left+f[0].offsetLeft;r>0&&r<h.height()&&c>0&&c<h.width()?d.step&&n("off",null,"stepped"):("x"!==s.axis&&l.overflowed[0]&&(0>r?n("on",38):r>h.height()&&n("on",40)),"y"!==s.axis&&l.overflowed[1]&&(0>c?n("on",37):c>h.width()&&n("on",39)))}}).bind("mouseup."+u+" dragend."+u,function(e){t||(i&&(i=0,n("off",null)),c=!1)})},R=function(){function t(t,a){if(N(o),!A(o,t.target)){var r="auto"!==i.mouseWheel.deltaFactor?parseInt(i.mouseWheel.deltaFactor):s&&t.deltaFactor<100?100:t.deltaFactor||100,d=i.scrollInertia;if("x"===i.axis||"x"===i.mouseWheel.axis)var u="x",f=[Math.round(r*n.scrollRatio.x),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.width()?.9*l.width():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetLeft),p=c[1][0].offsetLeft,g=c[1].parent().width()-c[1].width(),v=t.deltaX||t.deltaY||a;else var u="y",f=[Math.round(r*n.scrollRatio.y),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.height()?.9*l.height():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetTop),p=c[0][0].offsetTop,g=c[0].parent().height()-c[0].height(),v=t.deltaY||a;"y"===u&&!n.overflowed[0]||"x"===u&&!n.overflowed[1]||((i.mouseWheel.invert||t.webkitDirectionInvertedFromDevice)&&(v=-v),i.mouseWheel.normalizeDelta&&(v=0>v?-1:1),(v>0&&0!==p||0>v&&p!==g||i.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),t.deltaFactor<2&&!i.mouseWheel.normalizeDelta&&(h=t.deltaFactor,d=17),V(o,(m-v*h).toString(),{dir:u,dur:d}))}}if(e(this).data(a)){var o=e(this),n=o.data(a),i=n.opt,r=a+"_"+n.idx,l=e("#mCSB_"+n.idx),c=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")],d=e("#mCSB_"+n.idx+"_container").find("iframe");d.length&&d.each(function(){e(this).load(function(){W(this)&&e(this.contentDocument||this.contentWindow.document).bind("mousewheel."+r,function(e,o){t(e,o)})})}),l.bind("mousewheel."+r,function(e,o){t(e,o)})}},W=function(e){var t=null;if(e){try{var o=e.contentDocument||e.contentWindow.document;t=o.body.innerHTML}catch(a){}return null!==t}try{var o=top.document;t=o.body.innerHTML}catch(a){}return null!==t},A=function(t,o){var n=o.nodeName.toLowerCase(),i=t.data(a).opt.mouseWheel.disableOver,r=["select","textarea"];return e.inArray(n,i)>-1&&!(e.inArray(n,r)>-1&&!e(o).is(":focus"))},L=function(){var t,o=e(this),n=o.data(a),i=a+"_"+n.idx,r=e("#mCSB_"+n.idx+"_container"),l=r.parent(),s=e(".mCSB_"+n.idx+"_scrollbar ."+d[12]);s.bind("mousedown."+i+" touchstart."+i+" pointerdown."+i+" MSPointerDown."+i,function(o){c=!0,e(o.target).hasClass("mCSB_dragger")||(t=1)}).bind("touchend."+i+" pointerup."+i+" MSPointerUp."+i,function(e){c=!1}).bind("click."+i,function(a){if(t&&(t=0,e(a.target).hasClass(d[12])||e(a.target).hasClass("mCSB_draggerRail"))){N(o);var i=e(this),s=i.find(".mCSB_dragger");if(i.parent(".mCSB_scrollTools_horizontal").length>0){if(!n.overflowed[1])return;var c="x",u=a.pageX>s.offset().left?-1:1,f=Math.abs(r[0].offsetLeft)-.9*u*l.width()}else{if(!n.overflowed[0])return;var c="y",u=a.pageY>s.offset().top?-1:1,f=Math.abs(r[0].offsetTop)-.9*u*l.height()}V(o,f.toString(),{dir:c,scrollEasing:"mcsEaseInOut"})}})},z=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=e("#mCSB_"+o.idx+"_container"),l=r.parent();r.bind("focusin."+i,function(o){var a=e(document.activeElement),i=r.find(".mCustomScrollBox").length,s=0;a.is(n.advanced.autoScrollOnFocus)&&(N(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=i?(s+17)*i:0,t[0]._focusTimeout=setTimeout(function(){var e=[te(a)[0],te(a)[1]],o=[r[0].offsetTop,r[0].offsetLeft],i=[o[0]+e[0]>=0&&o[0]+e[0]<l.height()-a.outerHeight(!1),o[1]+e[1]>=0&&o[0]+e[1]<l.width()-a.outerWidth(!1)],c="yx"!==n.axis||i[0]||i[1]?"all":"none";"x"===n.axis||i[0]||V(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:c,dur:s}),"y"===n.axis||i[1]||V(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:c,dur:s})},t[0]._focusTimer))})},P=function(){var t=e(this),o=t.data(a),n=a+"_"+o.idx,i=e("#mCSB_"+o.idx+"_container").parent();i.bind("scroll."+n,function(t){(0!==i.scrollTop()||0!==i.scrollLeft())&&e(".mCSB_"+o.idx+"_scrollbar").css("visibility","hidden")})},H=function(){var t=e(this),o=t.data(a),n=o.opt,i=o.sequential,r=a+"_"+o.idx,l=".mCSB_"+o.idx+"_scrollbar",s=e(l+">a");s.bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r+" mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r+" mouseout."+r+" pointerout."+r+" MSPointerOut."+r+" click."+r,function(a){function r(e,o){i.scrollAmount=n.scrollButtons.scrollAmount,F(t,e,o)}if(a.preventDefault(),Z(a)){var l=e(this).attr("class");switch(i.type=n.scrollButtons.scrollType,a.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===i.type)return;c=!0,o.tweenRunning=!1,r("on",l);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===i.type)return;c=!1,i.dir&&r("off",l);break;case"click":if("stepped"!==i.type||o.tweenRunning)return;r("on",l)}}})},U=function(){function t(t){function a(e,t){r.type=i.keyboard.scrollType,r.scrollAmount=i.keyboard.scrollAmount,"stepped"===r.type&&n.tweenRunning||F(o,e,t)}switch(t.type){case"blur":n.tweenRunning&&r.dir&&a("off",null);break;case"keydown":case"keyup":var l=t.keyCode?t.keyCode:t.which,s="on";if("x"!==i.axis&&(38===l||40===l)||"y"!==i.axis&&(37===l||39===l)){if((38===l||40===l)&&!n.overflowed[0]||(37===l||39===l)&&!n.overflowed[1])return;"keyup"===t.type&&(s="off"),e(document.activeElement).is(u)||(t.preventDefault(),t.stopImmediatePropagation(),a(s,l))}else if(33===l||34===l){if((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type){N(o);var f=34===l?-1:1;if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=Math.abs(c[0].offsetLeft)-.9*f*d.width();else var h="y",m=Math.abs(c[0].offsetTop)-.9*f*d.height();V(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}else if((35===l||36===l)&&!e(document.activeElement).is(u)&&((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type)){if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=35===l?Math.abs(d.width()-c.outerWidth(!1)):0;else var h="y",m=35===l?Math.abs(d.height()-c.outerHeight(!1)):0;V(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}}var o=e(this),n=o.data(a),i=n.opt,r=n.sequential,l=a+"_"+n.idx,s=e("#mCSB_"+n.idx),c=e("#mCSB_"+n.idx+"_container"),d=c.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']",f=c.find("iframe"),h=["blur."+l+" keydown."+l+" keyup."+l];f.length&&f.each(function(){e(this).load(function(){W(this)&&e(this.contentDocument||this.contentWindow.document).bind(h[0],function(e){t(e)})})}),s.attr("tabindex","0").bind(h[0],function(e){t(e)})},F=function(t,o,n,i,r){function l(e){u.snapAmount&&(f.scrollAmount=u.snapAmount instanceof Array?"x"===f.dir[0]?u.snapAmount[1]:u.snapAmount[0]:u.snapAmount);var o="stepped"!==f.type,a=r?r:e?o?p/1.5:g:1e3/60,n=e?o?7.5:40:2.5,s=[Math.abs(h[0].offsetTop),Math.abs(h[0].offsetLeft)],d=[c.scrollRatio.y>10?10:c.scrollRatio.y,c.scrollRatio.x>10?10:c.scrollRatio.x],m="x"===f.dir[0]?s[1]+f.dir[1]*d[1]*n:s[0]+f.dir[1]*d[0]*n,v="x"===f.dir[0]?s[1]+f.dir[1]*parseInt(f.scrollAmount):s[0]+f.dir[1]*parseInt(f.scrollAmount),x="auto"!==f.scrollAmount?v:m,_=i?i:e?o?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",w=e?!0:!1;return e&&17>a&&(x="x"===f.dir[0]?s[1]:s[0]),V(t,x.toString(),{dir:f.dir[0],scrollEasing:_,dur:a,onComplete:w}),e?void(f.dir=!1):(clearTimeout(f.step),void(f.step=setTimeout(function(){l()},a)))}function s(){clearTimeout(f.step),K(f,"step"),N(t)}var c=t.data(a),u=c.opt,f=c.sequential,h=e("#mCSB_"+c.idx+"_container"),m="stepped"===f.type?!0:!1,p=u.scrollInertia<26?26:u.scrollInertia,g=u.scrollInertia<1?17:u.scrollInertia;switch(o){case"on":if(f.dir=[n===d[16]||n===d[15]||39===n||37===n?"x":"y",n===d[13]||n===d[15]||38===n||37===n?-1:1],N(t),ee(n)&&"stepped"===f.type)return;l(m);break;case"off":s(),(m||c.tweenRunning&&f.dir)&&l(!0)}},q=function(t){var o=e(this).data(a).opt,n=[];return"function"==typeof t&&(t=t()),t instanceof Array?n=t.length>1?[t[0],t[1]]:"x"===o.axis?[null,t[0]]:[t[0],null]:(n[0]=t.y?t.y:t.x||"x"===o.axis?null:t,n[1]=t.x?t.x:t.y||"y"===o.axis?null:t),"function"==typeof n[0]&&(n[0]=n[0]()),"function"==typeof n[1]&&(n[1]=n[1]()),n},Y=function(t,o){if(null!=t&&"undefined"!=typeof t){var n=e(this),i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx+"_container"),s=l.parent(),c=typeof t;o||(o="x"===r.axis?"x":"y");var d="x"===o?l.outerWidth(!1):l.outerHeight(!1),f="x"===o?l[0].offsetLeft:l[0].offsetTop,h="x"===o?"left":"top";switch(c){case"function":return t();case"object":var m=t.jquery?t:e(t);if(!m.length)return;return"x"===o?te(m)[1]:te(m)[0];case"string":case"number":if(ee(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(d*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(f-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var p=f+parseInt(t.split("+=")[1]);return p>=0?0:Math.abs(p)}if(-1!==t.indexOf("px")&&ee(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(s.height()-l.outerHeight(!1));if("right"===t)return Math.abs(s.width()-l.outerWidth(!1));if("first"===t||"last"===t){var m=l.find(":"+t);return"x"===o?te(m)[1]:te(m)[0]}return e(t).length?"x"===o?te(e(t))[1]:te(e(t))[0]:(l.css(h,t),void u.update.call(null,n[0]))}}},X=function(t){function o(){return clearTimeout(f[0].autoUpdate),0===l.parents("html").length?void(l=null):void(f[0].autoUpdate=setTimeout(function(){return c.advanced.updateOnSelectorChange&&(s.poll.change.n=i(),s.poll.change.n!==s.poll.change.o)?(s.poll.change.o=s.poll.change.n,void r(3)):c.advanced.updateOnContentResize&&(s.poll.size.n=l[0].scrollHeight+l[0].scrollWidth+f[0].offsetHeight+l[0].offsetHeight+l[0].offsetWidth,s.poll.size.n!==s.poll.size.o)?(s.poll.size.o=s.poll.size.n,void r(1)):!c.advanced.updateOnImageLoad||"auto"===c.advanced.updateOnImageLoad&&"y"===c.axis||(s.poll.img.n=f.find("img").length,s.poll.img.n===s.poll.img.o)?void((c.advanced.updateOnSelectorChange||c.advanced.updateOnContentResize||c.advanced.updateOnImageLoad)&&o()):(s.poll.img.o=s.poll.img.n,void f.find("img").each(function(){n(this)}))},c.advanced.autoUpdateTimeout))}function n(t){function o(e,t){return function(){return t.apply(e,arguments)}}function a(){this.onload=null,e(t).addClass(d[2]),r(2)}if(e(t).hasClass(d[2]))return void r();var n=new Image;n.onload=o(n,a),n.src=t.src}function i(){c.advanced.updateOnSelectorChange===!0&&(c.advanced.updateOnSelectorChange="*");var e=0,t=f.find(c.advanced.updateOnSelectorChange);

return c.advanced.updateOnSelectorChange&&t.length>0&&t.each(function(){e+=this.offsetHeight+this.offsetWidth}),e}function r(e){clearTimeout(f[0].autoUpdate),u.update.call(null,l[0],e)}var l=e(this),s=l.data(a),c=s.opt,f=e("#mCSB_"+s.idx+"_container");return t?(clearTimeout(f[0].autoUpdate),void K(f[0],"autoUpdate")):void o()},j=function(e,t,o){return Math.round(e/t)*t-o},N=function(t){var o=t.data(a),n=e("#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal");n.each(function(){J.call(this)})},V=function(t,o,n){function i(e){return s&&c.callbacks[e]&&"function"==typeof c.callbacks[e]}function r(){return[c.callbacks.alwaysTriggerOffsets||w>=S[0]+y,c.callbacks.alwaysTriggerOffsets||-B>=w]}function l(){var e=[h[0].offsetTop,h[0].offsetLeft],o=[x[0].offsetTop,x[0].offsetLeft],a=[h.outerHeight(!1),h.outerWidth(!1)],i=[f.height(),f.width()];t[0].mcs={content:h,top:e[0],left:e[1],draggerTop:o[0],draggerLeft:o[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(a[0])-i[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(a[1])-i[1])),direction:n.dir}}var s=t.data(a),c=s.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:c.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},n=e.extend(d,n),u=[n.dur,n.drag?0:n.dur],f=e("#mCSB_"+s.idx),h=e("#mCSB_"+s.idx+"_container"),m=h.parent(),p=c.callbacks.onTotalScrollOffset?q.call(t,c.callbacks.onTotalScrollOffset):[0,0],g=c.callbacks.onTotalScrollBackOffset?q.call(t,c.callbacks.onTotalScrollBackOffset):[0,0];if(s.trigger=n.trigger,(0!==m.scrollTop()||0!==m.scrollLeft())&&(e(".mCSB_"+s.idx+"_scrollbar").css("visibility","visible"),m.scrollTop(0).scrollLeft(0)),"_resetY"!==o||s.contentReset.y||(i("onOverflowYNone")&&c.callbacks.onOverflowYNone.call(t[0]),s.contentReset.y=1),"_resetX"!==o||s.contentReset.x||(i("onOverflowXNone")&&c.callbacks.onOverflowXNone.call(t[0]),s.contentReset.x=1),"_resetY"!==o&&"_resetX"!==o){if(!s.contentReset.y&&t[0].mcs||!s.overflowed[0]||(i("onOverflowY")&&c.callbacks.onOverflowY.call(t[0]),s.contentReset.x=null),!s.contentReset.x&&t[0].mcs||!s.overflowed[1]||(i("onOverflowX")&&c.callbacks.onOverflowX.call(t[0]),s.contentReset.x=null),c.snapAmount){var v=c.snapAmount instanceof Array?"x"===n.dir?c.snapAmount[1]:c.snapAmount[0]:c.snapAmount;o=j(o,v,c.snapOffset)}switch(n.dir){case"x":var x=e("#mCSB_"+s.idx+"_dragger_horizontal"),_="left",w=h[0].offsetLeft,S=[f.width()-h.outerWidth(!1),x.parent().width()-x.width()],b=[o,0===o?0:o/s.scrollRatio.x],y=p[1],B=g[1],T=y>0?y/s.scrollRatio.x:0,k=B>0?B/s.scrollRatio.x:0;break;case"y":var x=e("#mCSB_"+s.idx+"_dragger_vertical"),_="top",w=h[0].offsetTop,S=[f.height()-h.outerHeight(!1),x.parent().height()-x.height()],b=[o,0===o?0:o/s.scrollRatio.y],y=p[0],B=g[0],T=y>0?y/s.scrollRatio.y:0,k=B>0?B/s.scrollRatio.y:0}b[1]<0||0===b[0]&&0===b[1]?b=[0,0]:b[1]>=S[1]?b=[S[0],S[1]]:b[0]=-b[0],t[0].mcs||(l(),i("onInit")&&c.callbacks.onInit.call(t[0])),clearTimeout(h[0].onCompleteTimeout),Q(x[0],_,Math.round(b[1]),u[1],n.scrollEasing),(s.tweenRunning||!(0===w&&b[0]>=0||w===S[0]&&b[0]<=S[0]))&&Q(h[0],_,Math.round(b[0]),u[0],n.scrollEasing,n.overwrite,{onStart:function(){n.callbacks&&n.onStart&&!s.tweenRunning&&(i("onScrollStart")&&(l(),c.callbacks.onScrollStart.call(t[0])),s.tweenRunning=!0,C(x),s.cbOffsets=r())},onUpdate:function(){n.callbacks&&n.onUpdate&&i("whileScrolling")&&(l(),c.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(n.callbacks&&n.onComplete){"yx"===c.axis&&clearTimeout(h[0].onCompleteTimeout);var e=h[0].idleTimer||0;h[0].onCompleteTimeout=setTimeout(function(){i("onScroll")&&(l(),c.callbacks.onScroll.call(t[0])),i("onTotalScroll")&&b[1]>=S[1]-T&&s.cbOffsets[0]&&(l(),c.callbacks.onTotalScroll.call(t[0])),i("onTotalScrollBack")&&b[1]<=k&&s.cbOffsets[1]&&(l(),c.callbacks.onTotalScrollBack.call(t[0])),s.tweenRunning=!1,h[0].idleTimer=0,C(x,"hide")},e)}}})}},Q=function(e,t,o,a,n,i,r){function l(){S.stop||(x||m.call(),x=G()-v,s(),x>=S.time&&(S.time=x>S.time?x+f-(x-S.time):x+f-1,S.time<x+1&&(S.time=x+1)),S.time<a?S.id=h(l):g.call())}function s(){a>0?(S.currVal=u(S.time,_,b,a,n),w[t]=Math.round(S.currVal)+"px"):w[t]=o+"px",p.call()}function c(){f=1e3/60,S.time=x+f,h=window.requestAnimationFrame?window.requestAnimationFrame:function(e){return s(),setTimeout(e,.01)},S.id=h(l)}function d(){null!=S.id&&(window.requestAnimationFrame?window.cancelAnimationFrame(S.id):clearTimeout(S.id),S.id=null)}function u(e,t,o,a,n){switch(n){case"linear":case"mcsLinear":return o*e/a+t;case"mcsLinearOut":return e/=a,e--,o*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=a/2,1>e?o/2*e*e+t:(e--,-o/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=a/2,1>e?o/2*Math.pow(2,10*(e-1))+t:(e--,o/2*(-Math.pow(2,-10*e)+2)+t);case"easeInOut":case"mcsEaseInOut":return e/=a/2,1>e?o/2*e*e*e+t:(e-=2,o/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=a,e--,-o*(e*e*e*e-1)+t;case"easeOutStrong":return o*(-Math.pow(2,-10*e/a)+1)+t;case"easeOut":case"mcsEaseOut":default:var i=(e/=a)*e,r=i*e;return t+o*(.499999999999997*r*i+-2.5*i*i+5.5*r+-6.5*i+4*e)}}e._mTween||(e._mTween={top:{},left:{}});var f,h,r=r||{},m=r.onStart||function(){},p=r.onUpdate||function(){},g=r.onComplete||function(){},v=G(),x=0,_=e.offsetTop,w=e.style,S=e._mTween[t];"left"===t&&(_=e.offsetLeft);var b=o-_;S.stop=0,"none"!==i&&d(),c()},G=function(){return window.performance&&window.performance.now?window.performance.now():window.performance&&window.performance.webkitNow?window.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},J=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var t=["top","left"],o=0;o<t.length;o++){var a=t[o];e._mTween[a].id&&(window.requestAnimationFrame?window.cancelAnimationFrame(e._mTween[a].id):clearTimeout(e._mTween[a].id),e._mTween[a].id=null,e._mTween[a].stop=1)}},K=function(e,t){try{delete e[t]}catch(o){e[t]=null}},Z=function(e){return!(e.which&&1!==e.which)},$=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},ee=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},te=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]},oe=function(){function e(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}var t=e();return t?document[t]:!1};e.fn[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o].defaults=i,window[o]=!0,e(window).load(function(){e(n)[o](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var o,a,n=e(t),i=n.parents(".mCSB_container");if(i.length)return o=i.parent(),a=[i[0].offsetTop,i[0].offsetLeft],a[0]+te(n)[0]>=0&&a[0]+te(n)[0]<o.height()-n.outerHeight(!1)&&a[1]+te(n)[1]>=0&&a[1]+te(n)[1]<o.width()-n.outerWidth(!1)},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var o=e(t).data(a);if(o)return o.overflowed[0]||o.overflowed[1]}})})})});