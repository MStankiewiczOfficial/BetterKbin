function init() {
    chrome.storage.sync.get(
        { instance: 'instance' },
        (items) => {
            var instance = items.instance;
            if (window.location.href.startsWith("https://" + instance + "/nowy") || window.location.href.startsWith("https://" + instance + "/new")) {
                let urlParams = new URLSearchParams(window.location.search);
                let url = urlParams.get('url');
                if (url) {
                    entry_link_url.value = url;
                }
                let title = urlParams.get('title');
                if (title) {
                    entry_link_title.value = title;
                }
                let content = urlParams.get('content');
                if (content) {
                    entry_link_body.value = content;
                }
                let badges = urlParams.get('badges');
                if (badges) {
                    entry_link_badges.value = badges;
                }
            }
        }
    );
}

function autoChangeTheme() {
    chrome.storage.sync.get(
        { instance: 'instance', theme: true, themeLight: 1, themeDark: 1 },
        (items) => {
            var instance = items.instance;
            var theme = items.theme;
            if (window.location.href.startsWith(`https://${instance}`)) {
                if (theme == true) {
                    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                        if (!document.body.classList.contains("theme--kbin") && items.themeDark == 1) {
                            document.querySelector("div.theme.kbin").click();
                        }
                        if (!document.body.classList.contains("theme--dark") && items.themeDark == 2) {
                            document.querySelector("div.theme.dark").click();
                        }
                        if (!document.body.classList.contains("theme--solarized-dark") && items.themeDark == 3) {
                            document.querySelector("div.theme.solarized-dark").click();
                        }
                        if (!document.body.classList.contains("theme--tokyo-night") && items.themeDark == 4) {
                            document.querySelector("div.theme.tokyo-night").click();
                        }
                        if (!document.body.classList.contains("theme--dark") && items.themeDark == 5) {
                            document.querySelector("div.theme.dark").click();
                        }
                        if (document.body.classList.contains("theme--dark") && items.themeDark == 5) {
                            var style = document.createElement('style');
                            style.type = 'text/css';
                            style.innerHTML = `
                            :root {
                                --kbin-color: #bf5ded;
                                --kbin-color-dark: #7f4a97;
                                --kbin-color-darker: #493353;
                                --pin-color: #4f9172;
                                --type-color: #e6cb83;
                                --subscribe-border: 1px dashed var(--kbin-color);
                                --font-family: 'Courier New', monospace;
                            }
                            
                            /* Wired Background */
                            
                            body {
                                background-color: #000;
                                color: #00ff00;
                                font-family: var(--font-family);
                            }
                            
                            /* Hacker Fonts */
                            
                            code, pre, #sidebar, #content {
                                font-family: var(--font-family);
                            }
                            
                            /* Green Text */
                            
                            a, a:visited {
                                color: #00ff00 !important;
                            }
                            
                            /* Matrix-like Links */
                            
                            a:hover {
                                text-decoration: underline;
                                color: #00ff00 !important;
                            }
                            
                            /* Code Blocks */
                            
                            pre {
                                background-color: #000;
                                color: #00ff00;
                                border: 1px solid #00ff00;
                                padding: 10px;
                                overflow: auto;
                                margin: 10px 0;
                            }
                            
                            /* Scrollbar for the Wired */
                            
                            ::-webkit-scrollbar {
                                width: 10px;
                            }
                        
                            ::-webkit-scrollbar-track {
                                background: #000;
                            }
                        
                            ::-webkit-scrollbar-thumb {
                                background: #4f9172;
                            }
                            
                            /* IMAGE PREVIEW STYLING */
                            
                            div.preview {
                                border: var(--kbin-section-border);
                                border-top: none;
                                background-color: var(--kbin-bg-nth);
                                max-width: 95%;
                                margin: -.5rem auto;
                                margin-bottom: initial;
                                padding: 0;
                            }
                            
                            div.preview img {
                                max-height: 75vh;
                                margin: 0 auto;
                                display: block;
                            }
                            
                            /* SIDEBAR COMPACTIFICATION / GENERAL STYLING */
                            
                            #sidebar .info {
                                overflow: auto;
                            }
                            
                            /* --- Thread creator info --- */
                            
                            @media only screen and (min-width: 1360px), (max-width: 991.98px) {
                            
                                #sidebar .entry-info figure {
                                    display: inline-block;
                                    float: left;
                                    padding-left: 1em;
                                }
                        
                                #sidebar .entry-info li {
                                    clear: none;
                                    float: left;
                                    width: 50%;
                                }
                        
                                #sidebar .entry-info li {
                                    border-top: var(--kbin-meta-border) !important;
                                    border-bottom: none;
                                }
                        
                                #sidebar .entry-info li:nth-child(n+3) {
                                    border-bottom: var(--kbin-meta-border) !important;
                                }
                                
                            }
                            
                            #sidebar .info time, #sidebar .info span {
                                opacity: .75;
                            }
                            
                            /* --- Magazine info --- */
                            
                            #sidebar .magazine img:nth-child(1) {
                                max-height: 6em;
                                width: auto;
                            }
                            
                            #sidebar .magazine__subscribe button:hover, #sidebar .user__follow button:hover {
                                cursor: pointer;
                            }
                            
                            #sidebar .magazine__subscribe form[name="magazine_subscribe"] button:not(.active)/*, 
                            #sidebar .user__follow form[name="user_follow"] button:not(.active)*/ {
                                background-color: var(--kbin-color-darker);
                                border: var(--subscribe-border);
                            }
                            
                            #sidebar .magazine__subscribe form[name="magazine_subscribe"] button:not(.active):hover/*, 
                            #sidebar .user__follow form[name="user_follow"] button:not(.active):hover*/ {
                                background-color: var(--kbin-color-dark);
                            }
                            
                            /* COLORATIONS / MISC STYLING */
                            
                            article .fa-thumbtack {
                                color: var(--pin-color);
                            }
                            
                            #content article:has(footer menu li i.fa-thumbtack) {
                                border: 1px solid var(--pin-color) !important;
                            }
                            
                            article .fa-newspaper, article .fa-photo-film {
                                color: var(--type-color);
                            }
                            
                            .subject .show-preview {
                                padding: 8px;
                                border: var(--kbin-meta-border);
                            }
                            
                            .subject .show-preview:hover {
                                background-color: rgba(127,127,127,0.25);
                            }
                            `
                            document.getElementsByTagName('head')[0].appendChild(style);
                        }
                        if (!document.body.classList.contains("theme--dark") && items.themeDark == 6) {
                            document.querySelector("div.theme.dark").click();
                        }
                        if (document.body.classList.contains("theme--dark") && items.themeDark == 6) {
                            var style = document.createElement('style');
                            style.type = 'text/css';
                            style.innerHTML = `
                            body {
                                background-color: #030303;
                                scrollbar-color: #d4d4d43b #7878787a;
                            }
                            #header {
                                border-bottom: #1b1b1c;
                            }
                            #header > .kbin-container {
                                max-width: 100%;
                                background-color: #1a1a1b;
                            }
                            #middle > .kbin-container {
                                margin-top: 1.4rem;
                            }
                            div {
                                color: #d7dadc!important;
                            }
                            #middle {
                                background-color: #030303;
                                
                            }
                            #content {
                                background-color: #0c0c0c;
                        
                            }
                            .entry div.no-image-placeholder {
                                background-color: #202021;
                                box-shadow: 0px 0px 10px rgba(0, 0, 0, .53);
                            }
                            .entry.section.subject figure {
                                box-shadow: 0px 0px 10px rgba(0, 0, 0, .53);
                            }
                            .entry div.no-image-placeholder a i.fa-solid.fa-message,
                            a i.fa-solid.fa-link {
                                scale: 0.7;
                                color: #cdd9e2;
                            }
                        
                            div.section.magazines.magazines-columns {
                                background-color: #1a1a1b;
                                border: #444141 0px;
                                border-style: solid;
                            }
                            body.theme--dark.fixed-navbar div#middle.page-entry-front div.kbin-container main#main div#content div .entry.section.subject {
                                background-color: #1a1a1b;
                                border: #363434 1px;
                                border-style: solid;
                         
                            }
                        
                            body.theme--dark.fixed-navbar div#middle.page-entry-front div.kbin-container main#main div#content div .entry.section.subject:hover {
                                background-color: #252526;
                                border: #444141 1px;
                                border-style: solid;
                                box-shadow: 0 0 10px 1px #1d5f84;
                                transition: 0.13s;
                            }
                        
                        
                            html div#middle.page-entry-front div.kbin-container main#main div#content div article.entry.section.subject:hover aside.vote button {
                                background-color: #303032;
                                transition: 0.13s;
                            }
                        
                            li.dropdown ul.dropdown__menu {
                                background-color: #1a1a1b;
                            }
                            li.dropdown ul.dropdown__menu li a {
                                background-color: #1a1a1b;
                            }
                            li.dropdown li a:hover {
                                background-color: #0a0a0a!important;
                                color: #4284b6!important;
                            }
                            li.dropdown ul.dropdown__menu {
                                border-radius: 5px;
                            
                            }
                            
                            /*textarea box shadow*/
                            input:focus {
                                outline: none !important;
                                border: 1px solid #1c8fcf;
                                box-shadow: 0 0 10px #719ECE;
                            }
                            textarea:focus {
                                outline: solid 1px #069df1 !important;
                                border: 1px solid #069df1;
                                box-shadow: 0 0 10px #719ECE;
                            }
                        
                            html body.theme--dark.rounded-edges.fixed-navbar div#middle.page-user.page-user-overview div.kbin-container main#main div#content.overview.subjects.comments-tree.comments article.entry.section.subject {
                                border-bottom-left-radius: 0px!important;
                                border-bottom-right-radius: 0px!important;
                                background-color: #222;
                            }
                        
                            html body.theme--dark.rounded-edges.fixed-navbar div#middle.page-user.page-user-overview div.kbin-container main#main div#content.overview.subjects.comments-tree.comments div.comments.comments-tree blockquote.section.comment.entry-comment.subject.own.nested {
                                padding-top: 13px!important;
                                border-radius: 0px!important;
                            }
                        
                            div#content.overview.subjects.comments-tree.comments article.entry.section.subject.own {
                                border-style: solid;
                                border-color: #a0daf130;
                                border-width: 2px;
                                box-shadow: 0px 0px 15px 0px #66bdff;
                                margin-top: 15px;
                                margin-bottom: 15px;
                                background-color: #118be714!important;
                            }
                            div#content.overview.subjects.comments-tree.comments article.entry.section.subject {
                                background-color: #111010!important;
                            }
                        
                        
                            div#middle.page-entry-single div.kbin-container main#main div#content article.entry.section.subject.own.entry--single.section--top {
                                border-style: solid;
                                border-color: #0d85b424;
                                border-radius: 5px!important;
                                border-width: 2px;
                                box-shadow: 0px 0px 13px 0px #118be7;
                                margin-top: 15px;
                                margin-bottom: 30px;
                                background-color: #118be714!important;
                            }
                            div#middle.page-entry-single div.kbin-container blockquote.section.subject.own {
                                background-color: #101f2a!important;
                                padding: 5px!important;
                                box-shadow: 0px 0px 13px 1px #0b0b0b;
                                object-position: right;
                            }
                            blockquote.section.comment.entry-comment.subject.own.nested div.expando .threadLine {
                                filter: brightness(115%);
                                box-shadow: 0px 0px 10px 0px #121111;
                            }
                        
                            main#main div#content div#comments section.comments.entry-comments.comments-tree blockquote.section.comment.entry-comment.subject.comment-level--1.own.nested {
                                background-color: #101f2a!important;
                                box-shadow: 0px 0px 13px 1px #0b0b0b;
                                box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.3);
                            }
                        
                        
                            div#middle.page-entry-single div.kbin-container main#main div#content article.entry.section.subject.own.entry--single.section--top.no-media-preview div.entry__body div.more {
                                background-color: #0091ff24!important;
                                box-shadow: 0px 0px 13px 1px #0b0b0b;
                            }
                        
                            div#middle.page-entry-single div.kbin-container main#main div#content div#comments section.comments.entry-comments.comments-tree blockquote.section.comment.entry-comment.subject.nested div.children blockquote.section.comment.entry-comment.subject.own.nested aside.vote form.vote__up button,
                            div#middle.page-entry-single div.kbin-container main#main div#content div#comments section.comments.entry-comments.comments-tree blockquote.section.comment.entry-comment.subject.nested div.children blockquote.section.comment.entry-comment.subject.own.nested aside.vote form.vote__down button,
                            div#middle.page-entry-single div.kbin-container main#main div#content div#comments section.comments.entry-comments.comments-tree blockquote.section.comment.entry-comment.subject.own.nested aside.vote form.vote__up button,
                            div#middle.page-entry-single div.kbin-container main#main div#content div#comments section.comments.entry-comments.comments-tree blockquote.section.comment.entry-comment.subject.own.nested aside.vote form.vote__down button {
                                background-color: #2b2b2b!important;
                            }
                        
                            div#middle.page-entry-single div.kbin-container main#main div#content div#comments aside.vote {
                                padding-right: 7px;
                                padding-top: 3px;
                            }
                        
                            button.btn.btn__primary {
                                background-color: #e0e0e0!important;
                                color: #4c4c4c!important;
                                border-radius: 50px!important;
                                padding: 11px;
                            }
                            li button.btn.btn__secondary {
                                border-radius: 50px!important;
                                border-style: solid;
                                padding: 11px;
                            }
                        
                            li.select div select {
                                border-radius: 50px!important;
                                border-style: solid;
                                padding: 11px;
                            }
                        
                            footer div.js-container form.comment-add div.row div textarea#post_comment_body {
                                background: #0d0d0d;
                            }
                        
                            div#middle.page-post-front div.kbin-container main#main section.section.section--top form.post-add div.row div textarea#post_body {
                                background: #0d0d0d;
                            }
                            div#middle.page-post-front div.kbin-container main#main section.section.section--top form.post-add div.row.params div div.ts-control {
                                background-color: #0d0d0d!important;
                            }
                            div.ts-control input#post_magazine_autocomplete-ts-control {
                                color: #c2c1c1!important;
                            }
                            div#middle.page-entry-create div.kbin-container main#main aside.options.options--top.options-activity menu.options__main li a {
                                padding-left: 15px!important;
                            }
                            /*blockquote.section.comment.entry-comment.subject.own.nested {
                                border-style: solid!important;
                                border-color: #d1b551a8!important;
                                border-width: 2px!important;
                                box-shadow: 0px 0px 15px 2px #f2af06cf;
                                margin-top: 15px;
                                padding-top: 10px!important;
                                padding-bottom: 10px!important;
                            }
                        */
                            html body.theme--dark.rounded-edges.fixed-navbar div#middle.page-user.page-user-overview div.kbin-container main#main div#content.overview.subjects.comments-tree.comments div.comments.comments-tree blockquote.section.comment.entry-comment.subject.nested {
                                padding-top: 10px!important;
                                border-radius: 0px!important;
                                border-style: solid!important;
                                border-width: 2px!important;
                            }
                        
                            html body.theme--dark.rounded-edges.fixed-navbar div#middle.page-entry-single div.kbin-container main#main div#content div#comments section.comments.entry-comments.comments-tree blockquote.section.comment.entry-comment.subject.comment-level--1.nested {
                                padding-top: 10px!important;
                            }
                        
                            .section.post.subject.show-preview {
                                background-color: #1a1a1b;
                                border-color: #323235;
                                border-top: #1a1a1b;
                                border-right: #1a1a1b;
                            }
                        
                            .entry.section.subject figure a img {
                                border-radius: 4px;
                            }
                        
                            .entry.section.subject figure {
                                margin-right: 5px;
                            }
                        
                        
                            /*avatar radius*/
                            .section.comment.entry-comment.subject figure a img {
                                border-radius: 50px;
                            }
                            
                            header h2 small.badge.kbin-bg{
                                color:#10acf0;
                                background-color:#3e3e3f;
                            }
                        
                            footer figure a.thumb img {
                                border-radius: 0px!important;
                            }
                            aside#sidebar div.alert.alert__info {
                                background: #041525;
                                border: 1px solid #5e95b3;
                                color: #d9e5ecd9;
                                border-radius: 5px;
                                border-width: 2px;
                                margin-right: 10px;
                                box-shadow: 0 0px 15px 1px #65a4eaf5;
                            }
                            .header div.kbin-container nav.head-nav div.brand a:hover {
                                transform: scale(.9);
                                opacity: .9;
                                transition: 0.2s;
                            }
                            header#header.header div.kbin-container menu li a.icon:hover,
                            header#header.header div.kbin-container menu li.dropdown a.has-avatar.login:hover,
                            header#header.header div.kbin-container menu li a.fa-solid.fa-user-gear:hover {
                                transition: 0.3s;
                                opacity: .9;
                                color: #d9d6d6;
                            }
                            header#header.header div.kbin-container menu li.notification-button a.fa-solid.fa-bell:hover{
                                transition: 0.3s;
                                opacity: .9;
                                 border-color: #f6f7f8ba;
                        
                            }
                            header#header.header div.kbin-container nav.head-nav menu.head-nav__menu li a.active {
                                border-color: #0475aa!important;
                                /*border-bottom-left-radius: 10px;
                                border-bottom-right-radius: 10px;*/
                                background-color: #040e141a;
                                color: #fff!important;
                                box-shadow: 0 3px 5px -6px #65a4eaf5;
                            }
                            header#header.header div.kbin-container nav.head-nav menu.head-nav__menu li a.active:hover {
                                background-color: #15191c2b;
                                color: #d9d6d6!important;
                                border-color: #015982!important;
                                box-shadow: 0 3px 6px -3px #65a4eaf5;
                                transition: 0.3s;
                            }
                        
                            header#header.header div.kbin-container nav.head-nav menu.head-nav__menu li a:hover {
                        
                                background-color: #15191c2b;
                                color: #fff!important;
                                /*border-bottom-left-radius: 10px;
                                border-bottom-right-radius: 10px;*/
                                box-shadow: 0 3px 2px -3px #fff;
                                transition: 0.3s;
                            }
                            header#header.header div.kbin-container nav.head-nav menu.head-nav__menu li div.head-title a:hover {
                                border-color: #fff0!important;
                                color: #fff!important;
                                box-shadow: 0 3px 2px -3px #fff0;
                                transition: 0.3s;
                            }
                            header#header.header div.kbin-container nav.head-nav menu.head-nav__menu li div.head-title:hover {
                                color: #fff!important;
                                transition: 0.3s;
                            }
                            header#header.header div.kbin-container nav.head-nav menu.head-nav__menu li div.head-title {
                                color: #d9d6d6!important;
                            }
                            /*Notifications panel*/
                            header#header.header div.kbin-container iframe.kbin-iframe {
                                border-radius: 5px!important;
                                border: 1px solid #3f3f3f;
                            }
                            html body div#middle.page-notifications div.kbin-container div.pills menu form.me-2 button.btn.btn__primary {
                                padding: 4px;
                                padding-right: 7px;
                                padding-left: 7px;
                                margin-top: 1px;
                            }
                            div#middle.page-notifications div.kbin-container div.pills menu form button.btn.btn__secondary {
                                border-radius: 50px!important;
                                border-style: solid;
                                padding-right: 7px;
                                padding-left: 7px;
                            }
                           div#middle.page-notifications div.kbin-container div.section.section--small.notification.opacity-50,div#middle.page-notifications div.kbin-container  div.section.section--small.notification.opacity-50 div{
                               opacity:90%;
                               background-color:#1a1a1b;
                               margin-bottom:5px;
                               border-radius:0!important;
                               
                               
                            }
                        
                           header#header.header div.kbin-container menu li{
                                        border-color: #f6f7f8ba;
                        
                            }
                            
                            /*subscription panel*/
                            aside#subscription-panel-content {
                                background-color: #1a1a1b!important;
                                border: var(--kbin-options-border)0px!important;
                                color: var(--kbin-section-text-color);
                                margin-bottom: .5rem;
                                margin-right: 18px!important;
                                margin-top: -55px;
                                padding-top: 2rem;
                                padding-right: 1rem;
                                padding-left: 1rem;
                                padding-bottom: 1.6rem;
                                border-radius: 0 0 .5rem .5rem !important;
                                height: calc(100vh - 88px)!important;
                                position: relative!important;
                                max-width: 350px;
                            }
                            aside#subscription-panel-content:not(.subscription-panel-hide-on-collapse.subscription-panel-sticky.subscription-panel-collapsed div#middle.page-entry-single div.kbin-container div#subscription-panel aside#subscription-panel-content) {
                                margin-left: 18px;
                            }
                        
                            div#subscription-panel aside#subscription-panel-content div.search-box-container input#subscription-panel-search {
                                background-color: #0d0d0d;
                            }
                            .subscription-panel-collapsed div.kbin-container div#subscription-panel aside#subscription-panel-content {
                                height: calc(100vh - 1050px)!important;
                                overflow: hidden;
                                
                            }
                            div#subscription-panel aside#subscription-panel-content div.search-box-container{
                                        background-color: #1a1a1b;
                        
                            }
                        
                            div#subscription-panel aside#subscription-panel-content h3 {
                                background-color: #1a1a1b!important;
                            }
                            div#subscription-panel aside#subscription-panel-content div.-box-container {
                                background-color: #1a1a1b!important;
                            }
                            div#subscription-panel.edit-mode aside#subscription-panel-content div#subscription-panel-edit-button.active {
                                background-color: #1a1a1b!important;
                            }
                            .subscription-panel-hide-on-collapse.subscription-panel-collapsed div#middle.page-entry-front div.kbin-container div#subscription-panel aside#subscription-panel-content {
                                margin-left: -5px!important;
                                
                            }
                        
                            /*KUP Edits*/
                            header#header.header div.kbin-container menu li.toolbar-bookmarks.dropdown a.bookmark-menu-button:hover{
                                transition: 0.3s;
                                border-color: #f6f7f8ba;
                            }
                            button.show-article-preview.preview-button {
                                border: solid 1px #555657!important;
                                background-color: #4a4b4c!important;
                            }
                            button i.fas.fa-newspaper {
                                border-color: #f6f7f8ba;
                            }
                            button.show-media-preview.preview-button {
                                border: solid 1px #555657!important;
                                background-color: #4a4b4c!important;
                            }
                        
                            span.preview button.show-preview {
                                border: solid 1px #5f5d5d!important;
                            }
                            button.show-preview i.fas.fa-photo-video {
                                border-color: #f6f7f8ba;
                            }
                            aside.vote {
                                place-content: start!important;
                            }
                            #content article.entry > figure,
                            #content article.entry .no-image-placeholder {
                                align-self: start;
                            }
                        
                           div.settings-row div.value-container label.switch input:checked + .slider {
                                background: #0e6eb7!important;
                            }
                            div.settings-row div.value-container label.switch .slider {
                                background: #595858!important;
                            }
                            div.settings-list div.row div a.link-muted.active{
                                background: #434242!important;
                         
                            }
                            aside#sidebar div.sidebar-options div#settings.section div.settings-list div.row div{
                                border:solid 1px #434242;
                        
                        
                            }
                            html body.theme--dark.rounded-edges.fixed-navbar.extend-width.subscription-panel-hide-on-collapse div#middle.page-user.page-user-overview div.kbin-container main#main {
                                margin-top: -5px;
                            }
                        
                            html body.theme--dark.rounded-edges.fixed-navbar header#header.header div.kbin-container nav.head-nav menu.head-nav__menu li a:hover {
                                border-color: #f6f7f8ba;
                                transition: 0.3s;
                            }
                        
                            html body.theme--dark.fixed-navbar header#header.header div.kbin-container nav.head-nav menu.head-nav__menu li a {
                                color: #c3c1c1;
                            }
                            div.content.formatted a.kbin-media-link {
                                color: #009edb!important;
                            }
                        
                            div.content.formatted a.kbin-media-link:hover {
                                color: #00b8ff!important;
                                transition: 0.4s;
                            }
                            div.content p a.kbin-media-link {
                                color: #009edb!important;
                            }
                            div.content p a.kbin-media-link:hover {
                                color: #00b8ff!important;
                                transition: 0.4s;
                            }
                            span.preview a {
                                color: #009edb!important;
                            }
                            span.preview a:hover {
                                color: #00b8ff!important;
                                transition: 0.4s;
                            }
                            a.mention.u-url {
                                color: #009edb!important;
                            }
                            a.mention.u-url:hover {
                                color: #00b8ff!important;
                                transition: 0.4s;
                            }
                            a.hashtag.tag {
                                color: #009edb!important;
                            }
                            a.hashtag.tag:hover {
                                color: #00b8ff!important;
                                transition: 0.4s;
                            }
                            a.stretched-link {
                                color: #009edb!important;
                            }
                            a.stretched-link:hover {
                                color: #00b8ff!important;
                                transition: 0.4s;
                            }
                            div.row header h4 a {
                                color: #009edb!important;
                            }
                            div.row header h4 a:hover {
                                color: #00b8ff!important;
                                transition: 0.4s;
                            }
                        
                            .options__main::before {
                                color: #d7d7d7!important;
                            }
                            div#middle.page-people div.kbin-container main#main div#content h2 {
                                margin-left: 15px;
                            }
                            h2,
                            h3,
                            h4,
                            h5,
                            h6,
                            h7,
                            h8,
                            h9,
                            h10 {
                                color: #d7d7d7!important;
                            }
                            nav.pagination.section {
                                background-color: #1a1a1b;
                            }
                            footer#footer {
                                background-color: #1a1a1b;
                            }
                            
                            .page-search.page-settings div.kbin-container main#main div.section.section--top {
                                background-color: #1a1a1b;
                                border-color: #1a1a1b;
                                border-radius: 5px;
                            }
                            .fixed-navbar header#header.header div.kbin-container nav.head-nav {
                                background-color: #1a1a1b;
                            }
                            section.section:nth-child(2) {
                                background-color: #1a1a1b;
                            }
                            /*settings and options bar margin bottom*/
                            div#middle.page-entry-single div.kbin-container aside#sidebar section.section.entry-info {
                                padding-bottom: 10px!important;
                            }
                            div#middle.page-entry-single div.kbin-container aside#sidebar div.sidebar-options div.options.options--top {
                                margin-bottom: 16px;
                            }
                            div#middle.page-magazines.page-settings div.kbin-container aside#sidebar div.sidebar-options div.options.options--top {
                                margin-bottom: 0px;
                            }
                            div#middle.page-magazines.page-settings div.kbin-container main#main aside#options.options.options--top {
                                margin-bottom: 8px;
                            }
                            div#middle.page-user.page-user-subscriptions div.kbin-container main#main aside#options.options.options--top {
                                margin-bottom: 8px;
                            }
                            div#middle.page-user.page-user-subscriptions div.kbin-container aside#sidebar div.sidebar-options div.options.options--top {
                                margin-bottom: 0px;
                            }
                            /*side bar background color*/
                            section.section:nth-child(3) {
                                background-color: #1a1a1b;
                            }
                            section.section:nth-child(4) {
                                background-color: #1a1a1b;
                            }
                            section.section:nth-child(5) {
                                background-color: #1a1a1b;
                            }
                            section.section:nth-child(6) {
                                background-color: #1a1a1b;
                            }
                            section.section:nth-child(7) {
                                background-color: #1a1a1b;
                            }
                            section.section:nth-child(8) {
                                background-color: #1a1a1b;
                            }
                            section.section:nth-child(9) {
                                background-color: #1a1a1b;
                            }
                            body.theme--dark.rounded-edges.fixed-navbar.extend-width div#middle.page-entry-single div.kbin-container aside#sidebar div.sidebar-options {
                                margin-bottom: -8px;
                            }
                            html body.theme--dark.rounded-edges.fixed-navbar.extend-width.subscription-panel-hide-on-collapse div#middle.page-entry-single div.kbin-container aside#sidebar div.sidebar-options div.options.options--top {
                                border: solid 1px #3a3a3b !important;
                            }
                            html body.theme--dark.rounded-edges.fixed-navbar.extend-width.subscription-panel-hide-on-collapse div#middle.page-entry-single div.kbin-container aside#sidebar section.section.entry-info {
                                border: solid 1px #3a3a3b !important;
                            }
                            html body.theme--dark.rounded-edges.fixed-navbar.extend-width.subscription-panel-hide-on-collapse div#middle.page-entry-single div.kbin-container aside#sidebar section.magazine.section {
                                border: solid 1px #3a3a3b !important;
                            }
                            html body.theme--dark.rounded-edges.fixed-navbar.extend-width.subscription-panel-hide-on-collapse div#middle.page-entry-single div.kbin-container aside#sidebar section.user-list.section {
                                border: solid 1px #3a3a3b !important;
                            }
                            html body.theme--dark.rounded-edges.fixed-navbar.extend-width.subscription-panel-hide-on-collapse div#middle.page-entry-single div.kbin-container aside#sidebar section.section.active-users {
                                border: solid 1px #3a3a3b !important;
                            }
                        
                            html body.theme--dark.rounded-edges.fixed-navbar.extend-width.subscription-panel-hide-on-collapse div#middle.page-post-front div.kbin-container main#main {
                                margin-top: -5px;
                            }
                            html body.theme--dark.rounded-edges.fixed-navbar.extend-width.subscription-panel-hide-on-collapse div#middle.page-post-front div.kbin-container aside#sidebar div.sidebar-options div.options.options--top {
                                margin-bottom: 0px;
                            }
                        
                            html body.theme--dark.rounded-edges.fixed-navbar.extend-width.subscription-panel-hide-on-collapse div#middle.page-entry-single div.kbin-container aside#sidebar div.sidebar-options div#federation.section {
                                margin-top: -7px;
                                margin-bottom: 17px;
                            }
                            html body.theme--dark.rounded-edges.fixed-navbar.extend-width.subscription-panel-hide-on-collapse div#middle.page-post-front div.kbin-container aside#sidebar div.sidebar-options div#federation.section {
                                margin-top: 8px;
                                margin-bottom: 05px;
                            }
                            div#middle.page-search.page-settings div.kbin-container main#main div.section.section--top {
                                margin-right: 10px;
                                margin-top: -5px!important;
                            }
                            form div.flex input.form-control {
                                background-color: #0d0d0d;
                            }
                            div#middle.page-search.page-settings div.kbin-container main#main div#content.overview.subjects.comments-tree.comments article.entry {
                                background-color: #1a1a1b;
                                border-top-right-radius: 0px!important;
                                border-top-left-radius: 0px!important;
                            }
                            div#middle.page-search.page-settings div.kbin-container main#main div#content.overview.subjects.comments-tree.comments blockquote.section {
                                background-color: #1a1a1b;
                                border-top-right-radius: 0px!important;
                                border-top-left-radius: 0px!important;
                                border: 0px!important;
                            }
                            div#middle.page-search.page-settings div.kbin-container main#main div#content.overview.subjects.comments-tree.comments div.comments.comments-tree.post-comments.post-comments-preview {
                                margin-bottom: 0px;
                            }
                            div#middle.page-post-front div.kbin-container main#main div#content div blockquote.section.post.subject {
                                background-color: #1a1a1b;
                                border: 0px!important;
                                border-top-right-radius: 0px!important;
                                border-top-left-radius: 0px!important;
                            }
                            div#middle.page-search.page-settings div.kbin-container main#main div#content.overview.subjects.comments-tree.comments div.comments.comments-tree blockquote.section.comment.entry-comment.subject.nested {
                                padding-top: 10px!important;
                                margin-top: -15px!important;
                            }
                        
                            div#middle.page-search.page-settings div.kbin-container aside#sidebar div.sidebar-options div.options.options--top {
                                margin-bottom: 0px;
                            }
                        
                            div.kbin-container main#main div.alert.alert__info {
                                background-color: #1a1a1b;
                                margin-right: 10px;
                                border: 1px solid #c19c06;
                                box-shadow: 0px 0px 10px 2px #ad8215;
                                color: #c5c5c5;
                            }
                            div.kbin-container main#main div.alert.alert__info p a {
                                color: #d1a702;
                            }
                            div.kbin-container main#main div.alert.alert__info p a:hover {
                                color: #a48303;
                                text-decoration: underline;
                                transition: 0.3s;
                            }
                        
                            html body.theme--dark.rounded-edges.fixed-navbar.extend-width.subscription-panel-hide-on-collapse div#middle.page-post-front div.kbin-container main#main div.alert.alert__info p a {
                                color: #b88810;
                            }
                            /*message area*/
                            div#middle.page-messages.page-message div.kbin-container main#main div.message.section.content.section--small {
                                margin-right: 15px!important;
                                margin-left: 5px!important;
                                background-color: #1a1a1b;
                                border: 0px;
                                padding-left: 15px!important;
                                padding-right: 15px!important;
                                border-top-right-radius: 0px!important;
                                border-top-left-radius: 0px!important;
                                margin-top: -7px!important;
                                border-top: 1px dashed #414242!important;
                                padding-top: 10px!important;
                            }
                            div#middle.page-messages.page-message div.kbin-container main#main div.section.section--top {
                                margin-right: 15px!important;
                                margin-left: 5px!important;
                                background-color: #1a1a1b;
                                border: 0px;
                                padding-left: 15px!important;
                                padding-right: 15px!important;
                                margin-bottom: 0px;
                                margin-top: -5px!important;
                            }
                            div#middle.page-messages.page-message div.kbin-container main#main div.section.section--top form div textarea#message_body {
                                background: #0a0a0a;
                            }
                            div#middle.page-messages.page-message div.kbin-container aside#sidebar div.sidebar-options div.options.options--top {
                                margin-bottom: 0px;
                            }
                        
                            div#middle.page-post-front div.kbin-container main#main.view-compact section.section.section--top form.post-add div.row div textarea#post_body {
                                background-color: #0d0d0d;
                            }
                            form.comment-add div.row.actions ul li div button {
                                height: 41.4px;
                            }
                            div#content div#comments section.comments.entry-comments.comments-tree blockquote.section.comment.entry-comment.subject.nested footer div.js-container form.comment-add div textarea {
                                background-color: #0d0d0d;
                            }
                            div#middle.page-post-front div.kbin-container main#main.view-compact section.section.section--top form.post-add div.row.actions ul li div button#post_submit.btn.btn__primary {
                                background-color: #4c4c4c;
                                border: 1px #605f5f solid;
                            }
                        
                            section.comments.entry-comments.comments-tree aside.section.section--muted {
                                background-color: #2d2d2d;
                            }
                            section.comments.entry-comments.comments-tree aside.section.section--muted p {
                                color: #d6d6d6;
                            }
                            div#settings.section {
                                background-color: #1a1a1b;
                                padding-bottom: 5px;
                            }
                            div#middle.page-entry-single div.kbin-container aside#sidebar div.sidebar-options div#settings.section {
                                background-color: #1a1a1b;
                                margin-bottom: 16px;
                                border: 1px #3a3a3b solid;
                            }
                            .options {
                                align-items: center;
                                border: #1a1a1b;
                                border-radius: 4px;
                                padding: 10px 12px;
                                height: auto;
                                background-color: #1a1a1b;
                            }
                            .options > * a {
                                border: none !important;
                                border-radius: 20px;
                                margin-right: 8px;
                                background-color: #1f1f20;
                            }
                        
                            .options > * a:hover {
                                background-color: #101010!important;
                            }
                        
                            .options > * a:hover,
                            .options > * a.active {
                                background-color: rgba(0, 0, 0, .38);
                            }
                            .options > * a.active:hover {
                                background-color: rgb(0 0 0 / 15%);
                            }
                            #sidebar .section,
                            article.entry {
                                border: #1a1a1b;
                                border-radius: 4px;
                            }
                            .post {
                                border-radius: 4px;
                            }
                            .vote button {
                                background: #232323;
                                border: #1a1a1b;
                                border-radius: 4px;
                                box-shadow: 0px 0px 10px 0px #0b0b0b73;
                            }
                            .vote .active.vote__up button {
                                background: #232323;
                                border: #a3741c63 1px;
                                border-style: solid;
                                border-radius: 4px;
                                box-shadow: 0px 0px 6px 0px #876002;
                            }
                        
                        
                            .vote .active.vote__down button {
                                background: #232323;
                                border: #97334963 1px;
                                border-style: solid;
                                border-radius: 4px;
                                box-shadow: 0px 0px 6px 0px #e36c6c;
                            }
                        
                            .author > header .timeago::before {
                                background: #1a1a1b;
                                box-shadow: 0px 0px 10px 0px #7d3c3cc7;
                                border-radius: 10px;
                                margin-top: 50px;
                                padding: 1px;
                                padding-right: 2px;
                                padding-left: 4px;
                                margin-right: 5px;
                                margin-left: 1px;
                            }
                        
                        
                            .vote .active.vote__up button {
                                color: #e0a10d;
                            }
                            .vote .active.vote__up button:hover {
                                color: #e9bc0d;
                                transition: 0.13s;
                            }
                            .vote .active.vote__down button:hover {
                                color: #e25757;
                                transition: 0.13s;
                            }
                        
                            .comment-add .dropdown__menu,
                            .comment-edit .dropdown__menu,
                            .page-entry-create .dropdown__menu,
                            .post-add .dropdown__menu,
                            .post-edit .dropdown__menu {
                                top: -17.7rem;
                            }
                            .dropdown__menu {
                                line-height: 1.5;
                            }
                            .btn__secondary,
                            .btn,
                            markdown-toolbar > * {
                                cursor: pointer;
                            }
                            #sidebar li:last-child,
                            #sidebar figure:last-child {
                                border: 0 !important;
                            }
                            #sidebar .section {
                                padding: .5rem .5rem 0 .5rem;
                            }
                            .sidebar-options {
                                margin-bottom: .5rem;
                            }
                            .dropdown__menu {
                                border-radius: px;
                            }
                            aside#sidebar section.section.active-users {
                                padding-bottom: 7px;
                            }
                        
                            #header .login:after {
                                content: ' ';
                                display: inline-block;
                                width: 18px;
                                height: 16px;
                                background-image: url(https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/expand_more/wght300/24px.svg);
                                margin-right: 4px;
                            }
                            body.theme--solarized-dark #header .login:after {
                                filter: invert(59%) sepia(5%) saturate(661%) hue-rotate(138deg) brightness(95%) contrast(96%);
                            }
                            body.theme--solarized-light #header .login:after {
                                filter: invert(44%) sepia(7%) saturate(958%) hue-rotate(148deg) brightness(91%) contrast(93%);
                            }
                            body.theme--dark #header .login:after,
                            body.theme--light #header .login:after,
                            body.theme--kbin #header .login:after {
                                filter: invert(100%);
                            }
                            #header menu {
                                margin-right: 8px;
                            }
                            #header menu .dropdown__menu {
                                left: -0.75rem;
                            }
                            .options--top .options__main li a {
                                display: flex;
                                padding-left: 2.5rem;
                            }
                            .options--top .options__main li a:before {
                                content: " ";
                                display: inline-block;
                                width: 32px;
                                height: 32px;
                                position: absolute;
                                margin-left: -2rem;
                                margin-top: -0.2rem;
                            }
                            .theme--dark .options--top .options__main li a:before,
                            .theme--kbin .options--top .options__main li a:before,
                            .theme--light .options--top .options__main li a:before {
                                filter: invert(81%) sepia(9%) saturate(217%) hue-rotate(171deg) brightness(105%) contrast(91%);
                            }
                            .theme--light .options--top .options__main li:hover a:before,
                            .theme--light .options--top .options__main li a.active:before {
                                filter: invert(22%) sepia(17%) saturate(1177%) hue-rotate(170deg) brightness(98%) contrast(85%);
                            }
                            .theme--solarized-light .options__main li a:before {
                                filter: invert(43%) sepia(6%) saturate(1240%) hue-rotate(148deg) brightness(91%) contrast(87%);
                            }
                            .theme--solarized-light .options--top .options__main li:hover a:before,
                            .theme--solarized-light .options--top .options__main li a.active:before {
                                filter: invert(28%) sepia(26%) saturate(396%) hue-rotate(150deg) brightness(94%) contrast(85%);
                            }
                            .theme--solarized-dark .options--top .options__main li a:before {
                                filter: invert(50%) sepia(7%) saturate(1061%) hue-rotate(150deg) brightness(90%) contrast(84%);
                            }
                            .theme--solarized-dark .options--top .options__main li:hover a:before,
                            .theme--solarized-dark .options--top .options__main li a.active:before {
                                filter: invert(100%);
                            }
                            .page-entry-front .options--top .options__main li:nth-child(1) a:before {
                                background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNTYgMTQ2Ij4KPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iCiAgTSAxMTguNDcgNzUuMjEKICBRIDEyMS43MSA3Ny40MiAxMjEuNzcgODEuMDAKICBRIDEyMi4wMiA5NC44OSAxMjEuOTcgMTA4Ljc3CiAgQyAxMjEuOTYgMTEyLjQzIDEyMC41OSAxMTUuOTkgMTE2LjQ2IDExNi4wMAogIFEgODAuNTAgMTE2LjAxIDQ0LjU1IDExNS45OQogIFEgNDIuNjcgMTE1Ljk5IDQxLjYzIDExNC40MQogIFEgMzkuOTYgMTExLjg4IDM5Ljk3IDEwOC41MAogIFEgMzkuOTkgOTUuMTQgNDAuMDAgODEuNzgKICBDIDQwLjAxIDc1Ljg4IDQzLjk4IDc0LjAxIDQ5LjE4IDc0LjAxCiAgUSA1Ni43OSA3NC4wMCA2NC4yOCA3My45OQogIEEgMC43MiAwLjcyIDAuMCAwIDAgNjUuMDAgNzMuMjcKICBMIDY0Ljk5IDU2LjU0CiAgQSAwLjU0IDAuNTMgLTAuMCAwIDAgNjQuNDUgNTYuMDEKICBDIDYxLjQ2IDU2LjA0IDQzLjU0IDU3LjY1IDUyLjE0IDQ4LjU5CiAgUSA2NS44MCAzNC4xNyA3Ny45MiAyMy4xNQogIEMgODEuMDMgMjAuMzMgODIuNTkgMjIuMzQgODQuODEgMjQuNDUKICBRIDk3LjMyIDM2LjMzIDEwOS4xNyA0OC44NQogIEMgMTEyLjAxIDUxLjg1IDExMi40OCA1Ni4yOSAxMDYuNzcgNTYuMTEKICBRIDEwMi4xNCA1NS45NyA5Ny45MyA1Ni4wMwogIEEgMC45MSAwLjg5IC0wLjMgMCAwIDk3LjAzIDU2LjkyCiAgTCA5Ny4xMCA3My40MQogIEEgMC41MiAwLjUwIDAuMCAwIDAgOTcuNjIgNzMuOTEKICBMIDExNC41MyA3NC4wMAogIFEgMTE2Ljc0IDc0LjAyIDExOC40NyA3NS4yMQogIFoKICBNIDk4LjM1IDQ3LjkyCiAgQyA5My4xNyA0Mi4yOCA4Ny41NyAzNy4wNyA4Mi4wOSAzMS43MwogIEEgMS44NiAxLjgwIC00NS4zIDAgMCA3OS41MiAzMS43OQogIEwgNjMuNDYgNDcuOTgKICBRIDYyLjQyIDQ5LjAzIDYzLjgzIDQ4Ljk5CiAgTCA3MC40MiA0OC44MQogIEEgMS41NSAxLjQzIC0wLjggMCAxIDcyLjAxIDUwLjI0CiAgTCA3Mi4wNiAxMDguMzQKICBBIDAuNTIgMC41MCA5MC4wIDAgMCA3Mi41NiAxMDguODYKICBMIDg5LjQ1IDEwOC44NwogIEEgMC41MyAwLjUwIC05MC4wIDAgMCA4OS45NSAxMDguMzQKICBMIDg5Ljk4IDQ5Ljk5CiAgQSAwLjk3IDAuOTcgLTAuMyAwIDEgOTAuOTQgNDkuMDIKICBMIDk3Ljg5IDQ4Ljk4CiAgUSA5OS4zMiA0OC45NyA5OC4zNSA0Ny45MgogIFoKICBNIDY1LjAwIDgxLjkzCiAgQSAwLjkyIDAuOTIgMC4wIDAgMCA2NC4wOCA4MS4wMQogIEwgNDcuOTIgODEuMDEKICBBIDAuOTIgMC45MiAwLjAgMCAwIDQ3LjAwIDgxLjkzCiAgTCA0Ny4wMCAxMDguMDkKICBBIDAuOTIgMC45MiAwLjAgMCAwIDQ3LjkyIDEwOS4wMQogIEwgNjQuMDggMTA5LjAxCiAgQSAwLjkyIDAuOTIgMC4wIDAgMCA2NS4wMCAxMDguMDkKICBMIDY1LjAwIDgxLjkzCiAgWgogIE0gMTE1LjAwIDgxLjcwCiAgQSAwLjcwIDAuNzAgMC4wIDAgMCAxMTQuMzAgODEuMDAKICBMIDk3LjcwIDgxLjAwCiAgQSAwLjcwIDAuNzAgMC4wIDAgMCA5Ny4wMCA4MS43MAogIEwgOTcuMDAgMTA4LjMwCiAgQSAwLjcwIDAuNzAgMC4wIDAgMCA5Ny43MCAxMDkuMDAKICBMIDExNC4zMCAxMDkuMDAKICBBIDAuNzAgMC43MCAwLjAgMCAwIDExNS4wMCAxMDguMzAKICBMIDExNS4wMCA4MS43MAogIFoiCi8+Cjwvc3ZnPgo=");
                            }
                            .page-entry-front .options--top .options__main li:nth-child(2) a:before {
                                background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNDAgMTQwIj4KPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iCiAgTSA3Mi41NSAxOS44MwogIEMgOTMuNDIgMzEuNDEgMTEzLjI4IDUxLjA1IDExNC4yNSA3Ni40OQogIEMgMTE0LjkxIDkzLjYwIDEwMy4yMSAxMDcuNjkgODcuMzcgMTEzLjU1CiAgQyA3MS41MCAxMTkuNDIgNTMuMzYgMTE2Ljk1IDQwLjM5IDEwNS45NAogIEMgMTcuNjggODYuNjYgMjYuNDUgNTYuMjYgNDQuNDUgMzcuOTQKICBRIDU1LjQ1IDI2Ljc1IDY4LjE3IDE5LjgyCiAgUSA3MC4zNiAxOC42MiA3Mi41NSAxOS44MwogIFoKICBNIDEwNi43MSA3NC41OAogIEMgMTA1LjE1IDU0LjU0IDg3LjI2IDM3LjA1IDcwLjY5IDI3LjQ3CiAgQSAwLjg2IDAuODIgLTQ0LjIgMCAwIDY5LjgzIDI3LjQ4CiAgUSA1NS4xOCAzNi4yMiA0NC41NCA0OS41NAogIEMgMzEuNjYgNjUuNjYgMjguODAgODkuNTkgNDguMTIgMTAyLjUwCiAgUSA0OC41NCAxMDIuNzcgNDguMzggMTAyLjMwCiAgQyA0Mi41NCA4NC4zMyA1Mi42NyA2Ni4zOCA2OC4yNSA1Ny40NgogIFEgNzAuMzcgNTYuMjUgNzIuNDMgNTcuNTUKICBDIDg2LjQ2IDY2LjQwIDk5LjgyIDg0LjgwIDkxLjk4IDEwMi4yNAogIFEgOTEuMzUgMTAzLjYzIDkyLjcwIDEwMi42NgogIFEgMTA4LjA0IDkxLjYyIDEwNi43MSA3NC41OAogIFoKICBNIDg0LjQ1IDgxLjgzCiAgQyA4MS45NSA3Ni4xOCA3Ni41NiA2OC4wNyA3MC40OCA2NS40MgogIEEgMC45MiAwLjkwIC01MC4zIDAgMCA2OS42MCA2NS41MQogIEMgNjIuMjIgNzAuNzIgNTUuMjkgNzkuNTEgNTMuOTggODguNjIKICBDIDUyLjQzIDk5LjM2IDU5LjY3IDEwOS43MiA3MS4xMCAxMDkuMzEKICBRIDc2LjUwIDEwOS4xMSA4MC42OCAxMDUuNjQKICBDIDg4LjA4IDk5LjQ4IDg4LjIxIDkwLjMzIDg0LjQ1IDgxLjgzCiAgWiIKLz4KPC9zdmc+Cg==");
                            }
                            .page-entry-front .options--top .options__main li:nth-child(3) a:before {
                                background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNDAgMTQwIj4KPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iCiAgTSAxMDguMzMgNjkuMDUKICBDIDExMS4yNSA3MS40NCAxMTcuMjkgNzYuNTQgMTE2LjkxIDgwLjU3CiAgQyAxMTYuMjUgODcuNTAgMTA1LjY4IDg3LjI5IDEwMC40NyA4OC4xNgogIEEgMC41NiAwLjU2IDgzLjggMCAwIDEwMC4wMCA4OC43NQogIEMgMTAwLjI3IDkzLjE5IDEwMS43MyA5OS4zMyAxMDEuMTggMTAyLjc3CiAgQyA5OS43NiAxMTEuNzAgODYuNzQgMTA0LjUyIDgyLjIzIDEwMi4wMgogIEEgMC44MSAwLjc5IDI4LjYgMCAwIDgxLjEzIDEwMi4zMwogIEwgNzUuMjcgMTEzLjM0CiAgQSAxLjgwIDEuNTggLTg4LjAgMCAxIDc0LjYxIDExNC4wNAogIEMgNjUuODIgMTE4Ljk0IDYyLjk4IDEwOC42NCA1OS41OCAxMDMuMjUKICBRIDU4LjUyIDEwMS41NSA1Ni43OSAxMDIuNTYKICBDIDUyLjUyIDEwNS4wNiA0My40OSAxMTAuNTQgMzkuODggMTA0LjI5CiAgQyAzOC4xMCAxMDEuMjEgNDAuMjIgOTIuNDIgNDAuNzEgODguNzgKICBBIDAuNTMgMC41MSA4LjEgMCAwIDQwLjI3IDg4LjIxCiAgQyAzNi42NiA4Ny42NyAyNy4wOSA4Ni43MCAyNC44NiA4My43OAogIEMgMjAuODYgNzguNTYgMjkuMDEgNzAuODAgMzIuNzkgNjcuODMKICBBIDAuODYgMC44NSA1MS4yIDAgMCAzMi45MiA2Ni42MQogIEMgMjkuMDggNjIuMDEgMjAuMTkgNTUuMzMgMjUuNDUgNDguOTAKICBBIDEuNzMgMS40NyA4LjYgMCAxIDI2LjI3IDQ4LjM5CiAgUSAzMy4wMiA0Ni41NyAzOS45NCA0NS44OAogIEEgMC44NCAwLjg0IC03LjQgMCAwIDQwLjY5IDQ0LjkxCiAgUSAzOS45MSAzOS43NiAzOS4zMSAzNC4yNAogIEMgMzguNDcgMjYuNTUgNDMuODMgMjQuNzQgNDkuNTYgMjcuNzEKICBRIDUzLjkwIDI5Ljk2IDU4LjUwIDMxLjU4CiAgQSAwLjYzIDAuNjIgLTYzLjkgMCAwIDU5LjI0IDMxLjMyCiAgQyA2Mi41OCAyNS43NyA2NS4xNSAxNS41OSA3NC4yMiAxOS42MgogIEEgMS42MyAxLjQ0IDg0LjUgMCAxIDc0LjkzIDIwLjI4CiAgTCA4MS40NSAzMS42NgogIEEgMC41NCAwLjUyIC0yNy4zIDAgMCA4Mi4xNSAzMS44NwogIEMgODUuOTYgMzAuMDIgOTEuNTggMjYuMzkgOTUuNTMgMjYuNDQKICBDIDEwNC4zNiAyNi41NCAxMDAuNTAgMzkuODcgOTkuOTggNDQuNzYKICBBIDEuMTcgMS4xNiAtODUuMCAwIDAgMTAxLjA1IDQ2LjA0CiAgQyAxMDQuOTkgNDYuMzUgMTEyLjc2IDQ2Ljc5IDExNS40MCA0OS44MQogIEMgMTIwLjIxIDU1LjI5IDExMi4wMSA2Mi4xNSAxMDguMzQgNjUuMTYKICBRIDEwNS45NyA2Ny4xMCAxMDguMzMgNjkuMDUKICBaCiAgTSA0NS45OCA1MS4zOQogIFEgMzkuOTAgNTMuOTcgMzMuMjIgNTMuODkKICBBIDEuMDUgMC42NiAxMC40IDAgMCAzMi40MCA1NC4yMgogIFEgMzIuMjUgNTQuNDQgMzIuMjMgNTQuNzAKICBBIDEuMTYgMC42NyAyOS4xIDAgMCAzMi43MCA1NS40OQogIEMgMzcuMjggNTkuMDUgNDQuOTEgNjUuODUgNDAuMzAgNzEuMDYKICBRIDM2Ljc5IDc1LjAzIDMyLjkyIDc4LjY4CiAgUSAzMS42NiA3OS44OCAzMy41NyA3OS45MwogIFEgMzkuMDkgODAuMDggNDQuNDQgODEuNjAKICBDIDUwLjQxIDgzLjMwIDQ3LjQ2IDkzLjUwIDQ2Ljk4IDk4LjAyCiAgUSA0Ni44NyA5OS4wOSA0Ny44MyA5OC42MQogIFEgNTIuMTUgOTYuNDIgNTcuMDIgOTQuNTcKICBDIDY0LjU5IDkxLjY5IDY2Ljg0IDEwMC42NiA2OS40OSAxMDUuNDkKICBRIDcwLjI0IDEwNi44NSA3MC45NCAxMDUuNDcKICBDIDczLjc3IDk5LjkzIDc2Ljc1IDkxLjExIDg0LjQ5IDk0Ljc1CiAgUSA4OC43MSA5Ni43MyA5Mi42MCA5OC44NAogIFEgOTQuMDMgOTkuNjEgOTMuNzUgOTguMDEKICBRIDkyLjk1IDkzLjUxIDkyLjI2IDg4Ljk5CiAgQyA5MC45OCA4MC43MSAxMDIuMTUgODAuMTEgMTA3LjQyIDc5Ljk2CiAgUSAxMDguMjQgNzkuOTQgMTA3LjcyIDc5LjMwCiAgUSAxMDMuOTEgNzQuNjEgOTkuODIgNzAuMTkKICBDIDk1LjgzIDY1Ljg4IDEwNC44MSA1OC4wMiAxMDcuNjMgNTQuOTEKICBRIDEwOC41MyA1My45MSAxMDcuMTkgNTMuODQKICBDIDEwMi41OCA1My41OSA5NC40MyA1My42OCA5Mi42NSA0OC4zNQogIEMgOTEuNjQgNDUuMzQgOTMuMDIgMzkuNTggOTMuNzQgMzUuOTgKICBRIDk0LjExIDM0LjE4IDkyLjUzIDM1LjEzCiAgQyA4OS40OSAzNi45NyA4Mi44NSA0MC43MiA3OS4yNSAzOS42NgogIEMgNzUuMDIgMzguNDEgNzIuNjYgMzEuMzUgNzAuOTggMjcuNzYKICBRIDcwLjIyIDI2LjE1IDY5LjUzIDI3Ljc5CiAgQyA2OC4xOCAzMC45OCA2NC45OCAzOC41MyA2MS41NyAzOS43NgogIEMgNTcuOTggNDEuMDYgNTEuMjYgMzYuNjggNDguMDAgMzQuOTcKICBBIDAuNzEgMC43MSAtNzYuOSAwIDAgNDYuOTYgMzUuNjIKICBDIDQ3LjA5IDQwLjgxIDQ5LjQzIDQ1LjgzIDQ2LjY5IDUwLjc1CiAgQSAxLjQ4IDEuNDMgMi4xIDAgMSA0NS45OCA1MS4zOQogIFoiCi8+Cjwvc3ZnPgo=");
                            }
                            .page-entry-front .options--top .options__main li:nth-child(4) a:before {
                                background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNDAgMTQwIj4KPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iCiAgTSA1MC42OSA1MS45NAogIEMgNTUuMDUgNDcuNjMgNTkuNTUgNDIuODAgNjUuMzcgNDguMDgKICBRIDY5Ljg2IDUyLjE2IDczLjkyIDU2LjU5CiAgQSAxLjQwIDEuMzkgNDYuMyAwIDAgNzUuOTQgNTYuNjQKICBMIDgzLjgwIDQ4Ljc4CiAgQSAwLjk5IDAuOTggNDQuMCAwIDAgODMuNzcgNDcuMzYKICBDIDgxLjQwIDQ1LjE1IDc1Ljg3IDQwLjU1IDc3LjUzIDM2LjkxCiAgQyA3OS40NSAzMi43MCA4NC44OCAzNC4wNCA4OC41MCAzNC4wMgogIFEgMTAxLjEwIDMzLjkzIDExMy42OSAzNC4wOAogIFEgMTE4LjgyIDM0LjE0IDExOC44NiAzOS4wNgogIFEgMTE4Ljk5IDU0LjI2IDExOS4wMyA2OS40NgogIEMgMTE5LjA0IDcyLjc0IDExNy44MSA3NS44NiAxMTQuMDIgNzUuMDkKICBDIDExMS4xNyA3NC41MSAxMDcuODEgNzAuMjQgMTA1LjUwIDY4LjAzCiAgQSAwLjg0IDAuODQgNDQuMCAwIDAgMTA0LjMyIDY4LjA1CiAgUSA5My42OSA3OC45OCA4Mi43NyA4OS42MQogIFEgNzkuMjIgOTMuMDcgNzcuMjMgOTMuNjkKICBDIDcxLjEwIDk1LjYyIDY0LjM1IDg3LjE4IDYwLjUyIDgzLjAzCiAgQSAwLjY3IDAuNjcgNDUuNiAwIDAgNTkuNTUgODMuMDIKICBDIDU1LjQ0IDg3LjI4IDQ1LjQxIDk4Ljk2IDQwLjAxIDEwMC4yMAogIEEgMS41MSAxLjQ5IDUwLjcgMCAxIDM5LjA2IDEwMC4xMAogIEMgMzMuNzcgOTcuNjUgMjguMTcgOTAuOTkgMjQuMzQgODYuNTkKICBDIDIxLjg0IDgzLjczIDIyLjI4IDgwLjMyIDI0Ljc3IDc3Ljc3CiAgUSAzMS4wOCA3MS4zMCA1MC42OSA1MS45NAogIFoKICBNIDk0LjQwIDQ2Ljc4CiAgQSAxLjY0IDEuNTIgNDMuNiAwIDEgOTQuNTQgNDkuMDEKICBRIDg1LjQ3IDU4LjUwIDc1LjQ5IDY3LjAyCiAgQSAwLjcxIDAuNjkgLTQyLjUgMCAxIDc0LjU0IDY2Ljk5CiAgTCA2MS43MiA1NC4zMQogIEEgMS41NCAxLjQ4IDQ1LjUgMCAwIDU5LjYyIDU0LjI1CiAgTCAzMS43NyA4MC41NAogIFEgMzAuMzUgODEuODkgMzEuNzAgODMuMTkKICBMIDM5LjcwIDkwLjg5CiAgQSAxLjI2IDEuMjIgLTQ1LjMgMCAwIDQxLjQyIDkwLjg1CiAgTCA1OS4wOCA3My40NQogIEEgMS41MCAxLjM5IC00NS43IDAgMSA2MS4wNyA3My4zNQogIEwgNzQuNzAgODYuMDgKICBBIDAuOTggMC45MiA0Ni4zIDAgMCA3NS45NSA4Ni4xNQogIEMgNzcuMzggODQuOTkgNzguOTIgODMuODEgODAuMjEgODIuNDYKICBRIDkxLjg2IDcwLjI0IDEwNC4wOCA1OC41NgogIEEgMS4yOSAxLjI5IC05MC4wIDAgMSAxMDUuODYgNTguNTYKICBMIDExMS4yNSA2My43OAogIFEgMTExLjk5IDY0LjUwIDExMS45OSA2My40NwogIEwgMTEyLjAwIDQxLjUwCiAgQSAwLjUwIDAuNTAgMC4wIDAgMCAxMTEuNTAgNDEuMDAKICBMIDkwLjI0IDQxLjAwCiAgUSA4OC4zNSA0MS4wMCA4OS42NyA0Mi4yNgogIEwgOTQuNDAgNDYuNzgKICBaIgovPgo8L3N2Zz4K");
                            }
                            .page-entry-front .options--top .options__main li:nth-child(5) a:before {
                                background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNDAgMTQwIj4KPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iCiAgTSA0MS4zMCA2NC45NAogIFEgNDIuMDYgNjEuNTkgNDIuMTkgNTguMTUKICBDIDQyLjg2IDQwLjMwIDU1LjY0IDI1LjIwIDcxLjI4IDE3LjcxCiAgUSA3Mi45NiAxNi45MSA3NC42NSAxNy43MAogIFEgOTUuMjYgMjcuNDcgMTAxLjY1IDQ5LjQxCiAgQyAxMDIuOTUgNTMuODcgMTAzLjQ0IDU5LjA4IDEwNC4wMCA2My45NgogIEEgMS43NyAxLjc2IDYuMSAwIDAgMTA1LjE4IDY1LjQyCiAgQyAxMTkuMTYgNzAuMTcgMTIwLjE4IDg0LjUyIDExOS4xNiA5Ny4xOAogIEMgMTE4LjUwIDEwNS4zNSAxMTIuNzIgMTA0Ljk4IDEwNS42NyAxMDQuOTkKICBRIDY5LjkzIDEwNS4wNSAzNC4xOSAxMDQuOTQKICBDIDI4Ljk4IDEwNC45MyAyNi45NCAxMDIuODMgMjYuOTggOTcuNTgKICBRIDI3LjA1IDkwLjE1IDI2Ljk3IDgyLjc3CiAgQyAyNi44NyA3NC4wMCAzMi4yMiA2Ny42OSA0MC43MSA2NS41NQogIEEgMC44MiAwLjgwIDg5LjUgMCAwIDQxLjMwIDY0Ljk0CiAgWgogIE0gNDkuMTkgNTkuNDQKICBRIDQ4LjcxIDc0Ljk2IDQ5LjEyIDk2LjM4CiAgQSAwLjUzIDAuNTEgODkuNCAwIDAgNDkuNjMgOTYuOTAKICBMIDk2LjMxIDk2LjkwCiAgQSAwLjUzIDAuNTMgLTg4LjkgMCAwIDk2Ljg0IDk2LjM5CiAgUSA5Ny40MiA4Mi4xNyA5Ni43MCA2Ny45OAogIEMgOTUuNzUgNDkuMTUgOTEuMjUgMzYuODggNzUuNDUgMjYuNTEKICBRIDczLjAzIDI0LjkyIDcwLjQ4IDI2LjMwCiAgQyA1OS41NiAzMi4xOSA0OS41OSA0Ni4zNyA0OS4xOSA1OS40NAogIFoKICBNIDQwLjgwIDczLjA4CiAgQyAzMi4yOSA3NS4zMCAzMy45MSA4OC4zMSAzNC4wMiA5Ni4wNAogIEEgMC42NyAwLjY2IC04My4wIDAgMCAzNC41MSA5Ni42NwogIFEgMzcuODYgOTcuNTEgNDEuNDYgOTYuNzMKICBBIDAuNjQgMC42MiA4My44IDAgMCA0MS45NCA5Ni4xMQogIEwgNDEuOTkgNzMuOTkKICBBIDAuOTUgMC45NCAtNy40IDAgMCA0MC44MCA3My4wOAogIFoKICBNIDEwNS42OSA3My43MgogIFEgMTA0LjAxIDcyLjUzIDEwNC4wMSA3NC41OAogIEwgMTA0LjAwIDk2LjI2CiAgQSAwLjcxIDAuNjkgOTAuMCAwIDAgMTA0LjY5IDk2Ljk3CiAgTCAxMTAuOTkgOTYuOTcKICBBIDEuMDAgMC45NyAtODguNCAwIDAgMTExLjk2IDk2LjAyCiAgUSAxMTIuMzAgODguNjEgMTExLjE1IDgxLjMzCiAgUSAxMTAuNDggNzcuMTEgMTA1LjY5IDczLjcyCiAgWiIKLz4KPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iCiAgTSA4Ni41MiA1NS45OQogIEEgMTMuNzAgMTMuNzAgMC4wIDAgMSA3Mi44MiA2OS42OQogIEEgMTMuNzAgMTMuNzAgMC4wIDAgMSA1OS4xMiA1NS45OQogIEEgMTMuNzAgMTMuNzAgMC4wIDAgMSA3Mi44MiA0Mi4yOQogIEEgMTMuNzAgMTMuNzAgMC4wIDAgMSA4Ni41MiA1NS45OQogIFoKICBNIDc5LjE5IDU1Ljk4CiAgQSA2LjE4IDYuMTggMC4wIDAgMCA3My4wMSA0OS44MAogIEEgNi4xOCA2LjE4IDAuMCAwIDAgNjYuODMgNTUuOTgKICBBIDYuMTggNi4xOCAwLjAgMCAwIDczLjAxIDYyLjE2CiAgQSA2LjE4IDYuMTggMC4wIDAgMCA3OS4xOSA1NS45OAogIFoiCi8+CjxyZWN0IGZpbGw9IiMwMDAwMDAiIHg9IjU3LjAwIiB5PSIxMDkuMDAiIHdpZHRoPSIzMS4wMCIgaGVpZ2h0PSI3LjAwIiByeD0iMC42NCIvPgo8L3N2Zz4K");
                            }
                            .page-entry-front .options--top .options__main li:nth-child(1) a.active:hover::before {
                                background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNTYgMTQ2Ij4KPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iCiAgTSAxMTguNDcgNzUuMjEKICBRIDEyMS43MSA3Ny40MiAxMjEuNzcgODEuMDAKICBRIDEyMi4wMiA5NC44OSAxMjEuOTcgMTA4Ljc3CiAgQyAxMjEuOTYgMTEyLjQzIDEyMC41OSAxMTUuOTkgMTE2LjQ2IDExNi4wMAogIFEgODAuNTAgMTE2LjAxIDQ0LjU1IDExNS45OQogIFEgNDIuNjcgMTE1Ljk5IDQxLjYzIDExNC40MQogIFEgMzkuOTYgMTExLjg4IDM5Ljk3IDEwOC41MAogIFEgMzkuOTkgOTUuMTQgNDAuMDAgODEuNzgKICBDIDQwLjAxIDc1Ljg4IDQzLjk4IDc0LjAxIDQ5LjE4IDc0LjAxCiAgUSA1Ni43OSA3NC4wMCA2NC4yOCA3My45OQogIEEgMC43MiAwLjcyIDAuMCAwIDAgNjUuMDAgNzMuMjcKICBMIDY0Ljk5IDU2LjU0CiAgQSAwLjU0IDAuNTMgLTAuMCAwIDAgNjQuNDUgNTYuMDEKICBDIDYxLjQ2IDU2LjA0IDQzLjU0IDU3LjY1IDUyLjE0IDQ4LjU5CiAgUSA2NS44MCAzNC4xNyA3Ny45MiAyMy4xNQogIEMgODEuMDMgMjAuMzMgODIuNTkgMjIuMzQgODQuODEgMjQuNDUKICBRIDk3LjMyIDM2LjMzIDEwOS4xNyA0OC44NQogIEMgMTEyLjAxIDUxLjg1IDExMi40OCA1Ni4yOSAxMDYuNzcgNTYuMTEKICBRIDEwMi4xNCA1NS45NyA5Ny45MyA1Ni4wMwogIEEgMC45MSAwLjg5IC0wLjMgMCAwIDk3LjAzIDU2LjkyCiAgTCA5Ny4xMCA3My40MQogIEEgMC41MiAwLjUwIDAuMCAwIDAgOTcuNjIgNzMuOTEKICBMIDExNC41MyA3NC4wMAogIFEgMTE2Ljc0IDc0LjAyIDExOC40NyA3NS4yMQogIFoKICBNIDk4LjM1IDQ3LjkyCiAgQyA5My4xNyA0Mi4yOCA4Ny41NyAzNy4wNyA4Mi4wOSAzMS43MwogIEEgMS44NiAxLjgwIC00NS4zIDAgMCA3OS41MiAzMS43OQogIEwgNjMuNDYgNDcuOTgKICBRIDYyLjQyIDQ5LjAzIDYzLjgzIDQ4Ljk5CiAgTCA3MC40MiA0OC44MQogIEEgMS41NSAxLjQzIC0wLjggMCAxIDcyLjAxIDUwLjI0CiAgTCA3Mi4wNiAxMDguMzQKICBBIDAuNTIgMC41MCA5MC4wIDAgMCA3Mi41NiAxMDguODYKICBMIDg5LjQ1IDEwOC44NwogIEEgMC41MyAwLjUwIC05MC4wIDAgMCA4OS45NSAxMDguMzQKICBMIDg5Ljk4IDQ5Ljk5CiAgQSAwLjk3IDAuOTcgLTAuMyAwIDEgOTAuOTQgNDkuMDIKICBMIDk3Ljg5IDQ4Ljk4CiAgUSA5OS4zMiA0OC45NyA5OC4zNSA0Ny45MgogIFoKICBNIDY1LjAwIDgxLjkzCiAgQSAwLjkyIDAuOTIgMC4wIDAgMCA2NC4wOCA4MS4wMQogIEwgNDcuOTIgODEuMDEKICBBIDAuOTIgMC45MiAwLjAgMCAwIDQ3LjAwIDgxLjkzCiAgTCA0Ny4wMCAxMDguMDkKICBBIDAuOTIgMC45MiAwLjAgMCAwIDQ3LjkyIDEwOS4wMQogIEwgNjQuMDggMTA5LjAxCiAgQSAwLjkyIDAuOTIgMC4wIDAgMCA2NS4wMCAxMDguMDkKICBMIDY1LjAwIDgxLjkzCiAgWgogIE0gMTE1LjAwIDgxLjcwCiAgQSAwLjcwIDAuNzAgMC4wIDAgMCAxMTQuMzAgODEuMDAKICBMIDk3LjcwIDgxLjAwCiAgQSAwLjcwIDAuNzAgMC4wIDAgMCA5Ny4wMCA4MS43MAogIEwgOTcuMDAgMTA4LjMwCiAgQSAwLjcwIDAuNzAgMC4wIDAgMCA5Ny43MCAxMDkuMDAKICBMIDExNC4zMCAxMDkuMDAKICBBIDAuNzAgMC43MCAwLjAgMCAwIDExNS4wMCAxMDguMzAKICBMIDExNS4wMCA4MS43MAogIFoiCi8+Cjwvc3ZnPgo=");
                                opacity: 0.7;
                                transition: 0.2s;
                            }
                            .page-entry-front .options--top .options__main li:nth-child(2) a.active:hover::before {
                                background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNDAgMTQwIj4KPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iCiAgTSA3Mi41NSAxOS44MwogIEMgOTMuNDIgMzEuNDEgMTEzLjI4IDUxLjA1IDExNC4yNSA3Ni40OQogIEMgMTE0LjkxIDkzLjYwIDEwMy4yMSAxMDcuNjkgODcuMzcgMTEzLjU1CiAgQyA3MS41MCAxMTkuNDIgNTMuMzYgMTE2Ljk1IDQwLjM5IDEwNS45NAogIEMgMTcuNjggODYuNjYgMjYuNDUgNTYuMjYgNDQuNDUgMzcuOTQKICBRIDU1LjQ1IDI2Ljc1IDY4LjE3IDE5LjgyCiAgUSA3MC4zNiAxOC42MiA3Mi41NSAxOS44MwogIFoKICBNIDEwNi43MSA3NC41OAogIEMgMTA1LjE1IDU0LjU0IDg3LjI2IDM3LjA1IDcwLjY5IDI3LjQ3CiAgQSAwLjg2IDAuODIgLTQ0LjIgMCAwIDY5LjgzIDI3LjQ4CiAgUSA1NS4xOCAzNi4yMiA0NC41NCA0OS41NAogIEMgMzEuNjYgNjUuNjYgMjguODAgODkuNTkgNDguMTIgMTAyLjUwCiAgUSA0OC41NCAxMDIuNzcgNDguMzggMTAyLjMwCiAgQyA0Mi41NCA4NC4zMyA1Mi42NyA2Ni4zOCA2OC4yNSA1Ny40NgogIFEgNzAuMzcgNTYuMjUgNzIuNDMgNTcuNTUKICBDIDg2LjQ2IDY2LjQwIDk5LjgyIDg0LjgwIDkxLjk4IDEwMi4yNAogIFEgOTEuMzUgMTAzLjYzIDkyLjcwIDEwMi42NgogIFEgMTA4LjA0IDkxLjYyIDEwNi43MSA3NC41OAogIFoKICBNIDg0LjQ1IDgxLjgzCiAgQyA4MS45NSA3Ni4xOCA3Ni41NiA2OC4wNyA3MC40OCA2NS40MgogIEEgMC45MiAwLjkwIC01MC4zIDAgMCA2OS42MCA2NS41MQogIEMgNjIuMjIgNzAuNzIgNTUuMjkgNzkuNTEgNTMuOTggODguNjIKICBDIDUyLjQzIDk5LjM2IDU5LjY3IDEwOS43MiA3MS4xMCAxMDkuMzEKICBRIDc2LjUwIDEwOS4xMSA4MC42OCAxMDUuNjQKICBDIDg4LjA4IDk5LjQ4IDg4LjIxIDkwLjMzIDg0LjQ1IDgxLjgzCiAgWiIKLz4KPC9zdmc+Cg==");
                                opacity: 0.7;
                                transition: 0.2s;
                            }
                            .page-entry-front .options--top .options__main li:nth-child(3) a.active:hover::before {
                                background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNDAgMTQwIj4KPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iCiAgTSAxMDguMzMgNjkuMDUKICBDIDExMS4yNSA3MS40NCAxMTcuMjkgNzYuNTQgMTE2LjkxIDgwLjU3CiAgQyAxMTYuMjUgODcuNTAgMTA1LjY4IDg3LjI5IDEwMC40NyA4OC4xNgogIEEgMC41NiAwLjU2IDgzLjggMCAwIDEwMC4wMCA4OC43NQogIEMgMTAwLjI3IDkzLjE5IDEwMS43MyA5OS4zMyAxMDEuMTggMTAyLjc3CiAgQyA5OS43NiAxMTEuNzAgODYuNzQgMTA0LjUyIDgyLjIzIDEwMi4wMgogIEEgMC44MSAwLjc5IDI4LjYgMCAwIDgxLjEzIDEwMi4zMwogIEwgNzUuMjcgMTEzLjM0CiAgQSAxLjgwIDEuNTggLTg4LjAgMCAxIDc0LjYxIDExNC4wNAogIEMgNjUuODIgMTE4Ljk0IDYyLjk4IDEwOC42NCA1OS41OCAxMDMuMjUKICBRIDU4LjUyIDEwMS41NSA1Ni43OSAxMDIuNTYKICBDIDUyLjUyIDEwNS4wNiA0My40OSAxMTAuNTQgMzkuODggMTA0LjI5CiAgQyAzOC4xMCAxMDEuMjEgNDAuMjIgOTIuNDIgNDAuNzEgODguNzgKICBBIDAuNTMgMC41MSA4LjEgMCAwIDQwLjI3IDg4LjIxCiAgQyAzNi42NiA4Ny42NyAyNy4wOSA4Ni43MCAyNC44NiA4My43OAogIEMgMjAuODYgNzguNTYgMjkuMDEgNzAuODAgMzIuNzkgNjcuODMKICBBIDAuODYgMC44NSA1MS4yIDAgMCAzMi45MiA2Ni42MQogIEMgMjkuMDggNjIuMDEgMjAuMTkgNTUuMzMgMjUuNDUgNDguOTAKICBBIDEuNzMgMS40NyA4LjYgMCAxIDI2LjI3IDQ4LjM5CiAgUSAzMy4wMiA0Ni41NyAzOS45NCA0NS44OAogIEEgMC44NCAwLjg0IC03LjQgMCAwIDQwLjY5IDQ0LjkxCiAgUSAzOS45MSAzOS43NiAzOS4zMSAzNC4yNAogIEMgMzguNDcgMjYuNTUgNDMuODMgMjQuNzQgNDkuNTYgMjcuNzEKICBRIDUzLjkwIDI5Ljk2IDU4LjUwIDMxLjU4CiAgQSAwLjYzIDAuNjIgLTYzLjkgMCAwIDU5LjI0IDMxLjMyCiAgQyA2Mi41OCAyNS43NyA2NS4xNSAxNS41OSA3NC4yMiAxOS42MgogIEEgMS42MyAxLjQ0IDg0LjUgMCAxIDc0LjkzIDIwLjI4CiAgTCA4MS40NSAzMS42NgogIEEgMC41NCAwLjUyIC0yNy4zIDAgMCA4Mi4xNSAzMS44NwogIEMgODUuOTYgMzAuMDIgOTEuNTggMjYuMzkgOTUuNTMgMjYuNDQKICBDIDEwNC4zNiAyNi41NCAxMDAuNTAgMzkuODcgOTkuOTggNDQuNzYKICBBIDEuMTcgMS4xNiAtODUuMCAwIDAgMTAxLjA1IDQ2LjA0CiAgQyAxMDQuOTkgNDYuMzUgMTEyLjc2IDQ2Ljc5IDExNS40MCA0OS44MQogIEMgMTIwLjIxIDU1LjI5IDExMi4wMSA2Mi4xNSAxMDguMzQgNjUuMTYKICBRIDEwNS45NyA2Ny4xMCAxMDguMzMgNjkuMDUKICBaCiAgTSA0NS45OCA1MS4zOQogIFEgMzkuOTAgNTMuOTcgMzMuMjIgNTMuODkKICBBIDEuMDUgMC42NiAxMC40IDAgMCAzMi40MCA1NC4yMgogIFEgMzIuMjUgNTQuNDQgMzIuMjMgNTQuNzAKICBBIDEuMTYgMC42NyAyOS4xIDAgMCAzMi43MCA1NS40OQogIEMgMzcuMjggNTkuMDUgNDQuOTEgNjUuODUgNDAuMzAgNzEuMDYKICBRIDM2Ljc5IDc1LjAzIDMyLjkyIDc4LjY4CiAgUSAzMS42NiA3OS44OCAzMy41NyA3OS45MwogIFEgMzkuMDkgODAuMDggNDQuNDQgODEuNjAKICBDIDUwLjQxIDgzLjMwIDQ3LjQ2IDkzLjUwIDQ2Ljk4IDk4LjAyCiAgUSA0Ni44NyA5OS4wOSA0Ny44MyA5OC42MQogIFEgNTIuMTUgOTYuNDIgNTcuMDIgOTQuNTcKICBDIDY0LjU5IDkxLjY5IDY2Ljg0IDEwMC42NiA2OS40OSAxMDUuNDkKICBRIDcwLjI0IDEwNi44NSA3MC45NCAxMDUuNDcKICBDIDczLjc3IDk5LjkzIDc2Ljc1IDkxLjExIDg0LjQ5IDk0Ljc1CiAgUSA4OC43MSA5Ni43MyA5Mi42MCA5OC44NAogIFEgOTQuMDMgOTkuNjEgOTMuNzUgOTguMDEKICBRIDkyLjk1IDkzLjUxIDkyLjI2IDg4Ljk5CiAgQyA5MC45OCA4MC43MSAxMDIuMTUgODAuMTEgMTA3LjQyIDc5Ljk2CiAgUSAxMDguMjQgNzkuOTQgMTA3LjcyIDc5LjMwCiAgUSAxMDMuOTEgNzQuNjEgOTkuODIgNzAuMTkKICBDIDk1LjgzIDY1Ljg4IDEwNC44MSA1OC4wMiAxMDcuNjMgNTQuOTEKICBRIDEwOC41MyA1My45MSAxMDcuMTkgNTMuODQKICBDIDEwMi41OCA1My41OSA5NC40MyA1My42OCA5Mi42NSA0OC4zNQogIEMgOTEuNjQgNDUuMzQgOTMuMDIgMzkuNTggOTMuNzQgMzUuOTgKICBRIDk0LjExIDM0LjE4IDkyLjUzIDM1LjEzCiAgQyA4OS40OSAzNi45NyA4Mi44NSA0MC43MiA3OS4yNSAzOS42NgogIEMgNzUuMDIgMzguNDEgNzIuNjYgMzEuMzUgNzAuOTggMjcuNzYKICBRIDcwLjIyIDI2LjE1IDY5LjUzIDI3Ljc5CiAgQyA2OC4xOCAzMC45OCA2NC45OCAzOC41MyA2MS41NyAzOS43NgogIEMgNTcuOTggNDEuMDYgNTEuMjYgMzYuNjggNDguMDAgMzQuOTcKICBBIDAuNzEgMC43MSAtNzYuOSAwIDAgNDYuOTYgMzUuNjIKICBDIDQ3LjA5IDQwLjgxIDQ5LjQzIDQ1LjgzIDQ2LjY5IDUwLjc1CiAgQSAxLjQ4IDEuNDMgMi4xIDAgMSA0NS45OCA1MS4zOQogIFoiCi8+Cjwvc3ZnPgo=");
                                opacity: 0.7;
                                transition: 0.2s;
                            }
                            .page-entry-front .options--top .options__main li:nth-child(4) a.active:hover::before {
                                background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNDAgMTQwIj4KPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iCiAgTSA1MC42OSA1MS45NAogIEMgNTUuMDUgNDcuNjMgNTkuNTUgNDIuODAgNjUuMzcgNDguMDgKICBRIDY5Ljg2IDUyLjE2IDczLjkyIDU2LjU5CiAgQSAxLjQwIDEuMzkgNDYuMyAwIDAgNzUuOTQgNTYuNjQKICBMIDgzLjgwIDQ4Ljc4CiAgQSAwLjk5IDAuOTggNDQuMCAwIDAgODMuNzcgNDcuMzYKICBDIDgxLjQwIDQ1LjE1IDc1Ljg3IDQwLjU1IDc3LjUzIDM2LjkxCiAgQyA3OS40NSAzMi43MCA4NC44OCAzNC4wNCA4OC41MCAzNC4wMgogIFEgMTAxLjEwIDMzLjkzIDExMy42OSAzNC4wOAogIFEgMTE4LjgyIDM0LjE0IDExOC44NiAzOS4wNgogIFEgMTE4Ljk5IDU0LjI2IDExOS4wMyA2OS40NgogIEMgMTE5LjA0IDcyLjc0IDExNy44MSA3NS44NiAxMTQuMDIgNzUuMDkKICBDIDExMS4xNyA3NC41MSAxMDcuODEgNzAuMjQgMTA1LjUwIDY4LjAzCiAgQSAwLjg0IDAuODQgNDQuMCAwIDAgMTA0LjMyIDY4LjA1CiAgUSA5My42OSA3OC45OCA4Mi43NyA4OS42MQogIFEgNzkuMjIgOTMuMDcgNzcuMjMgOTMuNjkKICBDIDcxLjEwIDk1LjYyIDY0LjM1IDg3LjE4IDYwLjUyIDgzLjAzCiAgQSAwLjY3IDAuNjcgNDUuNiAwIDAgNTkuNTUgODMuMDIKICBDIDU1LjQ0IDg3LjI4IDQ1LjQxIDk4Ljk2IDQwLjAxIDEwMC4yMAogIEEgMS41MSAxLjQ5IDUwLjcgMCAxIDM5LjA2IDEwMC4xMAogIEMgMzMuNzcgOTcuNjUgMjguMTcgOTAuOTkgMjQuMzQgODYuNTkKICBDIDIxLjg0IDgzLjczIDIyLjI4IDgwLjMyIDI0Ljc3IDc3Ljc3CiAgUSAzMS4wOCA3MS4zMCA1MC42OSA1MS45NAogIFoKICBNIDk0LjQwIDQ2Ljc4CiAgQSAxLjY0IDEuNTIgNDMuNiAwIDEgOTQuNTQgNDkuMDEKICBRIDg1LjQ3IDU4LjUwIDc1LjQ5IDY3LjAyCiAgQSAwLjcxIDAuNjkgLTQyLjUgMCAxIDc0LjU0IDY2Ljk5CiAgTCA2MS43MiA1NC4zMQogIEEgMS41NCAxLjQ4IDQ1LjUgMCAwIDU5LjYyIDU0LjI1CiAgTCAzMS43NyA4MC41NAogIFEgMzAuMzUgODEuODkgMzEuNzAgODMuMTkKICBMIDM5LjcwIDkwLjg5CiAgQSAxLjI2IDEuMjIgLTQ1LjMgMCAwIDQxLjQyIDkwLjg1CiAgTCA1OS4wOCA3My40NQogIEEgMS41MCAxLjM5IC00NS43IDAgMSA2MS4wNyA3My4zNQogIEwgNzQuNzAgODYuMDgKICBBIDAuOTggMC45MiA0Ni4zIDAgMCA3NS45NSA4Ni4xNQogIEMgNzcuMzggODQuOTkgNzguOTIgODMuODEgODAuMjEgODIuNDYKICBRIDkxLjg2IDcwLjI0IDEwNC4wOCA1OC41NgogIEEgMS4yOSAxLjI5IC05MC4wIDAgMSAxMDUuODYgNTguNTYKICBMIDExMS4yNSA2My43OAogIFEgMTExLjk5IDY0LjUwIDExMS45OSA2My40NwogIEwgMTEyLjAwIDQxLjUwCiAgQSAwLjUwIDAuNTAgMC4wIDAgMCAxMTEuNTAgNDEuMDAKICBMIDkwLjI0IDQxLjAwCiAgUSA4OC4zNSA0MS4wMCA4OS42NyA0Mi4yNgogIEwgOTQuNDAgNDYuNzgKICBaIgovPgo8L3N2Zz4K");
                                opacity: 0.7;
                                transition: 0.2s;
                            }
                            .page-entry-front .options--top .options__main li:nth-child(5) a.active:hover::before {
                                background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNDAgMTQwIj4KPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iCiAgTSA0MS4zMCA2NC45NAogIFEgNDIuMDYgNjEuNTkgNDIuMTkgNTguMTUKICBDIDQyLjg2IDQwLjMwIDU1LjY0IDI1LjIwIDcxLjI4IDE3LjcxCiAgUSA3Mi45NiAxNi45MSA3NC42NSAxNy43MAogIFEgOTUuMjYgMjcuNDcgMTAxLjY1IDQ5LjQxCiAgQyAxMDIuOTUgNTMuODcgMTAzLjQ0IDU5LjA4IDEwNC4wMCA2My45NgogIEEgMS43NyAxLjc2IDYuMSAwIDAgMTA1LjE4IDY1LjQyCiAgQyAxMTkuMTYgNzAuMTcgMTIwLjE4IDg0LjUyIDExOS4xNiA5Ny4xOAogIEMgMTE4LjUwIDEwNS4zNSAxMTIuNzIgMTA0Ljk4IDEwNS42NyAxMDQuOTkKICBRIDY5LjkzIDEwNS4wNSAzNC4xOSAxMDQuOTQKICBDIDI4Ljk4IDEwNC45MyAyNi45NCAxMDIuODMgMjYuOTggOTcuNTgKICBRIDI3LjA1IDkwLjE1IDI2Ljk3IDgyLjc3CiAgQyAyNi44NyA3NC4wMCAzMi4yMiA2Ny42OSA0MC43MSA2NS41NQogIEEgMC44MiAwLjgwIDg5LjUgMCAwIDQxLjMwIDY0Ljk0CiAgWgogIE0gNDkuMTkgNTkuNDQKICBRIDQ4LjcxIDc0Ljk2IDQ5LjEyIDk2LjM4CiAgQSAwLjUzIDAuNTEgODkuNCAwIDAgNDkuNjMgOTYuOTAKICBMIDk2LjMxIDk2LjkwCiAgQSAwLjUzIDAuNTMgLTg4LjkgMCAwIDk2Ljg0IDk2LjM5CiAgUSA5Ny40MiA4Mi4xNyA5Ni43MCA2Ny45OAogIEMgOTUuNzUgNDkuMTUgOTEuMjUgMzYuODggNzUuNDUgMjYuNTEKICBRIDczLjAzIDI0LjkyIDcwLjQ4IDI2LjMwCiAgQyA1OS41NiAzMi4xOSA0OS41OSA0Ni4zNyA0OS4xOSA1OS40NAogIFoKICBNIDQwLjgwIDczLjA4CiAgQyAzMi4yOSA3NS4zMCAzMy45MSA4OC4zMSAzNC4wMiA5Ni4wNAogIEEgMC42NyAwLjY2IC04My4wIDAgMCAzNC41MSA5Ni42NwogIFEgMzcuODYgOTcuNTEgNDEuNDYgOTYuNzMKICBBIDAuNjQgMC42MiA4My44IDAgMCA0MS45NCA5Ni4xMQogIEwgNDEuOTkgNzMuOTkKICBBIDAuOTUgMC45NCAtNy40IDAgMCA0MC44MCA3My4wOAogIFoKICBNIDEwNS42OSA3My43MgogIFEgMTA0LjAxIDcyLjUzIDEwNC4wMSA3NC41OAogIEwgMTA0LjAwIDk2LjI2CiAgQSAwLjcxIDAuNjkgOTAuMCAwIDAgMTA0LjY5IDk2Ljk3CiAgTCAxMTAuOTkgOTYuOTcKICBBIDEuMDAgMC45NyAtODguNCAwIDAgMTExLjk2IDk2LjAyCiAgUSAxMTIuMzAgODguNjEgMTExLjE1IDgxLjMzCiAgUSAxMTAuNDggNzcuMTEgMTA1LjY5IDczLjcyCiAgWiIKLz4KPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iCiAgTSA4Ni41MiA1NS45OQogIEEgMTMuNzAgMTMuNzAgMC4wIDAgMSA3Mi44MiA2OS42OQogIEEgMTMuNzAgMTMuNzAgMC4wIDAgMSA1OS4xMiA1NS45OQogIEEgMTMuNzAgMTMuNzAgMC4wIDAgMSA3Mi44MiA0Mi4yOQogIEEgMTMuNzAgMTMuNzAgMC4wIDAgMSA4Ni41MiA1NS45OQogIFoKICBNIDc5LjE5IDU1Ljk4CiAgQSA2LjE4IDYuMTggMC4wIDAgMCA3My4wMSA0OS44MAogIEEgNi4xOCA2LjE4IDAuMCAwIDAgNjYuODMgNTUuOTgKICBBIDYuMTggNi4xOCAwLjAgMCAwIDczLjAxIDYyLjE2CiAgQSA2LjE4IDYuMTggMC4wIDAgMCA3OS4xOSA1NS45OAogIFoiCi8+CjxyZWN0IGZpbGw9IiMwMDAwMDAiIHg9IjU3LjAwIiB5PSIxMDkuMDAiIHdpZHRoPSIzMS4wMCIgaGVpZ2h0PSI3LjAwIiByeD0iMC42NCIvPgo8L3N2Zz4K");
                                opacity: 0.7;
                                transition: 0.2s;
                            }
                            p code {
                                padding: 4px 6px;
                                font-size: .8em;
                                white-space: normal;
                                background: #272822;
                                color: #f0f0ea;
                                font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace;
                                word-spacing: normal;
                                word-break: break-all;
                                word-wrap: normal;
                                line-height: 1.5;
                                -moz-tab-size: 4;
                                -o-tab-size: 4;
                                tab-size: 4;
                                -webkit-hyphens: none;
                                -moz-hyphens: none;
                                -ms-hyphens: none;
                                hyphens: none;
                            }
                            aside#options.options.options--top menu.options__main li a:not( div#middle.page-entry-front div.kbin-container main#main aside#options.options.options--top menu.options__main li a) {
                                padding-left: 15px;
                            }
                            html body.theme--dark.rounded-edges.fixed-navbar.extend-width.subscription-panel-hide-on-collapse div#middle.page-entry-front div.kbin-container main#main.view-compact aside#options.options.options--top menu.options__main li a {
                                padding-left: 40px;
                            }
                        
                            menu.options__main li * {
                                background-color: #232324!important;
                            }
                            menu.options__main li *:hover {
                                background-color: #101010!important;
                                transition: 0.2s;
                            }
                            menu.options__main li a.active {
                                background-color: #0f0f0f!important;
                            }
                            .options__main li a.active:hover {
                                color: #a09f9f!important;
                                transition: 0.2s;
                            }
                        
                            .options__main li a.active {
                                color: #d5e0e3;
                            }
                            .options__main li.active {
                                color: #d5e0e3;
                            }
                            #sidebar .options menu li a {
                                background-color: #232324!important;
                            }
                            #sidebar .options menu li a:hover {
                                background-color: #101010!important;
                                transition: 0.2s;
                            }
                        }
                        @-moz-document regexp("^(?:http:\\/\\/|https:\\/\\/)?(?:kbin.social\\/)(?:\\/)?m\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)"),
                        regexp("^(?:http:\\/\\/|https:\\/\\/)?(?:karab.in\\/)(?:\\/)?m\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)"),
                        regexp("^(?:http:\\/\\/|https:\\/\\/)?(?:fedia.io\\/)(?:\\/)?m\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)") {
                            article.entry,
                            .options:not(.options--top) {
                                border: 5px;
                        
                                margin-bottom: 8px;
                                background-color: #1a1a1b;
                            }
                            article.entry {
                                border-radius: 4px 4px 0 0;
                                order: 1;
                                background-color: #1a1a1b;
                            }
                            .options:not(.options--top,
                            .options-activity) {
                                border-radius: ;
                                border-top: var(--kbin-section-border);
                            }
                        }
                        .options.options--top {
                            padding: 0;
                            margin-top: -05px;
                            margin-bottom: 15px;
                            margin-right: 10px;
                        }
                        
                        aside#sidebar section.magazines.section.related-magazines {
                            margin-right: 10px;
                        }
                        
                        div.sidebar-options div#federation.section {
                            margin-right: 10px;
                            background-color: #1a1a1b;
                            padding: 10px;
                        }
                        
                        aside#sidebar section.section.user-info {
                            margin-right: 10px;
                        }
                        
                        div#middle.page-magazines.page-settings div.kbin-container main#main div.section {
                            margin-right: 10px;
                            background-color: #1a1a1b;
                            border: 0px;
                        }
                        
                        div#middle.page-magazines.page-settings div.kbin-container main#main div#content {
                            margin-right: 0px;
                        }
                        
                        div#middle.page-magazines.page-settings div.kbin-container main#main div#content nav.pagination.section {
                            margin-right: 10px;
                            border: 0px;
                        }
                        
                        div.users.users-cards.section.section--no-bg.section--no-border div.section div.user-box div.with-cover.with-avatar div#content.user-main {
                            margin-right: 23px;
                        }
                        
                        div#content div.users.users-cards.section.section--no-bg.section--no-border div.section {
                            background-color: #1a1a1b;
                            border: 0px;
                        }
                        
                        div.users.users-cards.section.section--no-bg.section--no-border div.section div.user-box div.with-cover.with-avatar div#content.user-main div div.row figure img {
                            border-color: #62636321;
                            border-radius: 3px;
                            border-width: 0.5px;
                        }
                        
                        html body.theme--dark.fixed-navbar div#middle.page-post-front div.kbin-container main#main section.section.section--top {
                            margin-right: 10px;
                            border: 0px;
                        }
                        
                        html body.theme--dark.fixed-navbar div#middle.page-post-front div.kbin-container main#main aside#options.options {
                            margin-right: 10px;
                        }
                        
                        div#middle.page-user.page-user-overview div.kbin-container main#main div.section.section--top {
                            margin-right: 10px;
                            background-color: #1a1a1b;
                            border: 0px;
                        }
                        
                        div#middle.page-user.page-user-overview div.kbin-container main#main aside#options.options {
                            margin-right: 10px;
                        }
                        
                        div#middle.page-user.page-user-overview div.kbin-container main#main div.section.section--top div.user-box div.with-cover.with-avatar div#content.user-main {
                            margin-right: 23px;
                        }
                        
                        div#middle.page-user.page-user-overview div.kbin-container main#main div.section.section--top div.user-box div.with-cover.with-avatar div#content.user-main div div.row figure {
                            padding-top: 10px;
                        }
                        
                        
                        
                        
                        div#middle.page-user.page-user-overview div.kbin-container main#main div.section.section--top div.user-box div.with-cover.with-avatar div#content.user-main div div.row figure img {
                            border-color: #62636357;
                            border-radius: 3px;
                            border-width: 2px;
                        }
                        
                        div#middle.page-user.page-user-overview div.kbin-container main#main div.section.section--top div.user-box div.with-cover.with-avatar div#content.user-main div aside.user__follow {
                            padding-bottom: 10px;
                        }
                        
                        main#main div#content {
                            margin-right: 10px;
                        }
                        
                        aside#sidebar section.posts.section {
                            margin-right: 10px;
                        }
                        
                        aside#sidebar section.entries.section {
                            margin-right: 10px;
                        }
                        
                        aside#options.options menu.options__main {
                            margin-bottom: 5px!important;
                            border-width: 1px!important;
                            border-color: white!important;
                        }
                        
                        div.sidebar-options div#settings.section {
                            margin-right: 10px;
                        }
                        
                        aside#sidebar section.section.active-users {
                            margin-right: 10px;
                        }
                        
                        
                        aside#activity.options.options-activity {
                            margin-bottom: -5px;
                            margin-top: -20px;
                            border-width: 0px!important;
                            border-radius: 0px;
                        }
                        
                        .section.comment.entry-comment.subject.comment {
                            border-width: 1px!important;
                            border-radius: 0px;
                        }
                        
                        /*Boost page*/
                        div#middle.page-entry-voters div.kbin-container main#main div#content div#content div.section.users.users-columns {
                            margin-right: -10px;
                            margin-top: -5px;
                        }
                        
                        
                        html body.theme--dark.rounded-edges.fixed-navbar div#middle.page-entry-single div.kbin-container main#main div#content article.entry.section.subject.entry--single.section--top {
                            border-radius: 0px!important;
                        }
                        
                        html body.theme--dark.rounded-edges.fixed-navbar div#middle.page-entry-single div.kbin-container main#main div#content aside#activity.options.options-activity {
                            border-radius: 0px!important;
                            z-index:2;
                        }
                        
                        html body.theme--dark.rounded-edges.fixed-navbar div#middle.page-entry-single div.kbin-container main#main div#content div#comment-add.section {
                            border-radius: 0px!important;
                        }
                        
                        html body.theme--dark.rounded-edges.fixed-navbar div#middle.page-entry-single div.kbin-container main#main div#content aside#options.options {
                            border-radius: 0px!important;
                        }
                        
                        .entry--single.section--top {
                            top: -5px;
                        }
                        
                        .options.options--top menu.options__main {
                            margin-top: 35px;
                        }
                        
                        main#main aside#options.options.options--top {
                            height: 56px;
                        }
                        
                        div#middle.page-entry-single div.kbin-container main#main div#content aside#options.options {
                            margin-bottom: -5px;
                            border-width: 0px!important;
                            border-radius: 0px;
                        }
                        
                        html body.theme--dark.fixed-navbar div#middle.page-entry-single div.kbin-container aside#sidebar {
                            margin-right: 10px;
                        }
                        
                        aside#sidebar section.section.entry-info {
                            margin-right: 10px!important;
                        }
                        
                        aside#sidebar section.magazine.section {
                            margin-right: 10px!important;
                        }
                        
                        aside#sidebar section.user-list.section {
                            margin-right: 10px!important;
                        }
                        
                        div.kbin-container div#content:not(div#middle.page-search.page-settings div.kbin-container main#main div#content) {
                            display: grid;
                        }
                        #activity {
                            order: 2;
                        }
                        .options {
                            order: 4;
                            z-index: 3;
                        }
                        
                        #comment-add {
                            order: 3;
                            background-color: #1a1a1b;
                        }
                        #entry_comment_body {
                            background-color: #0d0d0d;
                        }
                        #comments {
                            order: 5;
                        }
                        .options:not(#activity) > .options__main:before {
                            content: 'Sort by:';
                            display: block;
                            margin-right: 8px;
                            color: #bcb8b8;
                        }
                        .sidebar-options {
                            align-items: center;
                            border: var(--kbin-section-border);
                            background: var(--kbin-options-bg);
                            border-radius: 4px;
                            padding: 10px 12px;
                            height: auto;
                        }
                        #comment-add {
                            margin: 0;
                            border: 0;
                            padding-top: .5rem;
                        }
                        
                        
                        div#middle.page-entry-voters div.kbin-container main#main div#content div#content div.section.users.users-columns {
                            background-color: #282828;
                            border: 0px;
                        }
                        
                        
                        form[name="entry_comment"] > div {
                            margin-bottom: 0;
                            line-height: 0;
                        }
                        form[name="entry_comment"] {
                            display: grid;
                            grid-template-areas: "a a a a" "b b c c";
                            border: var(--kbin-section-border);
                            border-radius: 4px;
                        }
                        form[name="entry_comment"] > div {
                            order: 1;
                            grid-area: a;
                        }
                        form[name="entry_comment"] > div > textarea {
                            border: 0;
                        }
                        form[name="entry_comment"] > markdown-toolbar {
                            order: 2;
                            width: fit-content;
                            flex-direction: row;
                            grid-area: b;
                        }
                        form[name="entry_comment"] > markdown-toolbar * {
                            display: flex;
                            align-items: center;
                        }
                        form[name="entry_comment"] > .row.actions {
                            order: 3;
                            flex-direction: row;
                            grid-area: c;
                            padding: .5rem;
                        }
                        form[name="entry_comment"] > .row.actions > ul > li > .btn {
                            padding: 4px 20px 4px 20px;
                            height: 100%;
                        }
                        #entry_comment_submit {
                            padding: 4px 20px 4px 20px;
                            border-radius: 20px;
                        }
                        #entry_comment_submit:hover {
                            opacity: 0.8;
                            transition: 0.3s;
                        }
                        form[name="entry_comment"] > .row.actions select {
                            padding: 4px 20px 4px 20px;
                            height: 100%;
                        }
                        .section.comment figure {
                            margin-left: 4px;
                        }
                        .section.comment {
                            border-right: 0;
                            border-top: 0;
                            background-color: #1a1a1b;
                        }
                        .section.comment figure:before {
                            /* content: ' '; */
                            display: block;
                            background-color: var(--newCommunityTheme-line);
                            width: 2px;
                            height: 75%;
                            position: absolute;
                            left: 4px;
                        }
                        #main {
                            border: #1a1a1b;
                            padding: 0;
                            border-radius: 4px;
                        }
                        #middle #main {
                            padding: 0;
                            height: fit-content;
                        }
                        
                        
                        .pagination {
                            margin-bottom: 0;
                        }
                        #main > .options--top {
                            align-items: center;
                            border: #1a1a1b;
                            border-radius: 4px;
                            padding: 10px 12px;
                            height: auto;
                        }
                        .sidebar-options[data-controller="options"] {
                            background: transparent;
                            border: 0;
                            padding: 0;
                        }
                        #sidebar > .sidebar-options > .options.options--top {
                            align-items: center;
                            border: #1a1a1b;
                            border-radius: 4px;
                            padding: 10px 12px;
                            height: auto;
                            background-color: #1a1a1b;
                        }
                            `
                            document.getElementsByTagName('head')[0].appendChild(style);
                        }
                    }
                    else {
                        if (!document.body.classList.contains("theme--light") && items.themeLight == 1) {
                            document.querySelector("div.theme.light").click();
                        }
                        if (!document.body.classList.contains("theme--solarized-light") && items.themeLight == 2) {
                            document.querySelector("div.theme.solarized-light").click();
                        }
                    }
                }
            }
        }
    );
}

