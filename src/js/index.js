require(['config'], () => {
    require(['url','template','header','footer'], (url,template) => {
        class Index {
            constructor () {
                // this.bindEvents();
                this.getList();
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



        }
        new Index()
    })
})