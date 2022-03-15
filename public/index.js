function Spa() {

  return (
    <HashRouter>
      <div>
      {/*UserContext.Provider can probably be removed*/}
      <UserContext.Provider value={{users:[{name:'',email:'',password:'',balance:''}]}}>
          <SignInContext.Provider value={{email:'--Logged Out--',balance:'--'}}>
            <NavBar/>        
            <div className="container" style={{padding: "20px"}}>
              <Route path="/" exact component={Home} />
              <Route path="/CreateAccount/" component={CreateAccount} />
              <Route path="/login/" component={Login} />
              <Route path="/deposit/" component={Deposit} />
              <Route path="/withdraw/" component={Withdraw} />
              <Route path="/balance/" component={Balance} />
              <Route path="/alldata/" component={AllData} />
            </div>
          </SignInContext.Provider>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
