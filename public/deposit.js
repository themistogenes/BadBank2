function Deposit(){
  const sictx = React.useContext(SignInContext);
  const [show, setShow]       = React.useState(true);
  const [status, setStatus]   = React.useState('');
  const [balance, setBalance] = React.useState(sictx.balance);

  return (<div style={{display:"flex", justifyContent:"space-evenly"}}>   
    <Card
      bgcolor="light"
      txtcolor="dark"
      header="Deposit"
      status={status}
      balance={balance}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus} setBalance={setBalance}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus} setBalance={setBalance}/>
      }
    />
  </div>)
}

function DepositMsg(props){
  const sictx = React.useContext(SignInContext);

  return (<>
    <br/>
    {/*<p>Balance: {sictx.balance}</p>*/}
    <p>Balance: {props.balance}</p>

    <button type="submit" 
      className="btn btn-dark" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}
    >New Deposit</button>
  </>)
} 

function DepositForm(props){
  const sictx                = React.useContext(SignInContext);
  const [email, setEmail]    = React.useState(JSON.stringify(sictx.email).replace(/^"|"$/g, ''));
  const [amount, setAmount]  = React.useState('');

  //prevents access if logged out
  if(sictx.email == '--Logged Out--'){
    window.location.href = '#';
  }

  //prevents a deposit if already a logout via logoutButton
  React.useEffect(()=>{
    setEmail(JSON.stringify(sictx.email).replace(/^"|"$/g, ''));
  }, [document.getElementById('logoutButton')]);

  function handle(){
    if(amount <= 0){
      props.setStatus('Please enter an amount greater than 0.');
      setTimeout(()=> props.setStatus(''), 3000);
      setAmount('');
      return false;
    }
    fetch(`/account/update/${email}/${amount}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          props.setStatus(JSON.stringify(data.value));
          //props.setStatus('Deposit successful!  Hopefully that\'s money you won\'t miss...');
          console.log('Deposit JSON data:', data);
          sictx.balance = data.value.balance;
          props.setBalance(sictx.balance);
          console.log('Deposit sictx.balance: ' + sictx.balance);
          props.setShow(false);
        } catch(err) {
          props.setStatus('Deposit failed');
          console.log('Deposit err:', text);
          //sictx.balance = text.value.balance;
          //console.log(sictx.balance);
        }
      })
  }

  return(<>
  {/*uncomment to debug
    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email"
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}
    /><br/>
  */}
  {/*
    <p>
      Balance: {sictx.balance}
    </p>
  */}
    <p>
    Balance: {props.balance}
    </p>
    
    Amount (+)<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}
      /><br/>

    <button type="submit" 
      className="btn btn-dark" 
      onClick={handle}
    >Deposit</button>
  </>)
}