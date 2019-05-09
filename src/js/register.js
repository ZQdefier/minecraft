require(['config'], () => {
    require(['url','jquery','cookie'], (url,$) => {
        class Register{
            constructor () {
                this.username = $("#username");
                this.password = $("#password");
                this.btn = $("#registerBtn");
                this.bindevents();
            }
            bindevents() {
                this.btn.on('click', () => {
                    let name = this.username.val(),
                        psd = this.password.val();
                        // console.log(name,psd);
                    $.ajax({
                        url:url.phpBaseUrl+"user/register.php",
                        type : "post",
                        data : {name,psd},
                        success : data => {
                            if(data.res_code === 1){
                                alert(data.res_message);
                                console.log(1);
                                location.href = "/html/login.html"
                            }
                        },
                        dataType : "json"
                    })
                })
            }
        }
        new Register();
    })
})