import React from "react";

export const Table = ({ tableData, tableheadings }) => {
  return (
    <div className="table">
      <table>
        <thead>
          {tableheadings.map((heading) => (
            <th>{heading}</th>
          ))}
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr>
              <td>{row.Managers}</td>
              {tableheadings.slice(1).map((heading) => (
                <td>{row[heading]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
