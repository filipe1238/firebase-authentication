import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Loading from "./Loading";
import { Firestore } from "firebase/firestore";
import { database } from "../firebaseConfig"
import { getDocs, collection, collectionGroup } from 'firebase/firestore';

function getNumberOfPages(rowCount, rowsPerPage) {
  return Math.ceil(rowCount / rowsPerPage);
}

function toPages(pages) {
  const results = [];

  for (let i = 1; i < pages; i++) {
    results.push(i);
  }

  return results;
}
const data = [
  {
    title: '213421',
    director: 'safasfas'
  },
  {
    title: '213421',
    director: 'safasfas'
  }
]

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
  }

];

// RDT exposes the following internal pagination properties
const BootyPagination = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage, // available but not used here
  currentPage
}) => {
  const handleBackButtonClick = () => {
    onChangePage(currentPage - 1);
  };

  const handleNextButtonClick = () => {
    onChangePage(currentPage + 1);
  };

  const handlePageNumber = (e) => {
    onChangePage(Number(e.target.value));
  };

  const pages = getNumberOfPages(rowCount, rowsPerPage);
  const pageItems = toPages(pages);
  const nextDisabled = currentPage === pageItems.length;
  const showButtons = !(currentPage === pageItems.length + 1);
  const previosDisabled = currentPage === 1;

  return (
    <nav>
      {showButtons && <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleBackButtonClick}
            disabled={previosDisabled}
            aria-disabled={previosDisabled}
            aria-label="previous page"
          >
            Previous
          </button>
        </li>
        {pageItems.map((page) => {
          const className =
            page === currentPage ? "page-item active" : "page-item";

          return (
            <li key={page} className={className}>
              <button
                className="page-link"
                onClick={handlePageNumber}
                value={page}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li className="page-item">
          <button
            className="page-link"
            onClick={handleNextButtonClick}
            disabled={nextDisabled}
            aria-disabled={nextDisabled}
            aria-label="next page"
          >
            Next
          </button>
        </li>
      </ul>}
    </nav>
  );
};

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

  const [students, setStudents] = useState([
    {}
  ]);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const collectionRef = collection(database, 'students');


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
        console.log(students)
        setLoading(false);

      }).catch((err) => {
        console.log(err.message)
      })
  }

  /*   useEffect(() => {
  
      getDocs(collectionRef)
        .then((response) => {
          setStudents(...students,
            response.docs.map((item) => {
              return { ...item.data(), id: item.id }
            })
          )
          console.log(students)
          setLoading(false);
  
        }).catch((err) => {
          console.log(err.message)
        })
    }, [collectionRef]) */
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
            paginationComponent={BootyPagination}
            selectableRows
            selectableRowsComponent={BootyCheckbox}
          />}
        </div>
      </section>
    </article >
  );
}
