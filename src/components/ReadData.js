import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom"
import Alert from './Alert';
import { database } from "../firebaseConfig"
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore';


const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
  <div className="form-check">
    <input
      htmlFor="booty-check"
      type="checkbox"
      className="form-check-input"
      ref={ref}
      onClick={onClick}
      {...rest}
    />
    <label className="form-check-label" id="booty-check" />
  </div>
));

export default function ReadData() {
  const [students, setStudents] = useState([{}]);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const collectionRef = collection(database, 'students');
  const [message, setMessage] = useState('initial message, no errors')
  const [messageType, setMessageType] = useState('');
  const [isMessageVis, setMessageVis] = useState(false);

  const removeAlert = () => {
    setMessage('')
    setMessageType('')
    setMessageVis(false);
  }
  const showAlert = (message, type) => {
    setMessage(message)
    setMessageType(type)
    setMessageVis(true);
  }

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true
    },
    {
      name: "Name",
      selector: (row) => row.user,
      sortable: true
    },
    {
      name: "Password",
      selector: (row) => row.password,
      sortable: true
    }, !students
      ? { name: "Delete Row" }
      : {
        name: "Delete Row",
        sortable: true,
        cell: (row) => <button className="btn btn-outline-dark" onClick={(e) => {
          const docRef = doc(database, "students", row.id);
          deleteDoc(docRef)
            .then(() => {
              showAlert("Data deleted", "info")
              handleSearch();
            }).catch((err) => {
              alert(err.message);
            })
        }}>Delete Row</button>
      }

  ];




  const handleChange = (event) => {
    let newInput = { [event.target.name]: event.target.value }
    setData({ ...data, ...newInput });
  }
  const handleSearch = () => {
    setLoading(true);

    getDocs(collectionRef)
      .then((response) => {
        setStudents(
          response.docs.map((item) => {
            return { ...item.data(), id: item.id }
          })
        )
        setLoading(false);

      }).catch((err) => {
        console.log(err.message)
      })
  }
  const handleEdit = (event, id) => {
    navigate(`/readdata/${id}`);
  }
  const onRowClicked = (row, event) => { handleEdit(event, row.id); };

  return (
    <article className="App">
      <section className="card">
        <div class="container">
          <div class="p-2 row justify-content-md-left">
            <div class="col-md-auto">
              <p>Click to Update List</p>
            </div>
            <div class="col-md-auto">
              <select onChange={(e) => {
                handleChange(e)
              }}
                class="form-select mb-2"
                name="currentTable">

                <option defaultValue>Student</option>
                <option>One</option>
              </select>
            </div>
            <div class="col-md-auto">
              <button className="btn btn-outline-dark" onClick={handleSearch}>Update</button>
            </div>
            <div class="col-md-auto">
              <p>{data.currentTable} <strong>Selected</strong> </p>
            </div>
          </div>
          <div class="p-2 row justify-content-md-left">
            {isMessageVis &&
              <Alert removeAlert={removeAlert} message={message} type={messageType} />}
          </div>
        </div>
        <div>


        </div>
        <div>
          {isLoading ? <Loading /> : <DataTable
            title={data.currentTable || "Students"}
            columns={columns}
            data={students}
            defaultSortFieldID={1}
            pagination
            onRowClicked={onRowClicked}
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            pointerOnHover
            selectableRowsComponent={BootyCheckbox}
          />}
        </div>
      </section>
    </article >
  );
}
