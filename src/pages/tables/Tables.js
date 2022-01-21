import React, { useEffect, useState } from "react";
import { Grid, Button } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { toast } from "react-toastify";
import swal from "sweetalert";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import * as Icons from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

// data
import {
  getaddons,
  deleteaddOns,
  deleteMultiaddOns
} from "../../ApiServices";


export default function AddOns(props) {
  const [datatableData, setdatatableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const list = () => {
    getaddons()
      .then((response) => {
        setdatatableData(response.data.info);
      })
      .catch((err) => {
        if (!err.response.data.isSuccess) {
          if (err.response.data.status === 401) {
            toast.error(err.response.data.message);
            setIsLoading(false);
          } else {
            console.log(err.response.data);
          }
        }
      });
  };

  useEffect(() => {
    list();
  }, []);

  const options = {
    customToolbarSelect: (selectedRows, data) => (
      <SelectedRowsToolbar
        selectedRows={selectedRows}
        data={data}
        columns={columns}
        datatableTitle="test"
      />
    ),
  };

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "_id",
      label: "Action",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <Icons.Edit
                onClick={() => {
                  const editdata = datatableData.find(
                    (data) => data._id === value,
                  );
                  props.history.push({
                    pathname: "/app/addOns/manage",
                    state: {
                      editdata: editdata,
                    },
                  });
                }}
              />{" "}
              <Icons.Delete
                onClick={async () => {
                  const confirm = await swal({
                    title: "Are you sure?",
                    text: "Are you sure that you want to delete this data?",
                    icon: "warning",
                    dangerMode: true,
                  });
                  if (confirm) {
                    deleteaddOns(value)
                      .then(() => {
                        toast.success("Deleted successfully!", {
                          key: value,
                        });
                        list();
                      })
                      .catch((err) => {
                         console.log(err,"error ");
                        toast.error("Something went wrong!", {
                          key: value,
                        });
                      });
                  }
                }}
              />
            </div>
          );
        },
      },
    },
  ];

  const deleteMultiple = async (index) => {
    const ids = index.data.map(
      (index1) =>
        datatableData.find(
          (data, index2) => index2 === index1.dataIndex && data._id,
        )._id,
    );
    const confirm = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this data?",
      icon: "warning",
      dangerMode: true,
    });

    if (confirm) {
      deleteMultiaddOns(ids)
        .then(() => {
          toast.success("Deleted successfully!", {
            key: ids,
          });
          list();
        })
        .catch((err) => {
          toast.error("Something went wrong!", {
            key: ids,
          });
        });
    }
  };



  const SelectedRowsToolbar = ({
    selectedRows,
    data,
  }) => {
    return (
      <div>
        <IconButton onClick={() => deleteMultiple(selectedRows, data)}>
          <Icons.Delete />
        </IconButton>
      </div>
    );
  };

  return (
    <>
      <PageTitle
        title="AddOns List"
        button={
          <>
            <Button
              variant="contained"
              size="medium"
              color="secondary"
              onClick={() => {
                props.history.push("/app/addOns/manage");
              }}
            >
              Add AddOns
            </Button>
          </>
        }
      />

      <Grid container spacing={4}>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
          <MUIDataTable
            title="AddOns List"
            data={datatableData}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  )
}
