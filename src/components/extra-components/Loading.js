import React from "react";
import LoadingGif from "../../images/loading.gif";
function Loading() {

  return (
    <div className="loading">
      {
        <img
          style=
          {{
            height: '10rem',
            display: 'block'
          }}
          src={LoadingGif}
          alt="Loading ... "
        />
      }
    </div>
  );
}

export default Loading;
