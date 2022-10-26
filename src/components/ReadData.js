import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Loading from "./extra-components/Loading";
import { useNavigate } from "react-router-dom"
import Alert from './Alert';
import { database } from "../firebaseConfig"
import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore';
import ReadDataHeader from "./headers/ReadDataHeader";


const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
  <div className="form-check">
    <input
      htmlFor="booty-check"
      type="checkbox"
      className="form-check-input"
      ref={ref}
      onClick={onClick}
      {...rest} />
    <label className="form-check-label" id="booty-check" />
  </div>
));

export default function ReadData() {
  const [dynamicColumns, setDynamicColumns] = useState([
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
    },
  ]);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({ currentTable: 'Select One' });
  const [collectionRef, setCollectionRef] = useState({});
  const [message, setMessage] = useState('initial message, no errors')
  const [messageType, setMessageType] = useState('');
  const [isMessageVis, setMessageVis] = useState(false);

  useEffect(() => {
    if (database && data.currentTable)
      setCollectionRef(collection(database, data.currentTable));
  }, [data.currentTable]);

  const removeAlert = () => {
    setMessage('');
    setMessageType('');
    setMessageVis(false);
  }
  const showAlert = (message, type) => {
    setMessage(message)
    setMessageType(type)
    setMessageVis(true);
  }



  const columns = [
    ...dynamicColumns,
    !students
      ? { name: "Delete Row" }
      : {
        name: "Delete Row",
        sortable: true,
        cell: (row) => <button className="btn btn-outline-dark" onClick={(e) => {
          const docRef = doc(database, data.currentTable, row.id);
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
    navigate(`/readdata/${data.currentTable}/${id}`);
  }
  const onRowClicked = (row, event) => { handleEdit(event, row.id); };

  return (
    <article className="App">
      <section className="card">
        <ReadDataHeader data={data} handleChange={handleChange} handleSearch={handleSearch} />
        <div className="p-2 row justify-content-md-left">
          {isMessageVis &&
            <Alert removeAlert={removeAlert} message={message} type={messageType} />}
        </div>
        <div>
          {isLoading ? <Loading /> : <DataTable
            title={data.currentTable || "Please select one Table"}
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
