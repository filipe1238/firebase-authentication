import React from "react";
import { useQuery } from "react-query";


const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
};

const ApiTesting = () => {

  const { data, status, refetch } = useQuery("users", fetchUsers, {
    refetchOnWindowFocus: false,
    enabled: false
  });
  return (
    <div className="App text-center mt-3">
      <button
        className="btn btn-secondary"
        onClick={(e) => {
          refetch();
        }}>
        RELOAD
      </button>
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && (
        <div>
          {data.map((user) => (
            <p key={user.id}>{user.name}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default ApiTesting