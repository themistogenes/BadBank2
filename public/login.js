function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (<div style={{display:"flex", justifyContent:"space-evenly"}}>  
    <Card
      bgcolor="light"
      txtcolor="dark"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>
      }
    />
  </div>)
}

function LoginMsg(props){
  const sictx = React.useContext(SignInContext);

  return(<>
    <p>How can we help you today?</p>
    <a href="#/balance/"><button type="submit" className="btn btn-dark">Check Balance</button></a><br/>
    <br/>
    <a href="#/deposit/"><button type="submit" className="btn btn-dark">Deposit</button></a>&nbsp;&nbsp; 
    <a href="#/withdraw/"><button type="submit" className="btn btn-dark">Withdraw</button></a><br/>
    <br/>
    <button type="submit" 
      className="btn btn-dark" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
        sictx.email = '--Logged Out--';
        console.log("sictx: " + JSON.stringify(sictx));
        document.getElementById('loggedInUser').innerHTML = `${sictx.email}`;
        document.getElementById('createAccountLink').style.display = "block";
        document.getElementById('loginLink').style.display = "block";
        document.getElementById('depositLink').style.display = "none";
        document.getElementById('withdrawLink').style.display = "none";
        document.getElementById('balanceLink').style.display = "none";
        firebase.auth().signOut()
        .then(console.log('User signed out via Firebase Auth'))
        .then(firebase.auth().onAuthStateChanged(firebaseUser => {
          console.log('firebaseUser:', firebaseUser)
        }));
      }
      }>Switch Account</button>
  </>)
}

function LoginForm(props){
  const sictx                   = React.useContext(SignInContext);
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle(){
    //Firebase Auth
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise
      .then(console.log('User signed in via Firebase Auth'))
      .then(
        auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser){console.log('firebaseUser:', firebaseUser)}
      }));
    promise.catch(e => console.log(e.message));

    fetch(`/account/login/${email}/${password}`)
      .then(response => response.text())
      .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('Welcome, ' + email + '!');
            props.setShow(false);
            console.log('Login JSON data:', data);
            sictx.email = data.email;
            console.log('Login sictx.email: ' + sictx.email);
            sictx.balance = data.balance;
            console.log('Login sictx.balance: ' + sictx.balance);
        } catch(err) {
            props.setStatus('Login failed');
            console.log('err:', text);
        }
    });
    addNavBarLinks();
    updateLoggedInUser();
    preventLogoutButtonDup();
    addLogoutButton();
  }

  function addNavBarLinks(){
    document.getElementById('createAccountLink').style.display = "none";
    document.getElementById('loginLink').style.display = "none";
    document.getElementById('depositLink').style.display = "block";
    document.getElementById('withdrawLink').style.display = "block";
    document.getElementById('balanceLink').style.display = "block";
  }

  function updateLoggedInUser(){
    sictx.email = email;
    document.getElementById('loggedInUser').innerHTML = `${sictx.email}`;
  }

  function preventLogoutButtonDup(){
    if(document.getElementById('logoutButton')){
      document.getElementById('logoutButton').remove()
    };
  }

  function addLogoutButton(){
    let but = document.createElement('button');
    document.getElementById('loginLogout').append(but);
    but.innerHTML = 'Log Out';
    but.type = 'button';
    but.className = 'btn btn-dark';
    but.id = 'logoutButton';
    but.addEventListener('click', logout);
    //uncomment to debug
    //console.log(but.attributes);
  }

  function logout(){
    sictx.email = '--Logged Out--';
    sictx.balance = '--';
    console.log('Login sictx set from logoutButton: ' + JSON.stringify(sictx));
    document.getElementById('loggedInUser').innerHTML = `${sictx.email}`;
    document.getElementById('logoutButton').remove();
    document.getElementById('createAccountLink').style.display = "block";
    document.getElementById('loginLink').style.display = "block";
    document.getElementById('depositLink').style.display = "none";
    document.getElementById('withdrawLink').style.display = "none";
    document.getElementById('balanceLink').style.display = "none";

    //Firebase Auth
    firebase.auth().signOut()
      .then(console.log('User signed out via Firebase Auth'))
      .then(firebase.auth().onAuthStateChanged(firebaseUser => {
        console.log('firebaseUser:', firebaseUser);
      }));

    //uncomment to re-direct to home after logout
    window.location.href = '#';
  }

  return (<>
    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>
      
    <button type="submit" className="btn btn-dark" onClick={handle}>Login</button>
  </>)
}