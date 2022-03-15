function NavBar(){
  const sictx = React.useContext(SignInContext);
  React.useEffect(()=>{console.log('NavBar sictx: ' + JSON.stringify(sictx))}, [sictx]);

  return(
    <nav className="navbar navbar-expand-md navbar-dark" style={{opacity: .8, backgroundColor: "black", color: "white"}}>
      <a className="navbar-brand" href="#" style={{opacity: .8, paddingLeft: "5px", paddingRight: "5px", backgroundColor: "ivory", color: "black"}}><img src="bank.png" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" />BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/" id="createAccountLink" style={{display: "block"}}>Create Account</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/login/" id="loginLink" style={{display: "block"}}>Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/deposit/" id="depositLink" style={{display: "none"}}>Deposit</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/" id="withdrawLink" style={{display: "none"}}>Withdraw</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/balance/" id="balanceLink" style={{display: "none"}}>Balance</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/">AllData</a>
          </li>          
        </ul>
        <span className="navbar-text d-flex ml-auto py-0" id="loginGroup">
          <span className="navbar-text d-flex my-auto py-0" id="loggedInUser">
            {sictx.email}
          </span>
          <span className="navbar-text d-flex my-auto py-0" id="loginSpacer">
            &nbsp;&nbsp;&nbsp;
          </span>
          <span className="navbar-text py-0" id="loginLogout">
            {/*logoutButton is dynamically added here*/}
          </span>
        </span>
      </div>
    </nav>
  )
}