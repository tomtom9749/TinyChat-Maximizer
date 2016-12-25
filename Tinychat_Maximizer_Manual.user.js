// ==UserScript==
// @name        TinyChat Maximizer Manual Version
// @namespace   http://tinychat.com/
// @version     3.1
// @author      Tomtom9749
// @description Adds "maximize" button next to the tinychat.com logo while in a room. Clicking this button should remove unneeded components and maximize the room to fit the browser window.
// @include     http://tinychat.com/*
// @include     http://*.tinychat.com/*
// @include     https://tinychat.com/*
// @include     https://*.tinychat.com/*
// @downloadURL https://github.com/tomtom9749/TinyChat-Maximizer/raw/master/Tinychat_Maximizer_Manual.user.js
// @grant none
// ==/UserScript==

// Style adding
function addStyle(css)
{
    var style = document.createElement('style');
    style.innerHTML = css;
    style.type='text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
}

// Element removal by id
function removeById(ids)
{
    ids.forEach(function(element) {
        var x = document.getElementById(element);
        if (x)
            x.parentNode.removeChild(x);
    });
}

// Resize to fit the window
function resizeTinyChat()
{
    document.getElementById('chat').style.height = (document.getElementsByTagName('body')[0].clientHeight-2) + "px";
}

// First cleanup function
function cleanTinyChat()
{
    // Modify css styles
    addStyle("#left_block { width: 100% ! important;}");
    addStyle("#wrapper { padding-bottom: 0px;}");
    addStyle("#room { padding: 0;}");
    addStyle("#tinychat { min-height: 0;}");

    // Remove unncecessary elements
    removeById(["website", "room-gift-show", "footer", "tcad_container", "share-bar", "body_footer_ad"]);
}

// Main cleanup function
function maximizeTinyChat()
{
    // Modify css styles
    addStyle("#tinychat { padding: 0px; min-height: auto; }");
    addStyle("#wrapper { width: 100% ! important; padding-bottom: 0px;}");
    addStyle("#room { padding: 0;}");

    // Remove unncecessary elements
    removeById(["header", "footer", "right_block", "room_header", "ad_banner", "body_footer_ad", "chat-info", "goods", "category-bar", "share-bar", "left"]);

    // Disable Scrollbar
    document.documentElement.style.overflow = 'hidden';	 // Firefox, Chrome
    document.body.scroll = "no";	// IE Only

    // Resize to fit the window
    resizeTinyChat();
    window.addEventListener('resize', resizeTinyChat, false);
}

// Setup full window button
function addMaximizeButton()
{
    // Only work on rooms
    if (!document.getElementById('room'))
        return;

    // Add the maximize button right after the logo
    var link = document.createElement('a');
    var div = document.getElementById('navigation');
    link.className = 'button orange';
    link.addEventListener('click', maximizeTinyChat, false);
    link.innerHTML = '<img src="http://tinychat.com/public/images/exclaim.png">Maximize';
    div.appendChild(link);
}

// On load stuff here

cleanTinyChat();
addMaximizeButton();
