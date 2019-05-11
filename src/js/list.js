require(['config'], () => {
    require(['url','template','header','footer'], (url,template) => {
        class List{
            constructor () {
                this.getData();
            }
            getData () {
                // console.log($.ajax);
                console.log(url.rapBaseUrl+"type/homelife")
                $.ajax({
                    url : url.rapBaseUrl+"type/homelife",
                    type : "get",
                    data : "type/homelife",
                    success : data => {
                        console.log(2);
                        if(data.res_code === 1) this.render(data.res_body.list);
                    },
                    dataType : "json"
                })
                // $.get(url.rapBaseUrl+"type/homelife",data => {
                //     console.log(data);
                //     if(data.res_code === 1) this.render(data.res_body.list);
                // })
            }
            render (list) {
                console.log(list);
                $('#bed-container').html(template('bed-template',{list}));
                this.bindevents();
            }
            bindevents () {
                $("#bed-container").on('click',"a", () => {
                    console.log(1);
                })
            }
        }
        new List();
    })
})