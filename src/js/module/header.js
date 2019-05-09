define(['jquery'], $ => {
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
    }

  })

  return new Header();
});