define(['jquery','cookie'], $ => {
  function Header () {
    this.container = $("#header");
    this.load();

    // this.load().then(() => {
    //   this.search():
    // })
  }

  // Object.assign(Header.prototype, {

  // });

  // 对象合并
  $.extend(Header.prototype, {
    // ES6对象增强写法
    load () {
      header.html加载到container里
      this.container.load('/html/module/header.html', () => {
        // console.log(2)
        this.search();
        this.scroll();
        this.isLogin();
        this.cartNumCalc();
      }); 
      // return new Promise(resolve => {
      //   this.container.load('/html/module/header.html', () => {
      //     // load异步执行结束
      //     console.log(1)
      //     resolve();
  
      //   });
      // })
    },
    
    //搜索功能
    search () {
      // console.log(1);
      //获取元素 绑定事件
      $("#search").on('keyup', function () {
        let keyWord = $(this).val();  // 获取关键词

        //发送请求
        $.getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd='+keyWord , data =>{
          console.log(data);
        })
      })  
    },

    scroll () {
      window.onscroll = function () {
       var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
       if(scrollTop<280){
          $("#nav-container").removeClass("fixed").addClass("relative");
          $("#login-container").removeClass("fixed").addClass("relative");
       }else{
          $("#nav-container").removeClass("relative").addClass("fixed");
          $("#login-container").removeClass("relative").addClass("fixed");
       }
     }
    },
    //检查是否登录
    isLogin() {
        let username =$.cookie('username');
        if(username){
          $('.unlogin').hide();
          $('.onlogin').show();
          $('#username').html(username);
        }

        $('#loginOut').on('click',() => {
          if(confirm("确认退出么？")){
            $.removeCookie('username',{path:'/'});
            $('.unlogin').show();
            $('.onlogin').hide();
          }
        })
    },
    //初始化购物车数量
    cartNumCalc () {
      let cart = localStorage.getItem('cart');
      let num = 0;
      if(cart){
        cart = JSON.parse(cart);

        num = cart.reduce((n,shop) => {
          n += shop.num;
          return n
        },0)
      }
      $('#cart-num').html(num);
    }
  })

  return new Header();
});