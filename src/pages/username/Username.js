import React, { useEffect, useState } from "react";
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
import logo from "./logo.jpg";
import { updateuser } from "../../ApiServices"
import { useHistory } from "react-router-dom"


function UserName(props) {
  const classes = useStyles();
  let history = useHistory()
  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (props.location.state) {
      if (props.location.state.data) {
        setUserName(props.location.state.data);
      }
      if (props.location.state.email) {
        setEmail(props.location.state.email, "email");
      }
    }
  }, []);



  const handleFormSubmit = (e) => {
    e.preventDefault();
    const apiData = { username: userName, name,email:email };
    updateuser(apiData)
      .then((response) => {
        history.push({
          pathname: '/yourinformation',
          state: { data: name, userName: userName,email:email }
        })
      })
      .catch((err) => {
        if (err.response.status == 404) {
          setIsLoading(false)
          setError(err.response.data.message)
        }
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
            <Tab label="Tell us your Name" classes={{ root: classes.tab }} />
          </Tabs>
          <form onSubmit={handleFormSubmit}>
            <React.Fragment>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  {error ? error : ""}
                </Typography>
              </Fade>
              <TextField
                name="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={name}
                onChange={e => setName(e.target.value)}
                margin="normal"
                placeholder="Your name"
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
                    Continue
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
            Linktree
          </a>
          . All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(UserName);
