//componets
import { Grid, Typography, TextField, Button } from "@material-ui/core";

import React, {useState } from "react";
//style
import useStyles from "./styles";
import {useForm}  from "react-hook-form";

//components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";

function AddOnsForm() {
  const classes = useStyles();
  const [isLoding, setLoding] = useState(false);
  const { register,handleSubmit } = useForm({});

  const onsubmit = (data) => {
    console.log("data",data);
  };

  return (
    <>
      <PageTitle title="AddOns manage" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                ></Typography>
              </div>
            }
          >
            <form onSubmit={handleSubmit(onsubmit)}>
              <Grid container spacing={3}>
                <input type="text" name="name" ref={register}></input>
                <TextField
                  name="name"
                  fullWidth
                />
                <TextField
                  name="price"
                  inputRef={register}
                  fullWidth
                />
                <Grid>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

export default AddOnsForm;
