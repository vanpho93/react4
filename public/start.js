var that;
var list;
socket.on('XAC_NHAN_DANG_NHAP', function(data){
  if(data == 2){
    that.setState( {isLogedIn: true} );
  }
});

socket.on('SERVER_SEND_MESSAGE', function(data){
  if(list != undefined){
    list.state.mang.push(data);
    list.setState(list.state);
  }  
});

var App = React.createClass(
  {
    getInitialState(){
      that = this;
      if(daDangNhap == true){
        return {status: 3};
      }else{
        return {status: 2};
      }
    },
    render(){
      var t =this;
      function getHTML(){
        if(t.state.status == 1){
          return <DangKy/>
        }else if(t.state.status == 2){
          return <DangNhap/>
        }else{
          return <Chat/>
        }
      }
      return  (getHTML());
    },
    componentDidMount(){

    }
  }
);

var DangKy = React.createClass(
  {
    render(){
      return(
        <div>
          <h2> Form Dang Ky </h2>
          <form action="/xulydangky" id="formDangKy" method="post" enctype="multipart/form-data">
            <input type="text" name="username" placeholder="username"/><br/><br/>
            <input type="password" name="password" placeholder="password"/><br/><br/>
            <input type="text" name="email" placeholder="email"/><br/><br/>
            <input type="file" name="avatar"/><br/><br/>
            <button id="btnDangKy" type="submit">Dang Ky</button>
          </form>
        </div>
      );
    }
  }
);

var DangNhap = React.createClass(
  {
    signUp(){
      that.setState({status: 1});
    },
    submit(){
      var u = this.refs.username.value;
      var p = this.refs.password.value;
      $.post('/xulydangnhap', {username: u, password: p}, function(data) {
        if(data == 2){
          that.setState({status: 3});
        }else{
          alert('Kiem tra lai username va password')
        }
      })
    },
    render(){
      return(
        <div>
          <input type="text" ref="username" placeholder="username"/><br/><br/>
          <input type="password" ref="password" placeholder="password"/><br/><br/>
            <button onClick={this.submit}>Gui</button><br/><br/>
            <button onClick={this.signUp}>Dang ky</button>
        </div>
      );
    }
  }
);

var Chat = React.createClass(
  {
    sendMessage(){
      socket.emit('CLIENT_SEND_MESSAGE', this.refs.txtMessage.value);
    },
    render(){
      return (
        <div>
          <input type="text" ref="txtMessage" placeholder="Enter your message"/>
          <button onClick={this.sendMessage}>Gui tin nhan</button>
          <ListMessage/>
        </div>
      );
    }
  }
);

var ListMessage = React.createClass(
  {
    getInitialState(){
      list = this;
      return {mang: ['abcd', 'dafa', 'dasfasd']}
    },
    render(){
      return(
        <div>
        {
          this.state.mang.map(function(element, index){
          return <p key={index}>{element}</p>
        })
      }
        </div>
      );
    }
  }
);

ReactDOM.render(<App/>, document.getElementById('root'));
