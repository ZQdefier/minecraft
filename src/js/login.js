require(['config'], () => {
    require(['url','header','footer','cookie'], (url) => {
        class Login {
            constructor () {
                this.username = $("#username");
                this.password = $("#password");
                this.loginBtn = $("#login-btn");
                this.remember = $("#remember");
                this.bindevents();
            }
            bindevents () {
                this.loginBtn.on('click', () => {
                    let name = this.username.val();
                    let psd = this.password.val();
                    // console.log(name,psd);

                    $.ajax({
                        url : url.phpBaseUrl + "user/login.php",
                        type : "post",
                        data : {name,psd},
                        success : data => {
                            if(data.res_code === 1) {
                                this.loginSucc(name);
                                // console.log(2)
                            }else{
                                alert(data.res_message)
                            }
                        },
                        dataType : 'json'
                    })
                })
            }

            loginSucc (name) {
                let expires = this.remember.prop('cheked')?{expires:7} : {};
                expires = Object.assign({path: "/"},expires);
                $.cookie('username',name,expires);
                alert('登陆成功，即将跳转首页');
                location.href = "/";
            }
        }
        new Login();
    })
})