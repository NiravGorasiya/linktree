import React, { useState } from "react";
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

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.png";
import {resetAdminPass} from "../../ApiServices"

function ResetPasswordAdmin(props) {
  const classes = useStyles();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [newPassword, setPassword] = useState("")
  const [username,setUsername]=useState("")

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({username,newPassword});
    let data={username,newPassword}
    resetAdminPass(data).then(response=>{
      console.log(response)
      props.history.push("/login");
    })
    .catch(error=>{
      console.log(error.response);
      setIsLoading(false)
      setError(error.response.data.message)
    })
    
  };

  //const onSubmit = (data) => console.log(data);

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Linetree</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs value={0} indicatorColor="primary" textColor="primary" centered>
            <Tab label="Reset Password" classes={{ root: classes.tab }} />
          </Tabs>

          <form onSubmit={handleFormSubmit}>
            <React.Fragment>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  {error ? error : ""}
                </Typography>
              </Fade>
              <TextField
                name="username"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={username}
                onChange={e => setUsername(e.target.value)}
                margin="normal"
                placeholder="username"
                type="username"
                fullWidth
              />
              <TextField
                name="newPassword"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={newPassword}
                onChange={e => setPassword(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
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
                    Reset Password
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
            tree
          </a>
          . All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(ResetPasswordAdmin);
