var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var RE = {
    jQuery: $,
    
    isEmail: function(emailAddress) {
        var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);        
        return pattern.test(emailAddress);
    },
    isNumber: function(value) {
        var intRegex = /^\d+$/;
        return (intRegex.test(value));
    },
    handleNumber: function(obj) {
        if (RE.isNumber($(obj).val()))
        {
            $(obj).val($(obj).val().replace(/\D/g,''));
        }
    },
    modal: function(msg, title, showFooter, action, textAction, textClose) {
        
        if(title===undefined || title==='')
        {
            title = 'RIGHT EYE';
        }
        
        if(textClose == undefined) {
            textClose = "Close";
        }
        
        // $('#re-modal').modal('hide');
        $('#re-modal').remove();
        
        html = '<div id="re-modal" class="modal fade">';
        html += '  <div class="modal-dialog">';
        html += '    <div class="modal-content">';
        html += '      <div class="modal-header">';
        html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
        html += '        <h4 class="modal-title" id="modal-title">' + title + '</h4>';
        html += '      </div>';
        html += '      <div class="modal-body" id="modal-body">' + msg + '</div>';
        if(showFooter===true)
        {
            html += '      <div class="modal-footer" id="modal-footer">';
            if(textAction !== undefined)
            {
                if(textAction === undefined)
                {
                    textAction = 'OK';
                }
                html += '        <button type="button" class="btn btn-default" onclick="'+action+'">' + textAction + '</button>';
                html += '        <button type="button" class="btn btn-default" data-dismiss="modal">' + textClose + '</button>';
            }
            else
            {
                html += '        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
            }
            html += '      </div>';
        }
        
        html += '    </div';
        html += '  </div>';
        html += '</div>';

        $('body').append(html);

        $('#re-modal').modal({show:true, backdrop:'static'});
		
		$('#re-modal').on('shown.bs.modal', function (e) {			
			$('.modal-body').scrollTop(0);
		});
    },
    modalAjax: function(url, title, callback) {        
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            cache: false,
            success: function (json, callback) {                
                if (json['redirect']) {
                    window.location = json['redirect'];
                    return;
                }
                RE.modal(json['data'], title);                
                RE.reset();
            }
        });
    },
    modalUpdate: function(message)
    {
        $('#modal-body').html(message);
    },
    popup: function(message)
    {
        $('#myModalHeader').html('RIGHT EYE');
        $('#myModalBody').html(message);        
        
        $('#myModal').modal({show:true, backdrop:'static'});
    },
    showModal: function (element,title) {                     
            RE.modal($(element).html(), title, true);
            return false;               
    },
    showMessageError: function (element,title,width,height) {                     
            RE.modal($(element).html(), title, true);
            $(".modal-dialog").css("width", width); 
            $(".modal-dialog").css("heigth", height); 
            return false;               
    },
    popupChange: function(message)
    {
        $('#myModalBody').html(message);
    },
    scrollTo: function(obj)
    {
        var offset = $(obj).offset();
        var top = offset.top - 10;
        $('html, body').animate({ scrollTop: top }, 'slow');
    },
    loadingObject: function(obj)
    {
        if($('#wa-mask').length === 0)
        {
            oheight = $(obj).height();
            div = '<div id="wa-mask" class="wa-mask" style="height:'+oheight+'px"></div>';
            div+= '<img id="wa-loading" class="wa-loading" src="themes/images/loading.gif" />';
            $(div).appendTo($(obj));
        }        
    },
    loadingWindow: function()
    {
        if($('#wa-mask').length === 0)
        {            
            oh = $(document).height();
            var top = $(document).scrollTop() + $(window).height()/2;            
            div = '<div id="wa-mask" class="wa-mask" style="height:'+oh+'px"></div>';            
            div+= '<img id="wa-loading" class="wa-loading" style="top:'+top+'px" src="themes/images/loading.gif" />';                        
            $(div).appendTo($('html body'));            
        }        
    },
    reset: function()
    {        
        if($('#wa-mask, #wa-loading').length > 0) {
            $('#wa-mask, #wa-loading').remove();
        }
    },
    isMobile: function() {
        var windowsize = $(window).width();
        return (windowsize < 990);
    },    
    hideMessage: function() {
        $('#flash-message').remove();
    },
    showMessage: function(type, msg){        
        RE.hideMessage();
        html = '<div class="'+type+' message" id="flash-message">';
        html+= '<p>'+msg+'</p>';
        html+= '</div>';
        
        $(html).prependTo($('html body'));
        
        heightMsg = $('#flash-message').height();
        widthMsg = $('#flash-message').width();
        var top = -20;
        if(!RE.isMobile()) {
            var left = $(document).width()/2 - widthMsg/2;
            $('#flash-message').css({'left': left+'px', top: top+'px'});
            top = 0;
        }        
            
        $('#flash-message').animate({opacity: "1", top: (top+20)+'px'}, 200, function(){
            window.setTimeout(function(){
                $('#flash-message').animate({opacity: "0", top: top+'px'}, 300, function() {
                    $('#flash-message').remove();
                });
            }, 2000);
        });
    }
}