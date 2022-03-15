function AllData(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (<div style={{display:"flex", justifyContent:"space-evenly"}}>
    <Card
      bgcolor="light"
      txtcolor="dark"
      header="Admin Login"
      status={status}
      body={show ?
        <AdminForm setShow={setShow} setStatus={setStatus}/>
        :
        <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-evenly"}}>
        <AccessAllData setShow={setShow} setStatus={setStatus}/>
        </div>
      }
    />
  </div>)
}

function AccessAllData(){
  const [data, setData] = React.useState(''); 
  const accountsArray = [];

  React.useEffect(() => {
    // fetch all accounts from API
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        console.log('AllData JSON data:', data);
        setData(data);
        //setData(JSON.stringify(data));               
      });
  }, []);

  for (let i=0; i<data.length; i++) {
    let account = data[i];
    let {
        _id: accountId,
        name: accountName, 
        email: accountEmail, 
        password: accountPassword, 
        balance: accountBalance, 
        } = account;
    const accountCard = (
      <Card
        key={i}
        bgcolor="dark"
        txtcolor="light"
        header={<span style={{backgroundColor:"black"}}>{accountEmail}</span>}
        body={<>
            id: {accountId}<br/>
            name: {accountName}<br/>
            email: {accountEmail}<br/>
            password: {accountPassword}<br/>
            balance: ${accountBalance}<br/>
        </>}
      />)
      accountsArray.push(accountCard);
  } 
  return accountsArray;
}

function AdminForm(props){
  const [adminUser, setAdminUser]   = React.useState('');
  const [adminPass, setAdminPass]   = React.useState('');

  function handle(){
    if(adminUser != 'admin' && adminPass != 'admin'){
      props.setShow(true);
      props.setStatus('Pssst... try \'admin\' for both username and password.');
      setTimeout(()=> props.setStatus(''), 3000);
      setAdminUser('');
      setAdminPass('');
      return false;
    }
    console.log('Admin:', adminUser, adminPass)
    props.setShow(false);
    props.setStatus('Welcome, Admin!');
}

  return(<>
    Admin username<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter admin username"
      value={adminUser} 
      onChange={e => setAdminUser(e.currentTarget.value)}
      /><br/>
    
    Admin password<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter admin password" 
      value={adminPass} 
      onChange={e => setAdminPass(e.currentTarget.value)}
      /><br/>

    <button type="submit" 
      className="btn btn-dark" 
      onClick={handle}
    >Access AllData</button>
  </>)
}