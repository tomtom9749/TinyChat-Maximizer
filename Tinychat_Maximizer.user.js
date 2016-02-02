// ==UserScript==
// @name        TinyChat Maximizer
// @namespace   http://tinychat.com/
// @version     2.0
// @author      Tomtom9749
// @description Adds "maximize" button next to the tinychat.com logo while in a room. Clicking this button should remove unneeded components and maximize the room to fit the browser window.
// @include     http://tinychat.com/*
// @include     http://*.tinychat.com/*
// @include     https://tinychat.com/*
// @include     https://*.tinychat.com/*
// @downloadURL https://github.com/tomtom9749/TinyChat-Maximizer/raw/master/Tinychat_Maximizer.user.js
// @grant none
// ==/UserScript==
 
// style adding
function addStyle(css)
{
    var style = document.createElement('style');
    style.innerHTML = css;
    style.type='text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
}
 
// element removal by id
function removeById(id)
{
    var element = document.getElementById(id);
    if (element)
        element.parentNode.removeChild(element);
}
 
// resize the height to fit the screen
function resizeTinyChat()
{
    document.getElementById('chat').style.height = (document.getElementsByTagName('body')[0].clientHeight-15) + "px";
}
 
// main cleanup function
function cleanerTinyChat()
{
    // modify css styles
    addStyle("#tinychat { padding: 0px; min-height: auto; }");
    addStyle("#wrapper { width: 100% ! important; padding-bottom: 0px;}");
    addStyle("#left_block { width: 100% ! important;}");
 
    // remove unncecessary elements
    removeById('header');
    removeById('footer');
    removeById('right_block');
    removeById('room_header');
    removeById('ad_banner');
    removeById('body_footer_ad');
    removeById('chat-info');
    removeById('goods');
    removeById('category-bar');
    removeById('share-bar');
    removeById('left');
    removeById('tinychat');
    
    // resize the heigh to fit the screen
    resizeTinyChat();
    window.addEventListener('resize', resizeTinyChat, false);
}
 
// setup full windows button
function addMaximizeButton()
{
    // only work on rooms
    if (!document.getElementById('room'))
        return;
 
    // add the maximize button right after the logo
    var link = document.createElement('a');
    var div = document.getElementById('navigation');
    link.className = 'button orange';
    link.addEventListener('click', cleanerTinyChat, false);
    link.innerHTML = '<img src="http://tinychat.com/public/images/exclaim.png">Maximize'
    div.appendChild(link);
}
 
addMaximizeButton();