function openURLsInNewTab() {
    chrome.storage.sync.get(
        { instance: 'instance', openInNewTab: true },
        (items) => {
            var instance = items.instance;
            var openInNewTab = items.openInNewTab;
            if (openInNewTab == true) {
                if (window.location.href.startsWith(`https://${instance}/m/`)) {
                    document.querySelectorAll("a").forEach((link) => {
                        if (!link.href.startsWith(`https://${instance}`)) {
                            link.target = "_blank";
                        }
                    }
                    );
                }
            }
        }
    );
}

function useBetterPageNavigation() {
    chrome.storage.sync.get(
        { instance: 'instance', useBetterPageNavigation: true },
        (items) => {
            var instance = items.instance;
            var useBetterPageNavigation = items.useBetterPageNavigation;
            if (useBetterPageNavigation == true) {
                if (window.location.href.startsWith(`https://${instance}`)) {
                    var style = document.createElement('style');
                    style.type = 'text/css';
                    style.innerHTML = `
                    :root {
                        --current-page-color: var(--kbin-header-text-color);   /* ⟹ changes the color of the current page number ⟸ */
                        --other-page-color: var(--kbin-meta-text-color);  /* ⟹ changes the color of the other page numbers ⟸ */
                    }
                    
                    .pagination .pagination__item--current-page {
                        color: var(--current-page-color);
                        font-weight: bold;
                    
                    }
                    
                    .pagination__item:not(.pagination__item--current-page) {
                        color: var(--other-page-color);
                        font-weight: 400;
                    }
                    `
                    document.getElementsByTagName('head')[0].appendChild(style);
                }
            }
        }
    );
}

init();
autoChangeTheme();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    autoChangeTheme();
}
);
openURLsInNewTab();
useBetterPageNavigation();