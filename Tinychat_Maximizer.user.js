// ==UserScript==
// @name        TinyChat Maximizer
// @namespace   http://tinychat.com/
// @version     3.3
// @author      Tomtom9749
// @description Adds "maximize" button next to the tinychat.com logo while in a room. Clicking this button should remove unneeded components and maximize the room to fit the browser window.
// @include     http://tinychat.com/*
// @include     https://tinychat.com/*
// @exclude     https://tinychat.com/home
// @exclude     https://tinychat.com/download
// @exclude     https://tinychat.com/settings
// @exclude     https://tinychat.com/login
// @exclude     https://tinychat.com/gifts
// @exclude     /^https?://tinychat.com/.*//
// @downloadURL https://github.com/tomtom9749/TinyChat-Maximizer/raw/master/Tinychat_Maximizer.user.js
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
function resizeTinyChat(size) { document.getElementById('chat').style.height = ($( document ).height()-size) + "px"; }
function resizeTinyChatMaximized()
{
    resizeTinyChat(0);
}
function resizeTinyChatSmallMode()
{
    resizeTinyChat(42);
}

// First cleanup function
function cleanTinyChat()
{
    // Modify css styles
    addStyle("#left_block { width: 100% ! important;}");
    addStyle("#wrapper { padding-bottom: 0px;}");
    addStyle("#room { padding: 0;}");
    addStyle("#header { margin: 0;}");
    addStyle("#tinychat { padding: 0px; min-height: 0;}");

    // Remove unncecessary elements
    removeById(["website", "room-gift-show", "footer", "tcad_container", "share-bar", "body_footer_ad"]);
    $('[href="https://tinychat.com/payment/upgrade_to_pro/step1"]').remove();
    $('[href="https://tinychat.com/payment/upgrade_to_pro/step2"]').remove();
    $('[href="https://tinychat.com/payment/promote_a_room/step1"]').remove();
    $('[href="https://tinychat.com/gifts"]').remove();
    $('[href="https://tinychat.com/download"]').remove();
    $('.btn-group').remove();
    $('#room_header').remove();

    // Disable Scrollbar
    document.documentElement.style.overflow = 'hidden';	 // Firefox, Chrome
    document.body.scroll = "no";	// IE Only

    // Resize the chat and make sure it resizes to window size
    resizeTinyChatSmallMode();
    window.addEventListener('resize', resizeTinyChatSmallMode, false);
}

// Main cleanup function
function maximizeTinyChat()
{
    // Remove unncecessary elements
    removeById(["header", "right_block", "room_header", "ad_banner", "chat-info", "goods", "category-bar", "left"]);

    // Resize to fit the window
    resizeTinyChatMaximized();
    window.removeEventListener("resize", resizeTinyChatSmallMode, false);
    window.addEventListener('resize', resizeTinyChatMaximized, false);
}

// Setup full window button
function addMaximizeButton()
{
    // Add the maximize button right after the logo
    var link = document.createElement('a');
    var div = document.getElementById('navigation');
    link.className = 'button white';
    link.addEventListener('click', maximizeTinyChat, false);
    link.innerHTML = 'Maximize';
    div.appendChild(link);
    $( ".button" ).css("border","0px");
}

// On load stuff here
function init()
{
    // Only work on rooms
    if (!document.getElementById('room'))
        return;

    // Move Info to Top Bar
    $( '#room_info' ).removeClass( 'name' )
        .insertAfter( '#logo' )
        .attr('id', 'room_info_anyone');

    addStyle('#room_info_anyone { margin: 0px; display: inline-block; color: #fff; vertical-align: middle; margin-top: 4px; margin-left: 25px; padding: 0;}');

    $('h1 > small').remove();
    $('#room_info_anyone > h2').remove();
    $('#location').remove();
    // Hide Popularity stuff if exists
    $('room-popularity-container').remove();

    // Execute the rest of the script
    cleanTinyChat();
    addMaximizeButton();
}

// Init Script Now after functions
init();
