require(['config'], () =>{
    require(['url','template','header','footer'], (url,template) => {
        class Detail{
            constructor () {
                this.getData();
                // console.log(1)
            }
            getData () {
                // console.log(2);
                this.itemId = Number(location.search.slice(-3)),
                this.sort = location.search.slice(-14,-11);
                // console.log(this.itemId,this.sort);
                $.get(url.rapBaseUrl+'sort/item',{sort:"cup"},data => {
                    var arr =data.res_body.list;
                    arr.forEach((item,index) => {
                        if(item.id === this.itemId) this.render(arr[index]);
                    });
                    
                })
            }
            render (list) {
                console.log(list);
                $("#detail-container").html(template("detail-template",{list}))
            }
        }
        new Detail();
    }) 
})