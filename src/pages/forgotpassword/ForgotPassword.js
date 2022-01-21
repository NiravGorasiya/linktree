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
import logo from "./logo.jpg";
import { forgotAdminPass } from "../../ApiServices";

function ForgotPassword(props) {
  const classes = useStyles();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("")
  const [response, setResponse] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let data = { username }
    forgotAdminPass(data)
    .then(response => {
      console.log(response.data.info);
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
            <Tab label="Forgot Password" classes={{ root: classes.tab }} />
          </Tabs>
          <form onSubmit={handleFormSubmit}>
            <React.Fragment>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  {response && response}
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
                onChange={e => {
                  setUsername(e.target.value);
                  setError(null);
                }}
                margin="normal"
                placeholder="Linktree username"
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
            Kaadis
          </a>
          . All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(ForgotPassword);
