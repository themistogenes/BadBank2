function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <div style={{display:"flex", justifyContent:"space-evenly"}}>
    <Card
      bgcolor="light"
      txtcolor="dark"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setStatus={setStatus} setShow={setShow}/> : 
        <CreateMsg setStatus={setStatus} setShow={setShow}/>
      }
    />
    </div>
  )
}

function CreateMsg(props){
  return(<>
    <br/>
    <a href="#/login/"><button type="submit" className="btn btn-dark">Proceed to Login</button></a><br/>
    <br/>
    <button type="submit" 
      className="btn btn-dark" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }
      }>Create New Account</button>
  </>)
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle(){
    //Firebase Auth
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise
      .then(console.log('User created via Firebase Auth'))
      .then(auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser){console.log('firebaseUser:', firebaseUser)}
      }));
    promise.catch(e => console.log(e.message)); 

    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
        var res  = await fetch(url);
        var data = await res.json();    
        console.log('Create Account data: ' + JSON.stringify(data));
        props.setShow(false);
        props.setStatus('Thank you, ' + name + ', for choosing BadBank.  You\'ve made a bad choice, although you may now proceed to Login.' );        
    })();
  }    

  return (<>
    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

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

    <button type="submit" 
      className="btn btn-dark" 
      onClick={handle}>Create Account</button>
  </>)
}