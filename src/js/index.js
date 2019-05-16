require(['config'], () => {
    require(['url','template','swiper','header','footer'], (url,template,Swiper) => {
        class Index {
            constructor () {
                // this.bindEvents();
                this.getList();
                this.banner();
            }
            getList () {
                $.get(url.rapBaseUrl+'index/type', data => {
                    if(data.res_code === 1) {
                        // console.log(1)
                        this.render(data.list)
                        
                    }
                })
            }
            render (list) {
                // console.log(template)
                let html = template("new-item", { list });
                $("#container-new").html(html);
            }
            banner () {
                var swiper = new Swiper('.swiper-container',{
                    autoplay: true,
                    loop:true,
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                        
                    }
                })
            }

        }
        new Index()
    })
})