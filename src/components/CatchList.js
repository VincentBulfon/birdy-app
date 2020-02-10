import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function CatchList(props) {
  //state
  const [data, setData] = useState();

  const convertTime = timestamp => {
    var firebaseTimeStamp = timestamp;

    var months_arr = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12"
    ];

    // Convert timestamp to milliseconds
    var date = new Date(firebaseTimeStamp * 1000);

    var year = date.getFullYear();
    var month = months_arr[date.getMonth()];
    var day = date.getDate();

    //format
    var convertedTime = year + " " + month + " " + day + " ";

    const time = convertedTime;
    return time;
  };
  useEffect(() => {
    setData(props.list);
  }, [props]);

  return (
    <div>
      {data ? (
        <ul className="listContainer">
          {data ? (
            data.map(el => {
              const { id } = el;
              const { bird, date } = el.data();
              return (
                <li key={id} className="catch">
                  <NavLink className="catch_link"
                    to={{
                      pathname: `/Lists/Catch/${id}`,
                      aboutProps: { el }
                    }}>
                    <span className="catch_name"><span className="bold">Nom</span> :{bird.name}</span>
                    <span className="catch_date"><span className="bold">Date :</span>{convertTime(date.seconds)}</span>
                    <span className="catch_sex"><span className="bold">Sexe</span> :{bird.sex}</span>
                    <span className="catch_ring"><span className="bold">Bague :</span>{bird.ring}</span>
                  </NavLink>
                </li>
              );
            })
          ) : (
            <p>Aucune donnée ne correspond à cet utilisateur</p>
          )}
        </ul>
      ) : (
        <p>Chargment</p>
      )}
    </div>
  );
}
