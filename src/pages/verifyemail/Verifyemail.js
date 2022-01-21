import React, { useState ,useEffect} from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
// styles
import useStyles from "./styles";

// logo
import logo from "./logo.jpg";
import {verifyemail} from "../../ApiServices";

function Verifyemail(props) {
  const classes = useStyles();
  let history = useHistory()
  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [username,SetUsername]=useState("")
  const [email,SetEmail]=useState("")

  useEffect(() => {
    if (props.location.state) {
      if (props.location.state.email) {
        console.log(props.location.state.email,"verifyemail");
        SetEmail(props.location.state.email);
      }
      if (props.location.state.username) {
        console.log(props.location.state.username,"username");
        SetUsername(props.location.state.username);
      }
    }
  }, []);

  const handleSubmit=(e)=>{
    e.preventDefault();
    const data ={email:email,username:username}
    verifyemail(data)
    .then(response=>{
      console.log(response);
      history.push("login")
    })
    .catch(err=>{
      console.log(err);
    })

  }

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Linktree Admin</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs value={0} indicatorColor="primary" textColor="primary" centered>
            <Tab label="Thanks for signing up" classes={{ root: classes.tab }} />
          </Tabs>
          <form onSubmit={handleSubmit}>
            <React.Fragment>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  {response && response}
                </Typography>
              </Fade>
              To verify Your account,Click on the link sent to your 
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Continue to my Linktree
                  </Button>
                )}
              </div>
            </React.Fragment>
          </form>
        </div>
        <Typography color="primary" className={classes.copyright}>
          © {new Date().getFullYear()}{" "}
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="Leaffy.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Kaadis
          </a>
          . All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Verifyemail);
