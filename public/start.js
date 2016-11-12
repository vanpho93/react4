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

ReactDOM.render(<DangNhap/>, document.getElementById('root'));
