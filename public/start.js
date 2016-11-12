var that;
socket.on('XAC_NHAN_DANG_NHAP', function(data){
  if(data == 2){
    that.setState( {isLogedIn: true} );
  }
});
var App = React.createClass(
  {
    getDefaultProps(){
      that = this;
    },
    getInitialState(){
      return {isLogedIn: false};
    },
    render(){
      var xhtml = this.state.isLogedIn?<h1> Dang chat roi </h1>: <DangNhap/>
      return  xhtml;
    }
  }
);

var DangNhap = React.createClass(
  {
    submit(){
      socket.emit('USER_DANG_NHAP', {username: this.refs.username.value, password: this.refs.password.value});
    },
    render(){
      return(
        <div>
          <input type="text" ref="username" placeholder="username"/><br/><br/>
          <input type="password" ref="password" placeholder="password"/><br/><br/>
            <button onClick={this.submit}>Gui</button><br/><br/>
        </div>
      );
    }
  }
);

ReactDOM.render(<App/>, document.getElementById('root'));
