$(document).ready(function(){
    $(document).on('click',".fa-bars",function(){
        $('.sidebar').addClass('active');
        $('.main').addClass('active');
    });
    $(document).on('click',".fa-close",function(){
        $('.sidebar').removeClass('active');
        $('.main').removeClass('active');
    });
  
    $(document).on('click', '.receive-btn', function(){
        $(".qrcode").show();
        $(".send").hide();
    });
    $(document).on('click','.close-btn',function(){
        $(".qrcode").hide();
    });

    $(document).on('click',".btn-gray", function(){
        $(".btn-gray").each(function(){
            $(this).removeClass("active")
        });
        $(this).addClass("active");
    });
    $(document).on('click', '.right-head', function(){
        $(".receive").addClass('active');
    });
    $(document).on('click','.send-btn',function(){
        $(".send").show();
        $(".qrcode").hide();
    });
    $(document).on('click',".send-close",function(){
        $(".send").hide();
        $(".send-warning").hide();
        $(".send-warning-wallet").hide();
        $(".send-input").val("");
        $(".send-input-wallet").val("");
    });
   
    $(document).on('click',".transaction",function(){
        $(".out-wallet").show();
    });

    $(document).on('click', ".link-div", function(){
        $('.affili').toast('show');
    })

    $(document).on('click',".copy-icon",function(){
        $('.copy1').toast('show');
    });
    
    $(document).on('click',".setting-card2",function(){
        $('.setting-toast').toast('show');
    });

    $('[data-toggle="tooltip"]').tooltip();   
    var createPopover = function (item, title) {
        var $pop = $(item);
       
        $(document).popover({
            placement: 'left',
            title: function(){
                var check = $(this).attr('id');
                if(check=="showPopover"){
                    return 'Do you want to exchange?';
                }else{
                    return 'Do you want to send money?';
                }
            },
            trigger:'click',
            selector: '[data-toggle="popover"]',
            content: function () {
                var check = $(this).attr('id');
                if(check == "showPopover"){
                    return '<a class="No">No</a><a class="Yes">Yes</a>';
                }else{
                    return '<a class="No decline">Decline</a><a class="Approve">Approve</a>';
                }
            }
        }).on('shown.bs.popover', function(e) {
            //console.log('shown triggered');
            // 'aria-describedby' is the id of the current popover
            var current_popover = '#' + $(e.target).attr('aria-describedby');
            var $cur_pop = $(current_popover);
            
            $cur_pop.find('.No').click(function(){
                //console.log('close triggered');
                $("[data-toggle='popover']").popover('hide');
               
            });
          
            $cur_pop.find('.Yes').click(function(){
               
                var input_value = $(".buy-input").val();
                if(input_value>0){
                    $(".wallet-warning").hide();
                    $(".wallet-success").show();
                    $(".exchange").show();
                }else{
                    $(".wallet-warning").show();
                    $(".wallet-success").hide();
                    $(".exchange").hide();
                }
                
                 $("[data-toggle='popover']").popover('hide');
            });
            $cur_pop.find('.Approve').click(function(){
                
                var amount = $(".send-input").val();
                var wallet = $(".send-input-wallet").val();
                if(amount == ""){
                    $(".send-warning").show();
                }else{
                    $(".send-warning").hide();
                }
                if(wallet == ""){
                    $(".send-warning-wallet").show();
                }else{
                    $(".send-warning-wallet").hide();
                }
                 $("[data-toggle='popover']").popover('hide');
            });
        });

        return '';
    };

    // // create popover
    createPopover('#sendsend', 'Do you want to send money?');
    createPopover('#showPopover', 'Do you want to exchange?');
    
    $('#myModal').on('hidden.bs.modal', function () {
        $(".wallet-warning").hide();
        $(".wallet-success").hide();
        $(".exchange").hide();
    });

    $(document).on('click', '.sidebar-li', function(){
        $(".fa-close").click();
    });
    $(document).on('click', '.setting-div', function(){
        $(".fa-close").click();
    });
    $(document).on('click', '.logout-div', function(){
        $(".fa-close").click();
    });

  // $(document).on('click',".content-card",function(){
    //     var i = 0;
    //     $(".content-card").each(function() {
    //         $(this).addClass("transparent");
    //     });
    //     $(this).removeClass("transparent");
    //     $(".qrcode").hide();
    //     $(".send").hide();
    //     $(".send-warning").hide();
    //     $(".send-warning-wallet").hide();
    //     $(".send-input").val("");
    //     $(".send-input-wallet").val("");
    //     var id = $(this).find(".card-img").attr("id");
    //     var src = $(this).find("img").attr("src");
    //     var token = $(this).find(".card-left").html();
    //     var price = $(this).find(".card-left-other").html();
    //     var symbol = $(this).find(".content-token").html();
    //     if(id == "1"){
    //         $("#change-coin").html(`
    //             <div class="right-head">
    //                 <img src="`+src+`">
    //             </div>
    //             <p class="right-head-title">`+token+`&nbsp`+ symbol+`</p>
    //             <p class="right-small-title">`+price+`</p>
    //             <a class="receive btn receive-btn">
    //                 <i class="fa fa-arrow-down"></i>
    //                 RECEIVE
    //             </a>
    //         `);
    //     }else{
    //         $("#change-coin").html(`
    //             <div class="right-head">
    //                 <img src="`+src+`">
    //             </div>
    //             <p class="right-head-title">`+token+`&nbsp`+ symbol+`</p>
    //             <p class="right-small-title">`+price+`</p>
    //             <a class="receive btn send-btn" style="width:48%">
    //                 <i class="fa fa-arrow-up"></i>
    //                 SEND
    //             </a>
    //             <a class="receive btn receive-btn" style="width:48%">
    //                 <i class="fa fa-arrow-down"></i>
    //                 RECEIVE
    //             </a>
    //         `);
    //     }
    // });

});