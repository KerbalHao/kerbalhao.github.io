'use strict'
$(document).ready(function() {
    //用于debug
    const log = function() {
        console.log.apply(console, arguments)
    }
    //
    const appendHtml = function(selector, t) {
        $(selector).append(t)
    }
    //1点击展开的菜单

    //将展开详情的事件绑定在按钮
    const bindButton = function() {
        $('.toggle-button').on('click', function(event) {
            const target = $(event.target)
            const contents = target.next()
            contents.toggleClass('q')
        })
    }

    //将展开详情的事件绑定在a标签
    const bindLink = function() {
        $('.open').on('click', function(event) {
            const target = $(event.target)
            const contents = target.prev()
            contents.toggleClass('q')
            //提供收起功能
            if (contents.hasClass('q')) {
                target.text('收起')
            } else {
                target.text('展开')
            }
        })
    }

    //将组件1 的功能整合在一个函数，只提供一个出口
    const bindDetail = function(text, id) {
        const css = ` <style>
                        .hide {
                            display: none;
                        }
                        .content {
                            border: 1px solid red;
                            width: 60px;
                            height: 40px;
                            overflow: hidden;
                        }
                        .q {
                            width: auto !important;
                            /* height: : 50px; */
                            overflow: visible;
                            word-wrap: break-word;
                        }
                        .open {
                            display: inline-block;
                            font-size: xx-small;
                            color: blue;
                            cursor: pointer;
                            overflow: visible;
                        }
                    </style>`
        const container = `<div class='container' id=${id}>
                        </div>`
        const t = `<div class="details">
                            <button class="toggle-button">点击展开详情</button>
                            <div class="content">${text}
                            </div>
                            <a class='open'>...展开</a>
                        </div>`
        //为html增加标签和css
        appendHtml('head', css)
        appendHtml('body', container)
        appendHtml(`#${id}`, t)
        bindButton()
        bindLink()
    }

    // bindDetail('asdasdasdasdasda','container1')

    //2 鼠标划过高亮的菜单选择效果

    //绑定鼠标滑过的事件
    const bindPoint = function() {
        $('.Hightlightimg').mouseenter(function(event) {
            const target = $(event.target)
            target.toggleClass('point')
        })
        $('.Hightlightimg').mouseleave(function(event) {
            const target = $(event.target)
            target.toggleClass('point')
        })
    }

    const bindeHightlight = function(id) {
        const css = `<style >
                        #${id} {
                            display: inline;
                        }
                        #${id} img {
                            width:200px;
                            filter: grayscale(100%);
                        }
                        #${id}  .point {
                            filter: grayscale(0);
                            border: 1px red solid;
                            transition:width 1s, height 1s;
                            width:300px;
                        }



                    </style>`
        const container = `<div class='container' id=${id} >
                            </div>`
        const imgsHtml = `<img class='Hightlightimg' src="1.jpg" >
                          <img class='Hightlightimg' src="2.jpg" >
                          <img class='Hightlightimg' src="3.jpg">`
        appendHtml('body', container)
        appendHtml(`#${id}`, imgsHtml)
        appendHtml('head', css)
        bindPoint()
    }
    // bindeHightlight('container2')

    //3 点击切换图片的相册
    //绑定鼠标滑过缩略图的事件
    const bindMove = function() {
        $('.changedimg').mouseenter(function(event) {
            const target = $(event.target)
            target.toggleClass('move')
        })
        $('.changedimg').mouseleave(function(event) {
            const target = $(event.target)
            target.toggleClass('move')
        })
    }

    //绑定点击时切换图片事件
    const bindImgClick = function(button) {
        $('.changedimg').on('click', function(event) {
            //删除已显示的图片元素
            const imgbox = $('#imgbox')
            const img = imgbox.find('img')
            img.remove()
            //得到点击的图片的data-id
            const target = $(event.target)
            const id = target.data('id')
            //通过append显示点击的图片
            const n = `<img class='changedimg clicked' data-id='${id}' src='${id+1}.jpg'>`
            imgbox.append(n)

        })
    }

    //通过删除-插入的方法，提供上一张和下一张功能
    const bindButtonClick = function() {
        const numberOfImgs = $('#imgbox').siblings('img').length
        $('#next-changed').on('click', function(event) {
            // log(1)
            const target = $(event.target)
            const img = target.siblings('img')
            const nu = img.data('id')
            const id = (nu + 1) % numberOfImgs
            img.remove()
            const n = `<img class='changedimg clicked' data-id='${id}' src='${id+1}.jpg'>`
            $('#imgbox').append(n)
        })
        $('#prev-changed').on('click', function(event) {
            const target = $(event.target)
            const img = target.siblings('img')
            const nu = img.data('id')
            const id = (numberOfImgs + nu - 1) % numberOfImgs
            // log(id)
            img.remove()
            const n = `<img class='changedimg clicked' data-id='${id}' src='${id+1}.jpg'>`
            $('#imgbox').append(n)
        })
    }

    const bindChangeImg = function(id) {
        const button = `<button type="button" class="changedbutton" id='next-changed'>></button>
        <button type="button" class="changedbutton" id='prev-changed'><</button>`
        const css = `<style >
                    #next-changed {
                        right:0px;
                    }
                    #prev-changed {
                        left:0px;
                    }
                    .changedbutton{
                        z-index: 100;
                        position:absolute;
                        top: 50%;
                        height: 200px;
                        transform:translateY(-50%);
                    }
                    div#imgbox {
                        width: 720px;
                        height: 480px;
                        position:relative;
                    }
                    .changedimg {
                        width: 200px;
                        filter: grayscale(100%);
                        cursor: pointer;
                    }
                    #${id}  .move {
                        filter: grayscale(0);
                        border: 1px red solid;
                    }
                    #${id} .clicked {
                        width:720px;
                        height:480px;
                        filter:grayscale(0%);
                    }
                    </style>`
        const container = `<div class='container' id=${id} >
                            </div>`
        const imgsHtml = `<div id='imgbox'></div><img class='changedimg ' data-id='0' src="1.jpg" >
                            <img class='changedimg ' data-id='1' src="2.jpg" >
                            <img class='changedimg'  data-id='2' src="3.jpg">
                            <img class='changedimg'  data-id='3' src="4.jpg">`
        appendHtml('body', container)
        appendHtml(`#${id}`, imgsHtml)
        appendHtml('head', css)
        appendHtml('#imgbox', button)
        bindMove()
        bindImgClick(button)
        bindButtonClick()
    }

    // bindChangeImg('container3')

    //4 切换皮肤（主题）功能 （夜间模式）

    //通过点击按钮实现
    const changeedSkin = function() {
        $('.skin-button').on('click', function() {
            $('body').toggleClass('dark')
        })
    }

    const changSkin = function() {
        const css = `<style >
                        .dark {
                            width: 100%;
                            height: 100p%;
                            background-color: black;
                            opacity:0.5;
                        }
                    </style>`
        const container = `<div class='container' id=container4 >
                            </div>`
        const button = `<button type="button" class="skin-button">换肤</button>`
        const t = `<div class="skin">
                </div>  `
        appendHtml('head', css)
        appendHtml('body', container)
        appendHtml('#container4', t)
        appendHtml('.skin', button)
        changeedSkin()
    }
    // changSkin()

    //5 弹窗

    const activeAlert = function() {
        $('.active-button').on('click', function() {
            $('.mask').toggleClass('hide')
        })
    }

    const alertConfirm = function() {
        $('.confirm-button').on('click', function() {
            $('.mask').toggleClass('hide')
        })
    }

    const alertWindow = function(message) {
        const css = `<style >
                        #container5{
                            position:relative;
                            height:1000px;
                        }
                        .hide {
                            display:none;
                        }
                        .mask {
                            background-color: black;
                            position: absolute;
                            width:100%;
                            height:100%;
                        }
                        .mask .window {
                            background-color:lightblue;
                            left:50%;

                            text-align: center;
                            position: absolute;
                            width:300px;
                            height:200px;
                            top: 50%;
                            transform: translate(-50%, -50%);
                        }
                    </style>`
        const container = `<div class='container' id=container5 >
                            </div>`
        const button = `<button type="button" class="active-button">弹窗</button>`
        const t = `<div class="mask hide">
                        <div class='window'>
                            <div class='message'>${message}</div>
                            <button type="button" class="confirm-button">OK</button>
                        </div>
                    </div> `
        appendHtml('head', css)
        appendHtml('body', container)
        appendHtml('#container5', t)
        appendHtml('#container5', button)
        activeAlert()
        alertConfirm()
    }

    // alertWindow('alert')

    //6 轮播图组件 （todo:深究导航点与图片的同步显示问题）

    //绑定鼠标指向图片的事件：
    //指向图片时，停止图片和导航点滚动
    const pointImg = function() {
        $('.slideimg').on('mouseenter', function(event) {
            const target = $(event.target)
            const imgId = target.data('id')
            clearInterval(playImg)
        })
        //鼠标离开图片时，重新开始滚动
        $('.slideimg').on('mouseleave', function(event) {
            const target = $(event.target)
            // target.toggleClass('pointed')
            playImg = setInterval(playTheImg, 1000)
            playImgs()
        })
    }

    //绑定鼠标指向导航点的事件：
    //指向导航点时，显示该导航点导航的图片，改变导航点的css，
    //停止图片和导航点滚动
    const pointNav = function() {
        $('.nav').on('mouseenter', function(event) {
            const target = $(event.target)
            const navId = target.data('id')
            const pointedNav = $('.pointed')
            pointedNav.toggleClass('pointed')
            target.toggleClass('pointed')
            $('.active').toggleClass('active')
            clearInterval(playImg)
            const slideImgs = $('.slideimg')
            for (var i = 0; i < slideImgs.length; i++) {
                const showImg = $(slideImgs[i])
                if (showImg.data('id') == navId) {
                    showImg.toggleClass('active')
                }
            }
        })
        //鼠标离开导航时，图片和导航点重新开始滚动
        $('.nav').on('mouseleave', function(event) {
            const target = $(event.target)
            // target.toggleClass('pointed')
            playImg = setInterval(playTheImg, 1000)
            playImgs()

        })
    }


    //setInterval的调用函数
    var playTheImg = function() {
        const currentId = $('.active').data('id')
        const numberOfSlide = $('.slideimg').length
        const nextId = (currentId + 1) % numberOfSlide
        const slideImgs = $('.slideimg')
        //设置导航点和图片的同步滚动
        navHighLight()
        for (var i = 0; i < slideImgs.length; i++) {
            if ($(slideImgs[i]).data('id') == currentId) {
                $(slideImgs[i]).toggleClass('active')
                $(slideImgs[nextId]).toggleClass('active')
            }
        }
    }

    //为clearInterval提供准备的参数
    var playImg = setInterval(playTheImg, 500)

    var playImgs = function() {
        playImg
    }

    //导航点滚动
    const navHighLight = function() {
        const activeId = $('.active').data('id')
        const navs = $('.nav')
        for (var i = 0; i < navs.length; i++) {
            const nextNavId = (i + 1) % navs.length
            const nav = $(navs[i])
            const nextNav = $(navs[nextNavId])
            if (nav.data('id') == activeId) {
                nav.toggleClass('pointed')
                nextNav.toggleClass('pointed')
            }
        }
    }

    //绑定上一张和下一张事件
    //与第三个组件不同，这里通过改变class实现
    const bindSlideButtonClick = function() {
        const numberOfImgs = $('.slideimg').length
        $('#next-slide').on('click', function(event) {
            // log(1)
            const target = $(event.target)
            const img = $('.active')
            const currentId = img.data('id')
            const nextId = (currentId + 1) % numberOfImgs
            img.toggleClass('active')
            const imgs = $('.slideimg')
            const navs = $('.nav')
            $(navs[currentId]).toggleClass('pointed')
            $(navs[nextId]).toggleClass('pointed')
            $(imgs[nextId]).toggleClass('active')
            clearInterval(playImg)

        })
        $('#prev-slide').on('click', function(event) {
            // log(1)
            const target = $(event.target)
            const img = $('.active')
            const currentId = img.data('id')
            const prevId = (numberOfImgs + currentId - 1) % numberOfImgs
            img.toggleClass('active')
            const imgs = $('.slideimg')
            const navs = $('.nav')
            $(navs[currentId]).toggleClass('pointed')
            $(navs[prevId]).toggleClass('pointed')
            $(imgs[prevId]).toggleClass('active')
            clearInterval(playImg)
        })
    }

    const slideImg = function() {
        const css = `<style>
                        .navs span{
                            border-radius: 100%;
                            width: 10px;
                            height: 10px;
                            background-color:red;
                        }
                        .nav {
                            display:inline-block !important;
                            cursor:pointer;

                        }
                        .pointed {
                            background-color: white !important;
                        }
                        #slideBox img {
                            cursor: pointer;
                        }
                        .navs {
                            position: absolute;
                            bottom: 7px;
                            z-index: 100;
                            display: inline-block;
                            left: 10%;
                            background-color: black;
                            opacity: 0.4;
                            color: white;
                        }
                        #next-slide {
                            right:0px;
                        }
                        #prev-slide {
                            left:0px;
                        }
                        #container6 {
                            width: 420px;
                            height: 300px;
                            position: relative;
                        }
                        #slideBox img {
                            display:none;
                        }
                        #slideBox .active {
                            display: block;
                            width: 420px;
                            height: 300px;
                        }
                        .slidebutton{
                            z-index: 100;
                            position:absolute;
                            top: 50%;
                            height: 200px;
                            transform:translateY(-50%);
                        }
                    </style>`
        const container = `<div class='container' id=container6 >
                            </div>`
        const imgsHtml = `<div id='slideBox'><img class='slideimg active' data-id='0' src="1.jpg" >
                                            <img class='slideimg' data-id='1' src="2.jpg" >
                                            <img class='slideimg'  data-id='2' src="3.jpg">
                                            <img class='slideimg'  data-id='3' src="4.jpg">
                        </div>`
        const accessories = `
                        <button type="button" class="slidebutton" id='next-slide'>></button>
                        <button type="button" class="slidebutton" id='prev-slide'><</button>
                        <div class="navs">
                            <span class='nav pointed' data-id='0'></span>
                            <span class='nav' data-id='1'></span>
                            <span class='nav' data-id='2'></span>
                            <span class='nav' data-id='3'></span>

                        </div>`
        appendHtml('body', container)
        appendHtml('#container6', imgsHtml)
        appendHtml('#container6', accessories)
        appendHtml('head', css)
        playImgs()
        pointNav()
        pointImg()
        bindSlideButtonClick()
    }
    // slideImg()

    //7 标签页效果
    const bindButtons = function() {

        $('#component1').on('click', function(event) {
            // log(1)
            $('.container').remove()
            bindDetail('asdasdasdasdasda', 'container1')
        })

        $('#component2').on('click', function(event) {
            log(2)
            $('.container').remove()
            bindeHightlight('container2')
        })
        $('#component3').on('click', function(event) {
            // log(2)
            $('.container').remove()
            bindChangeImg('container3')
        })
        $('#component4').on('click', function(event) {
            // log(2)
            $('.container').remove()
            changSkin()
        })
        $('#component5').on('click', function(event) {
            // log(2)
            $('.container').remove()
            alertWindow('alert')
        })
        $('#component6').on('click', function(event) {
            // log(2)
            $('.container').remove()
            slideImg()
        })
    }

    const __main = function() {
        const tab = `<div id="contianer 7">
                        <button type="button" id='component1'>点击展开的菜单</button>
                        <button type="button" id='component2'>鼠标划过高亮的菜单选择效果</button>
                        <button type="button" id='component3'>点击切换图片的相册</button>
                        <button type="button" id='component4'>切换皮肤（主题）功能</button>
                        <button type="button" id='component5'>弹窗</button>
                        <button type="button" id='component6'>轮播图组件</button>
                    </div>`
        appendHtml('body', tab)
        bindButtons()

    }

    __main()
})
