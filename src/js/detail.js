require(['config'], () =>{
    require(['url','template','header','footer','zoom','fly'], (url,template,header) => {
        class Detail{
            constructor () {
                this.getData();
                this.cart();
                // console.log(1)
            }
            getData () {
                // console.log(2);
                let arr = location.search.slice(1).split("&");
                let query = {}
                for(var i in arr){
                    let sArr = arr[i].split('=');
                    query[sArr[0]] = sArr[1]
                }
                // console.log(query);
                this.itemId = Number(query.itemId),
                this.sort = query.sort;
                // console.log(this.itemId,this.sort);
                $.get(url.rapBaseUrl+'sort/item',{sort:"cup"},data => {
                    var arr =data.res_body.list;
                    arr.forEach((item,index) => {
                        if(item.id === this.itemId) this.render(arr[index]);
                    });                    
                })
            }
            render (list) {
                // console.log(list);
                this.data = list;
                $("#detail-container").html(template("detail-template",{list}));
                this.zoom();
            }
            zoom () {
                //放大镜

                $('.zoom-img').elevateZoom({
                    gallery:'gal1',
                    cursor: 'pointer',
                    galleryActiveClass : 'active',
                    borderSize: '1',
                    borderColor :'#888'
                });
            }
            //购物车
            cart () {
                $("#detail-container").on('click','#addCart', e => {
                    //完成添加动画特效
                    console.log($('#cart').offset().top)
                    $(`<img src='${this.data.imgs[0]}' style='width:30px;height:30px'>`).fly({
                        start: {
                            left: e.clientX,
                            top: e.clientY
                        },
                        end: {
                            left: $('#cart').offset().left,
                            top: 20
                        },
                        onEnd: function () {
                            this.destroy();
                            
                        }
                    })

                    
                    //购物车商品存localstorage
                    // console.log(this.data);
                    let cart = localStorage.getItem('cart');
                    if(cart){
                        let index = -1;
                        cart = JSON.parse(cart);
                        let have = cart.some((shop,i) => {
                            index = i;
                            return this.data.id === shop.id;
                        })
                        console.log(have)
                        if(have){
                            cart[index].num++;
                        }else{
                            cart.push({...this.data,num:1})
                        }
                        localStorage.setItem('cart',JSON.stringify(cart))
                    }else{
                        localStorage.setItem('cart',JSON.stringify([{...this.data,num:1}]));                    
                    }

                    header.cartNumCalc();
                })
            }
        }
        new Detail();
    }) 
})