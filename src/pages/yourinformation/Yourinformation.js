import React, { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom"


// styles
import useStyles from "./styles";

// logo
import logo from "./logo.png";
import { updateuser } from "../../ApiServices"

function Yourinformation(props) {
  const classes = useStyles();
  let history = useHistory()
  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("")
  const [username,SetUsername]=useState("")
  const [email,SetEmail]=useState("")

  useEffect(() => {
    if (props.location.state) {
      if (props.location.state.data) {
        setName(props.location.state.data, "yourinfo name");
      }
      if (props.location.state.userName) {
        SetUsername(props.location.state.userName,"username yourinfo");
      }
      if (props.location.state.email) {
        SetEmail(props.location.state.email,"email yourinfo");
      }
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const apiData = { username:username,name: name, category };
    updateuser(apiData)
      .then(response => {
        history.push({
          pathname: '/verifyemail',
          state: {username:username,email:email}
        })
      })
      .catch(err => {
        if (err.response.status == 404) {
          setIsLoading(false)
          setError(err.response.data.message)
        }
      })

  };



  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Linetree</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs value={0} indicatorColor="primary" textColor="primary" centered>
            <Tab label="tell us your Name" classes={{ root: classes.tab }} />
          </Tabs>

          <form onSubmit={handleFormSubmit}>
            <React.Fragment>
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  {error ? error : ""}
                </Typography>
              </Fade>
              <TextField
                name="email"
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
              Select one category that best describes your Linktree <br />
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="fashion" control={<Radio />} onChange={e => setCategory(e.target.value)} label="fashion" />
                  <FormControlLabel value="business" control={<Radio />} onChange={e => setCategory(e.target.value)} label="business" />
                  <FormControlLabel value="environment" control={<Radio />} onChange={e => setCategory(e.target.value)} label="environment" />
                </RadioGroup>
              </FormControl>
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
            tree
          </a>
          . All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Yourinformation);
