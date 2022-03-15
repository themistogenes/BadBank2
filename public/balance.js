function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (<div style={{display:"flex", justifyContent:"space-evenly"}}> 
    <Card style={{}}
      bgcolor="light"
      txtcolor="dark"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow} setStatus={setStatus}/>
      }
    />
  </div>)
}

function BalanceMsg(props){
  const sictx = React.useContext(SignInContext);

  return (<>
    <br/>

    <p>Balance: {sictx.balance}</p>

    <button type="submit" 
      className="btn btn-dark" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}
    >Check Balance Again</button>
  </>)
}

function BalanceForm(props){
  const sictx             = React.useContext(SignInContext);
  const [email, setEmail] = React.useState(JSON.stringify(sictx.email).replace(/^"|"$/g, ''));  

  //prevents access if logged out
  if(sictx.email == '--Logged Out--'){
    window.location.href = '#';
  }
  
  //prevents a balance check if already a logout via logoutButton
  React.useEffect(()=>{
    setEmail(JSON.stringify(sictx.email).replace(/^"|"$/g, ''));
  }, [document.getElementById('logoutButton')]);

  function handle(){
    fetch(`/account/findOne/${email}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          //props.setStatus(text);
          props.setStatus('Balance Check successful! Surprisingly your money is still here...')
          console.log('Balance JSON data:', data);
          sictx.balance = data.balance;
          console.log('Balance sictx.balance: ' + sictx.balance);
          props.setShow(false);
        } catch(err) {
          props.setStatus('Check Balance failed')
          console.log('err:', text);
      }
      })
  }

  return (<>
  {/*uncomment to debug
    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>
  */}
    <button type="submit" 
      className="btn btn-dark" 
      onClick={handle}>
        Check Balance
    </button><br/><br/>

  {/*uncomment to debug
    <p>
      Balance: {sictx.balance}
    </p>
  */}
  </>)
}