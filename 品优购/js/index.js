document.addEventListener('DOMContentLoaded', function() {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click();
        }, 2000)
    });
    // 动态生成小圆圈
    var ul = focus.querySelector('ul');
    // console.log(ul.children.length);
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            var focusWidth = focus.offsetWidth;
            console.log(focusWidth);
            console.log(index);
            animate(ul, -focusWidth * index)
        })
    }
    ol.children[0].className = 'current';

    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 4) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * 720, function() {
                flag = true;
            });
            circle++;
            if (circle == 4) {
                circle = 0;
            }
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            ol.children[circle].className = 'current';
        }
    })

    arrow_l.addEventListener('click', function() {
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = (-num * focusWidth) + 'px';

        }
        num--;
        animate(ul, -num * 720);
        circle--;
        if (circle < 0) {
            circle = ol.children.length - 1;
        }
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        ol.children[circle].className = 'current';
    })

    var timer = setInterval(function() {
        arrow_r.click();
    }, 2000)
})