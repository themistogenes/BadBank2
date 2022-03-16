function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (<div style={{display:"flex", justifyContent:"space-evenly"}}>   
    <Card
      bgcolor="light"
      txtcolor="dark"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>
      }
    />
  </div>)
}

function WithdrawMsg(props){
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
    >New Withdrawal</button>
  </>)
}

function WithdrawForm(props){
  const sictx               = React.useContext(SignInContext);
  const [email, setEmail]   = React.useState(JSON.stringify(sictx.email).replace(/^"|"$/g, ''));
  const [amount, setAmount] = React.useState('');

  //prevents access if logged out
  if(sictx.email == '--Logged Out--'){
    window.location.href = '#';
  }
  
  //prevents a withdrawal if already a logout via logoutButton
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
    if(amount > sictx.balance){
      props.setStatus('Please enter an amount less than the current balance.');
      setTimeout(()=> props.setStatus(''), 3000);
      setAmount('');
      return false;
    }
    fetch(`/account/update/${email}/-${amount}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          //props.setStatus(JSON.stringify(data.value));
          props.setStatus('Withdrawal successful!  That was probably a good idea...');
          console.log('Withdraw JSON data:', data);
          sictx.balance = Number(Number(data.value.balance) - Number(amount));
          console.log('Withdraw sictx.balance: ' + sictx.balance);
          props.setShow(false);
        } catch(err) {
          props.setStatus('Withdrawal failed')
          console.log('err:', text);
          //sictx.balance = err.value.balance;
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
    <p>
      Balance: {sictx.balance}
    </p>
    
    Amount (-) <br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}
      /><br/>
      
    <button type="submit" 
      className="btn btn-dark" 
      onClick={handle}
    >Withdraw</button>
  </>)
}