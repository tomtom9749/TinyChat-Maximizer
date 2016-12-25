// ==UserScript==
// @name        TinyChat Maximizer Rewrite
// @namespace   http://tinychat.com/
// @version     3.2
// @author      Tomtom9749
// @description Adds "maximize" button next to the tinychat.com logo while in a room. Clicking this button should remove unneeded components and maximize the room to fit the browser window.
// @include     http://tinychat.com/*
// @include     http://*.tinychat.com/*
// @include     https://tinychat.com/*
// @include     https://*.tinychat.com/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
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
function resizeTinyChatSmallMode()
{
    document.getElementById('chat').style.height = (document.getElementsByTagName('body')[0].clientHeight-50) + "px";
}

// First cleanup function
function cleanTinyChat()
{
    // Modify css styles
    $('#room_header').remove();
    addStyle("#left_block { width: 100% ! important;}");
    addStyle("#wrapper { padding-bottom: 0px;}");
    addStyle("#room { padding: 0;}");
    addStyle("#tinychat { padding: 0; min-height: 0;}");

    // Remove unncecessary elements
    removeById(["website", "room-gift-show", "footer", "tcad_container", "share-bar", "body_footer_ad"]);
    $('[href="https://tinychat.com/payment/upgrade_to_pro/step1"]').remove();
    $('[href="https://tinychat.com/payment/upgrade_to_pro/step2"]').remove();
    $('[href="https://tinychat.com/payment/promote_a_room/step1"]').remove();
    $('[href="https://tinychat.com/gifts"]').remove();
    $('[href="https://tinychat.com/download"]').remove();

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
    // Modify css styles
    addStyle("#tinychat { padding: 0px; min-height: auto; }");
    addStyle("#wrapper { width: 100% ! important; padding-bottom: 0px;}");
    addStyle("#room { padding: 0;}");

    // Remove unncecessary elements
    removeById(["header", "right_block", "room_header", "ad_banner", "chat-info", "goods", "category-bar", "left"]);

    // Resize to fit the window
    resizeTinyChat();
    window.removeEventListener("resize", resizeTinyChatSmallMode, false);
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

// Move Info to Top Bar
document.getElementById('room_info').classList.remove('name');
$( '#room_info' ).insertAfter( $( '#logo' ) );
document.getElementById('room_info').id='room_info_anyone';
var info_anyone = document.getElementById('room_info_anyone');
if (info_anyone) {
    addStyle('#room_info_anyone { margin: 0px; display: inline-block; color: #fff; vertical-align: middle; margin-top: 4px; margin-left: 25px; padding: 0;}');

    $('h1 > small').remove();
    $('#room_info_anyone > h2').remove();
    $('#location').remove();
}
// Hide Popularity stuff if exists
var popularity_anyone = document.getElementById('room-popularity-container');
if (popularity_anyone) {
    popularity_anyone.style.display = 'none';
}

cleanTinyChat();
addMaximizeButton();
