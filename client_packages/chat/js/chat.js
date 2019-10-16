let chat =
    {
        size: 0,
        container: null,
        input: null,
        enabled: false,
        active: true,
        timer: null,
        previous: new Array(),
        messageNumber: 0,
        hide_chat: 15*1000 // 15 - seconds
    };
var chatAPI =
    {
        push: (text) =>
        {
            chat.size++;
            if (chat.size >= 50)
            {
                chat.container.children(":first").remove();
            }
            chat.container.append("<li>" + text + "</li>");
            chat.container.scrollTop(9999);
        },
        clear: () =>
        {
            chat.container.html("");
        },
        activate: (toggle) =>
        {
            if (toggle == false
                && (chat.input != null))
                enableChatInput(false);

            chat.active = toggle;
        },
        show: (toggle) =>
        {
            if(toggle)
                $("#chat").show();
            else
                $("#chat").hide();

            chat.active = toggle;
        }
    };
function enableChatInput(enable)
{
    if(chat.active == false
        && enable == true)
        return;
    if (enable != (chat.input != null))
    {
        mp.invoke("focus", enable);
        if (enable)
        {
            $("#chat").css("opacity", 1);
            chat.input = $("#chat").append('<div><input id="chat_msg" type="text" /><div id="chat_lang">EN</div></div>').children(":last");
            chat.input.children("input").focus();
            mp.trigger("changeChatState", true);
        }
        else
        {
            chat.input.fadeOut('fast', function()
            {
                chat.input.remove();
                chat.input = null;
               mp.trigger("changeChatState", false);
            });
        }
    }
}
function hide() {
    chat.timer = setTimeout(function () {
        $("#chat").css("opacity", 0.5);
        $("#chat_messages").css("overflow",'hidden');
    }, chat.hide_chat);
}
function show() {
    clearTimeout(chat.timer);
    $("#chat").css("opacity", 1);
    $("#chat_messages").css("overflow",'overlay');
}
$(document).ready(function()
{
    let number;
    chat.container = $("#chat ul#chat_messages");
    hide();
    $(".ui_element").show();
    $("body").keydown(function(event)
    {
        if (event.which == 84 && chat.input == null
            && chat.active == true) {
            enableChatInput(true);
            event.preventDefault();
            show();
            number = chat.previous.length;
        }
        else if (event.which == 13 && chat.input != null) {
            var value = chat.input.children("input").val();

            if (value.length > 0) {
                chat.previous[chat.messageNumber] = value;
                chat.messageNumber++;
                if (value[0] == "/") {
                    value = value.substr(1);

                    if (value.length > 0 && value.length <= 100)
                        mp.invoke("command", value);
                }
                else {
                     if (value.length <= 100)
                    mp.invoke("chatMessage", value);
                }
            }
            enableChatInput(false);
            hide();
        }
        else if (event.which == 27 && chat.input != null) {
            enableChatInput(false);
            hide();
        }
        else if (event.which == 38 && chat.input != null) {
            number--;
            if(number < 0){
                number = chat.previous.length;
            }
            chat.input.children("input").val(chat.previous[number]);
        }
        else if (event.which == 40 && chat.input != null) {
            number++;
            if(number > chat.previous.length){
                number = 0;
            }
            chat.input.children("input").val(chat.previous[number]);
        }
    });
});
