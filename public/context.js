const Route         = ReactRouterDOM.Route;
const Link          = ReactRouterDOM.Link;
const HashRouter    = ReactRouterDOM.HashRouter;
const UserContext   = React.createContext(null);
const SignInContext = React.createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyD9LAGzR7JNCGMBYvVqpj7yG3n8Mp3nTLk",
  authDomain: "badbankproj.firebaseapp.com",
  projectId: "badbankproj",
  storageBucket: "badbankproj.appspot.com",
  messagingSenderId: "925560457934",
  appId: "1:925560457934:web:23bc49f3696da8926e1e9f"
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);

function Card(props){
  function classes(){
    const bg  = props.bgcolor ? ' bg-' + props.bgcolor : '';
    const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
    return 'card mx-3 my-3 ' + bg + txt;
  }

  return (
    <div className={classes()} style={{maxWidth: "18rem", opacity: .90}}>
      <div className="card-header" style={{backgroundColor: "ivory"}}>{props.header}</div>
      <div className="card-body">
        {props.title && (<h5 className="card-title">{props.title}</h5>)}
        {props.text && (<p className="card-text">{props.text}</p>)}
        {props.status && (<div id='createStatus'>{props.status}</div>)}
        {props.body}
      </div>
    </div>      
  );    
}