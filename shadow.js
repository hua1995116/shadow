;(function($, window, document,undefined) {
    
    var Beautifier = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
            'animationInitialize':'animated',
            'animationIn':'zoomIn',
            'animationOut':'zoomOut',
            'name': '#bb',
            'show':false,
            'btnsize':'30px',
            'btncolor':'#000',
            'btnright':'10px',
            'btntop':'10px',
            'shadowbg':'rgba(255,255,255,0.9)',
            'shadowbgsize':'100%',
            'shadowbgauto':false
        },
        this.options = $.extend({}, this.defaults, opt);
    }
    
    Beautifier.prototype = {
        init:function(){
            var options = this.options;
            
            var content = $("<div class='model'><div class='model_content'><div class='model_con'>"+this.$element.html()+"</div></div><div class='model_close'>×</div></div>");
            $('body').append(content);
            if(this.options.show){
                $('.model').css({
                    'display':'block',
                });
            } 
            //初始化model
            this.$element.css({'display':'none'});//原来的消失
            this.btnfn(options);//初始化关闭按钮
            this.bgfn(options);//初始化背景   
            //显示|消失动画设置      
            if(options.animationInitialize){
                $('.model').addClass(options.animationInitialize);
            }
            if(options.name){
               $(options.name).on('click',function(){
                    if(options.animationIn){
                        $('.model').css({'display':'block'});
                        $('.model').removeClass(options.animationOut);
                        $('.model').addClass(options.animationIn);
                    }else{
                        $('.model').fadeIn();
                    }
                });
            }
            $('.model_close').on('click',function(){
                if(options.animationOut){
                    $('.model').removeClass(options.animationIn);
                    $('.model').addClass(options.animationOut);
                    setTimeout(function(){
                        $('.model').css({'display':'none'});
                    },1000);
                }else{
                    $('.model').fadeOut();
                }  
            }); 
        },       
        btnfn:function(opt){
            $('.model_close').css({
                'width':opt.btnsize,
                'height':opt.btnsize,
                'fontSize':opt.btnsize,
                'lineHeight':opt.btnsize,
                'color':opt.btncolor,
                'right':opt.btnright,
                'top':opt.btntop
            });
        },
        bgfn:function(opt){
            var marginauto;
            if(opt.shadowbgauto){
                marginauto = '0 auto';
            }else{
                marginauto = '0'
            }
            $('.model').css({
                'background':opt.shadowbg,
                'width':opt.shadowbgsize,
                'margin':marginauto,
            })
        }
    }
    //在插件中使用Beautifier对象
    $.fn.Shadow = function(options) {
        //创建Beautifier的实体
        var beautifier = new Beautifier(this, options);
        //调用其方法
        
        return beautifier.init();
    }
})(jQuery, window, document);