function Home(){
  return (
    <div style={{display:"flex", justifyContent:"space-evenly"}}> 
    <Card
      bgcolor="light"
      txtcolor="dark"
      header={<h4>Welcome to BadBank</h4>}
      title="We are unsecure banking at its worst.&copy;"
      text="By proceeding, you hereby consent that BadBank may be irresponsible with your data, money, and general experience."
      body={<>
        <br/>
        <img src="bank.png" className="img-fluid" alt="Responsive image"/><br/>
        <br/>
        <p>&copy;2022 BadBank</p>
      </>}
    />
    </div>
  );  
}
