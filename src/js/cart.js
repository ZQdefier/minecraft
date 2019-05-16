require(['config'],() => {
    require(['template','header','footer'],(template,header) => {
        class Cart{
            constructor () {
                this.getData();
            }
            getData () {
                let cart = localStorage.getItem('cart');
                if(cart && cart !== '[]'){
                    $("#main-empty").hide();
                    $("main").show();
                    cart = JSON.parse(cart);
                    console.log(cart);
                    $('#template-container').html(template("container-template",{cart}));
                    this.option();
                    this.select();
                }else{
                    $("#main").hide();
                    $("#main-empty").show();
                }
            }
            option () {
                //删除整行，localstorage更新 header购物车更新
                $('.item-container').on('click','#del', e => {
                    let target = e.target || e.srcElement,
                        item = target.parentNode.parentNode,
                        cart = JSON.parse(localStorage.getItem('cart')),                                 
                        index = -1;
                    cart.some((shop,i)=>{
                        index = i ;
                        return item.getAttribute('data-id') == shop.id
                    })
                    cart.splice(index,1);
                    // console.log(cart);
                    localStorage.setItem('cart',JSON.stringify(cart));
                    target.parentNode.parentNode.remove();
                    header.cartNumCalc();
                    this.getData();
                });

                //减少键
                $('.item-container').on('click','.less', e => {
                    let target = e.target||e.srcElement,
                        item = target.parentNode.parentNode.parentNode,
                        cart = JSON.parse(localStorage.getItem('cart')),
                        index = -1;
                    cart.some((shop,i)=>{
                        index = i ;
                        return item.getAttribute('data-id') == shop.id
                    })
                    if(cart[index].num <= 1){
                        alert("本商品一件起卖");
                    }else{
                        cart[index].num--;
                        target.nextElementSibling.value = cart[index].num;
                        localStorage.setItem('cart',JSON.stringify(cart));
                        header.cartNumCalc();
                        this.getData();
                    }                   
                })
                //增加
                $('.item-container').on('click','.more',e => {
                    let target = e.target||e.srcElement,
                        item = target.parentNode.parentNode.parentNode,
                        cart = JSON.parse(localStorage.getItem('cart')),
                        index = -1;
                    cart.some((shop,i)=>{
                        index = i ;
                        return item.getAttribute('data-id') == shop.id
                    })
                    cart[index].num++;
                    target.previousElementSibling.value = cart[index].num;
                    localStorage.setItem('cart',JSON.stringify(cart));
                    header.cartNumCalc();
                    this.getData();
                })
            }
            select () {
                $
            }      
          
        }
        new Cart();
    })
})