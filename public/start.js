var that;

socket.on('XAC_NHAN_DANG_NHAP', function(data){
  if(data == 2){
    that.setState( {isLogedIn: true} );
  }
});

var App = React.createClass(
  {
    getInitialState(){
      that = this;
      return {status: 2};
    },
    render(){
      var t =this;
      function getHTML(){
        if(t.state.status == 1){
          return <DangKy/>
        }else if(t.state.status == 2){
          return <DangNhap/>
        }else{
          return <h1>Dang chat</h1>
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
      socket.emit('USER_DANG_NHAP', {username: this.refs.username.value, password: this.refs.password.value});
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

ReactDOM.render(<App/>, document.getElementById('root'));
