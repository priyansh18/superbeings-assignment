import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Table } from "./components/Table";
import { Dropdown } from "./components/Dropdown";

const App = () => {
  const [datas, setDatas] = useState([]);
  const [definitions, setDefinitions] = useState([]);
  const [topicOptions, selectTopicOptions] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableheading, setTableHeading] = useState([]);
  const [currentIndex, setCurrentIndex] = useState("");
  const [currentTopic, setCurrentTopic] = useState("");
  const [managerNames, setManagerNames] = useState([]);

  const indexesOptions = [
    "Engagement",
    "Manager Satisfaction",
    "Job Satisfaction",
  ];

  // score of each manager in each index category : in form of
  // tableData = [{managerName:"manager1", eng:"1", man:"2", jba:"3" }, {}]
  const setTableContent = (managersNames, filterArray, checkArray) => {
    console.log(managersNames);
    const tableData = managersNames.reduce((acc, managerName) => {
      const ans = filterArray.reduce((acc2, dataEntry) => {
        if (
          dataEntry.manager === managerName &&
          checkArray.includes(dataEntry.parameter)
        ) {
          acc2[dataEntry.parameter] = dataEntry.score;
        }
        return acc2;
      }, {});

      acc.push({ Managers: managerName, ...ans });
      console.log(acc);
      return acc;
    }, []);
    console.log("SDAD", tableData);

    setTableData(tableData);
    console.log(tableData);
    setTableHeading(Object.keys(tableData[0]));
  };

  useEffect(() => {
    const dataResponse = async () => {
      const {
        data: { data, definitions },
      } = await axios(
        `https://run.mocky.io/v3/09a1870d-294b-4d53-ac4f-87b676ddd000`
      );
      setDatas(data);
      setDefinitions(definitions);

      const managersNames = [
        ...new Set(data.map((dataEntry) => dataEntry.manager)),
      ];
      setManagerNames(managersNames);
      // initial load
      setTableContent(managersNames, data, indexesOptions);
    };

    dataResponse();
  }, [indexesOptions]);

  const onSelectIndex = (selectedIndex) => {
    const selectedDefinitions = definitions.filter(
      (definition) => definition.index === selectedIndex
    );

    const selectedDefinitionsTopics = selectedDefinitions.map(
      (definition) => definition.topic
    );

    // fill in topic dropdown
    selectTopicOptions(selectedDefinitionsTopics);
    // set the current selected Index
    setCurrentIndex(selectedIndex);
  };

  const onSelectTopic = (selectedTopic) => {
    setCurrentTopic(selectedTopic, currentIndex);

    const selectedDefinitions = definitions.filter(
      (definition) =>
        definition.index === currentIndex && definition.topic === selectedTopic
    );

    const selectedDefinitionsSubTopics = selectedDefinitions.map(
      (definition) => definition.subTopic
    );

    setTableContent(managerNames, datas, selectedDefinitionsSubTopics);
    //   const tableData = managerNames.reduce((acc, managerName) => {
    //     const ans = datas.reduce((acc2, dataEntry) => {
    //       if (
    //         dataEntry.manager === managerName &&
    //         selectedDefinitionsSubTopics.includes(dataEntry.parameter)
    //       ) {
    //         acc2[dataEntry.parameter] = dataEntry.score;
    //       }
    //       return acc2;
    //     }, {});

    //     acc.push({ Managers: managerName, ...ans });
    //     return acc;
    //   }, []);

    //   setTableData(tableData);
    //   console.log(tableData);
    //   setTableHeading(Object.keys(tableData[0]));
  };

  return (
    <div className="App">
      {/* Dropdown row */}
      <table>
        <tr>
          <td colspan="5">
            <Dropdown
              heading="index"
              options={indexesOptions}
              onSelect={onSelectIndex}
              currentIndex={currentIndex}
            />
            <Dropdown
              heading="topic"
              options={topicOptions}
              onSelect={onSelectTopic}
              currentTopic={currentTopic}
            />
          </td>
        </tr>
      </table>
      <Table tableData={tableData} tableheadings={tableheading} />
    </div>
  );
};

export default App;
