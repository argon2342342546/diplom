import React, { useState, useEffect } from "react";
import { Table } from "../../components/lib/Table";
import { Graph } from "../../components/lib/Graph";
import { Button, Form, Input } from "antd";
import { calc } from "./calc";
import { DataGrid } from "../../components/lib/Table/DataGrid";
import { DataGridSpecial } from "../../components/lib/Table/DataGridSpecial";
import { useParams } from "react-router-dom";
import s from "./style.module.scss";
import { SaveOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { message, Tabs } from "antd";
import { calcPuro } from "./calcPuro";
import { DownloadOutlined } from "@ant-design/icons";
import { Radio, Space, Divider } from "antd";

let db;
const request = indexedDB.open("projects");

request.onerror = (event) => {
  console.error("Why didn't you allow my web app to use IndexedDB?!");
};

request.addEventListener("success", (event) => {
  db = event.target.result;
});
request.onupgradeneeded = function () {
  let db = request.result;
  if (!db.objectStoreNames.contains("projects")) {
    let objectStore = db.createObjectStore("projects", {
      autoIncrement: true,
    });
  }
};
const onsuccess = (call) => {
  request.addEventListener("success", call);
};

export function Project({}) {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [calcData, setCalcData] = useState([]);
  const [calculated, setCalculated] = useState(false);
  const [name, setName] = useState("Project name");
  const [nameEdit, setNameEdit] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [dataPuro, setDataPuro] = useState([]);
  const [columnsPuro, setColumnsPuro] = useState([]);
  const [rowsPuro, setRowsPuro] = useState([]);
  const [calcDataPuro, setCalcDataPuro] = useState([]);
  const [calculatedPuro, setCalculatedPuro] = useState(false);
  const [calculatedPuroTwo, setCalculatedPuroTwo] = useState(false);

  let projectId = useParams().projectId;
  let navigate = useNavigate();

  const [Ep, setEp] = useState(5);
  const [Eg, setEg] = useState(0.4);
  const [Eh, setEh] = useState(0.7);
  const [Es, setEs] = useState(0);

  const [paramPuro, setParamPuro] = useState(0);

  const [col, setC] = useState(0);
  const [row, setR] = useState(0);

  useEffect(() => {
    if (db) {
      if (projectId) {
        var transaction = db.transaction(["projects"], "readwrite");
        const objectStore = transaction.objectStore("projects");
        const request = objectStore.get(parseInt(projectId));
        request.onerror = (event) => {
          // Handle errors!
        };
        request.onsuccess = (event) => {
          // Do something with the request.result!
          setData(event.target.result.data);
          setColumns(event.target.result.columns);
          setRows(event.target.result.rows);
          setCalcData(event.target.result.calcData);
          setCalculated(event.target.result.calculated);

          setDataPuro(event.target.result.dataPuro);
          setColumnsPuro(event.target.result.columnsPuro);
          setRowsPuro(event.target.result.rowsPuro);
          setCalcDataPuro(event.target.result.calcDataPuro);
          setCalculatedPuro(event.target.result.calculatedPuro);

          setName(event.target.result.name);
          setEp(event.target.result.Ep);
          setEg(event.target.result.Eg);
          setEh(event.target.result.Eh);
          setEs(event.target.result.Es);
          setParamPuro(event.target.result.paramPuro);
          setCalculatedPuroTwo(event.target.result.calculatedPuroTwo);
        };
      }
    } else {
      onsuccess((event) => {
        if (projectId) {
          var transaction = event.target.result.transaction(
            ["projects"],
            "readwrite"
          );
          const objectStore = transaction.objectStore("projects");
          const request = objectStore.get(parseInt(projectId));
          request.onerror = (event) => {
            // Handle errors!
          };
          request.onsuccess = (event) => {
            // Do something with the request.result!
            setData(event.target.result.data);
            setColumns(event.target.result.columns);
            setRows(event.target.result.rows);
            setCalcData(event.target.result.calcData);
            setCalculated(event.target.result.calculated);

            setDataPuro(event.target.result.dataPuro);
            setColumnsPuro(event.target.result.columnsPuro);
            setRowsPuro(event.target.result.rowsPuro);
            setCalcDataPuro(event.target.result.calcDataPuro);
            setCalculatedPuro(event.target.result.calculatedPuro);

            setName(event.target.result.name);
            setEp(event.target.result.Ep);
            setEg(event.target.result.Eg);
            setEh(event.target.result.Eh);
            setEs(event.target.result.Es);
            setParamPuro(event.target.result.paramPuro);
            setCalculatedPuroTwo(event.target.result.calculatedPuroTwo);
          };
        }
      });
    }
  }, []);

  const save = () => {
    if (projectId) {
      var transaction = db.transaction(["projects"], "readwrite");
      var objectStore = transaction.objectStore("projects");
      const request = objectStore.get(parseInt(projectId));
      request.onerror = (event) => {
        // Handle errors!
      };
      request.onsuccess = (event) => {
        // Get the old value that we want to update
        const rec = {
          data,
          columns,
          rows,
          Ep,
          Eg,
          Eh,
          Es,
          name,
          calcData,
          calculated,
          dataPuro,
          columnsPuro,
          rowsPuro,
          calcDataPuro,
          calculatedPuro,
          paramPuro,
          calculatedPuroTwo,
        };

        // Put this updated object back into the database.
        const requestUpdate = objectStore.put(rec, parseInt(projectId));
        requestUpdate.onerror = (event) => {
          // Do something with the error
        };
        requestUpdate.onsuccess = (event) => {
          messageApi.open({
            type: "success",
            content: "Success",
          });
          // Success - the data is updated!
        };
      };
    } else {
      var transaction = db.transaction(["projects"], "readwrite");
      var testStore = transaction.objectStore("projects");
      var test = {
        data,
        columns,
        rows,
        Ep,
        Eg,
        Eh,
        Es,
        name,
        calcData,
        calculated,
        dataPuro,
        columnsPuro,
        rowsPuro,
        calcDataPuro,
        calculatedPuro,
        paramPuro,
        calculatedPuroTwo,
      };
      var request = testStore.add(test);
      request.onerror = function (e) {
        console.log("Error", e.target.error.name);
      };
      request.onsuccess = function (e) {
        projectId = e.target.result;
        messageApi.open({
          type: "success",
          content: "Success",
        });
        navigate("/project/" + e.target.result);
      };
    }
  };

  const handleDataChange = (i, j, value) => {
    const newData = [...data];
    newData[i][j] = value;

    setData(newData);
  };

  const handleColumnAdd = () => {
    const newColumns = [...columns, `Продукт ${columns.length + 1}`];

    setColumns(newColumns);

    const newData = [...data];

    for (let i = 0; i < newData.length; i++) {
      newData[i].push(0);
    }

    setData(newData);
  };

  const handleRowAdd = () => {
    const newRows = [...rows, `Функция ${rows.length + 1}`];
    setRows(newRows);

    const newData = [...data];
    const newArr = [];

    for (let i = 0; i < columns.length; i++) {
      newArr[i] = 0;
    }

    newData.push(newArr);

    setData(newData);
  };

  const transform = (d) => {
    let result = [];
    for (let i = 0; i < d.length; i++) {
      for (let j = 0; j < d[i].length; j++) {
        if (!result[j]) {
          result[j] = [];
        }
        result[j].push(parseInt(d[i][j]));
      }
    }
    return result;
  };

  const handleCalc = () => {
    const k = calc(
      transform(data),
      {
        Ep: parseFloat(Ep),
        Eg: parseFloat(Eg),
        Eh: parseFloat(Eh),
        Es: parseFloat(Es),
      },
      columns.length
    );
    console.log("k", k);
    setCalculated(false);
    setTimeout(() => {
      setCalcData(k);
      setCalculated(true);
    }, 1);
  };

  const handleCalcPuro = async () => {
    fetch("http://localhost:5000/puro", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: transform(dataPuro) }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        const k = calcPuro(
          transform(dataPuro),
          {
            Ep: parseFloat(Ep),
            Eg: parseFloat(Eg),
            Eh: parseFloat(Eh),
            Es: parseFloat(Es),
          },
          rowsPuro.length,
          columnsPuro.length
        );
        console.log("k", k);
        setCalculatedPuro(false);
        setTimeout(() => {
          setCalcDataPuro(k);
          setCalculatedPuro(true);
        }, 1);
      });
  };

  const handleDoubleClickName = () => {
    setNameEdit(true);
  };

  const handleDataChangePuro = (i, j, value) => {
    const newData = [...dataPuro];
    newData[i][j] = value;

    setDataPuro(newData);
  };

  const handleColumnAddPuro = () => {
    const newColumns = [...columnsPuro, `Эксперт ${columnsPuro.length + 1}`];

    setColumnsPuro(newColumns);

    const newData = [...dataPuro];

    for (let i = 0; i < newData.length; i++) {
      newData[i].push(0);
    }

    setDataPuro(newData);
  };

  const handleRowAddPuro = () => {
    const newRows = [...rowsPuro, `Объект ${rowsPuro.length + 1}`];
    setRowsPuro(newRows);

    const newData = [...dataPuro];
    const newArr = [];

    for (let i = 0; i < columnsPuro.length; i++) {
      newArr[i] = 0;
    }

    newData.push(newArr);

    setDataPuro(newData);
  };

  function csvToArray(str, delimiter = ",") {
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const arr = rows.map(function (row, i) {
      const values = row.split(delimiter);
      return values;
    });

    // return the array
    return arr;
  }

  const calcDpor = (data) => {
    let Dpor = [];

    for (let i = 0; i < data.length; i++) {
      Dpor[i] = [];
    }

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (0 < data[i][j] && data[i][j] <= parseFloat(paramPuro)) {
          Dpor[i][j] = 1;
        } else {
          Dpor[i][j] = 0;
        }
      }
    }

    console.log(Dpor);

    return Dpor;
  };

  console.log("calcDataPuro", calcDataPuro);

  return (
    <div>
      <div className={s.nav}>
        <div
          className={`${s.item} ${s.start}`}
          onDoubleClick={handleDoubleClickName}
        >
          {nameEdit ? (
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              onBlur={() => {
                setNameEdit(false);
              }}
              value={name}
            ></input>
          ) : (
            name
          )}
        </div>
        <div className={`${s.item} ${s.end}`} onClick={save}>
          <SaveOutlined style={{ fontSize: "32px" }} />
        </div>
      </div>
      <div className={`${s.container}`}>
        <Tabs
          defaultActiveKey="0"
          style={{
            minHeight: 770,
          }}
          items={[
            {
              label: "Функциональная полнота",
              key: "0",
              disabled: false,
              children: (
                <Tabs
                  defaultActiveKey="0"
                  style={{
                    minHeight: 770,
                  }}
                  items={[
                    {
                      label: "Исходная таблица",
                      key: "0",
                      disabled: false,
                      children:
                        data.length && columns.length && rows.length ? (
                          <Table
                            data={data}
                            columns={columns}
                            rows={rows}
                            onDataChange={handleDataChange}
                            onColumnAdd={handleColumnAdd}
                            onRowAdd={handleRowAdd}
                          ></Table>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Form
                              layout="horizontal"
                              style={{
                                maxWidth: 600,
                                background: "#fff",
                                padding: "16px",
                                border: "1px solid #d9d9d9",
                                borderRadius: "10px",
                                boxShadow: "0 2px 0 rgba(0, 0, 0, 0.02)",
                              }}
                            >
                              <Form.Item label="Столбцы">
                                <Input
                                  value={col}
                                  onChange={(e) => {
                                    setC(e.target.value);
                                  }}
                                  type="number"
                                ></Input>
                              </Form.Item>
                              <Form.Item label="Строки">
                                <Input
                                  value={row}
                                  onChange={(e) => {
                                    setR(e.target.value);
                                  }}
                                  type="number"
                                ></Input>
                              </Form.Item>
                              <Form.Item>
                                <Space>
                                  <Button
                                    onClick={() => {
                                      let newColumns = [];

                                      let newRows = [];

                                      for (
                                        let index = 0;
                                        index < col;
                                        index++
                                      ) {
                                        newColumns = [
                                          ...newColumns,
                                          `Продукт ${index + 1}`,
                                        ];
                                      }
                                      for (
                                        let index = 0;
                                        index < row;
                                        index++
                                      ) {
                                        newRows = [
                                          ...newRows,
                                          `Функция ${index + 1}`,
                                        ];
                                      }

                                      setColumns(newColumns);
                                      setRows(newRows);

                                      let newData = [];
                                      for (let i = 0; i < row; i++) {
                                        newData[i] = [];
                                        for (let j = 0; j < col; j++) {
                                          newData[i][j] = 0;
                                        }
                                      }
                                      setC(0);
                                      setR(0);
                                      setData(newData);
                                    }}
                                  >
                                    Создать
                                  </Button>

                                  <label class="input-file">
                                    <input
                                      type="file"
                                      className="input-file"
                                      onChange={(e) => {
                                        e.preventDefault();
                                        const input = e.target.files[0];
                                        const reader = new FileReader();

                                        reader.onload = function (e) {
                                          const text = e.target.result;
                                          const data = csvToArray(text);
                                          const newdata = [];

                                          for (
                                            let i = 0;
                                            i < data[0].length;
                                            i++
                                          ) {
                                            newdata[i] = [];
                                            for (
                                              let j = 0;
                                              j < data.length;
                                              j++
                                            ) {
                                              newdata[i][j] = data[j][i];
                                            }
                                          }

                                          let newColumns = [];

                                          let newRows = [];

                                          for (
                                            let index = 0;
                                            index < data.length;
                                            index++
                                          ) {
                                            newColumns = [
                                              ...newColumns,
                                              `Продукт ${index + 1}`,
                                            ];
                                          }
                                          for (
                                            let index = 0;
                                            index < data[0].length;
                                            index++
                                          ) {
                                            newRows = [
                                              ...newRows,
                                              `Функция ${index + 1}`,
                                            ];
                                          }

                                          setColumns(newColumns);
                                          setRows(newRows);
                                          setData(newdata);
                                        };

                                        reader.readAsText(input);
                                      }}
                                      accept=".csv"
                                    />
                                    <span>Выберите файл</span>
                                  </label>
                                </Space>
                              </Form.Item>
                            </Form>
                          </div>
                        ),
                    },
                    {
                      label: "Пороговые значения",
                      key: "1",
                      disabled: false,
                      children: (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Form
                            labelCol={{
                              span: 4,
                            }}
                            wrapperCol={{
                              span: 14,
                            }}
                            layout="horizontal"
                            style={{
                              maxWidth: 600,
                              background: "#fff",
                              padding: "16px",
                              border: "1px solid #d9d9d9",
                              borderRadius: "10px",
                              boxShadow: "0 2px 0 rgba(0, 0, 0, 0.02)",
                            }}
                          >
                            <Form.Item label="Ep">
                              <Input
                                value={Ep}
                                onChange={(e) => {
                                  setEp(e.target.value);
                                }}
                                type="number"
                              ></Input>
                            </Form.Item>
                            <Form.Item label="Eg">
                              <Input
                                value={Eg}
                                onChange={(e) => {
                                  setEg(e.target.value);
                                }}
                                type="number"
                              ></Input>
                            </Form.Item>
                            <Form.Item label="Eh">
                              <Input
                                value={Eh}
                                onChange={(e) => {
                                  setEh(e.target.value);
                                }}
                                type="number"
                              ></Input>
                            </Form.Item>
                            <Form.Item label="Es">
                              <Input
                                value={Es}
                                onChange={(e) => {
                                  setEs(e.target.value);
                                }}
                                type="number"
                              ></Input>
                            </Form.Item>
                            <Form.Item>
                              <Button onClick={handleCalc}>Calculate</Button>
                            </Form.Item>
                          </Form>
                        </div>
                      ),
                    },
                    {
                      label: "Матрица пересечения",
                      key: "2",
                      disabled: !calculated,
                      children: calculated && (
                        <DataGrid data={calcData.P11} header="P11" />
                      ),
                    },
                    {
                      label: "Матрица разности",
                      key: "3",
                      disabled: !calculated,
                      children: calculated && (
                        <DataGrid data={calcData.P10} header="P10" />
                      ),
                    },
                    {
                      label: "Матрица согласования",
                      key: "4",
                      disabled: !calculated,
                      children: calculated && (
                        <DataGrid data={calcData.P01} header="P01" />
                      ),
                    },
                    {
                      label: "Матрица рассогласования",
                      key: "5",
                      disabled: !calculated,
                      children: calculated && (
                        <DataGrid data={calcData.S} header="S" />
                      ),
                    },
                    {
                      label: "Матрица поглощения",
                      key: "6",
                      disabled: !calculated,
                      children: calculated && (
                        <DataGrid data={calcData.H} header="H" />
                      ),
                    },
                    {
                      label: "Матрица Жаккарда",
                      key: "7",
                      disabled: !calculated,
                      children: calculated && (
                        <DataGrid data={calcData.G} header="G" />
                      ),
                    },
                    {
                      label: "Логическая матрица согласования",
                      key: "8",
                      disabled: !calculated,
                      children: calculated && (
                        <DataGrid data={calcData.P0} header="P0" />
                      ),
                    },
                    {
                      label: "Логическая матрица Жаккарда",
                      key: "9",
                      disabled: !calculated,
                      children: calculated && (
                        <DataGrid data={calcData.G0} header="G0" />
                      ),
                    },
                    {
                      label: "Логическая матрица рассогласования",
                      key: "10",
                      disabled: !calculated,
                      children: calculated && (
                        <DataGrid data={calcData.S0} header="S0" />
                      ),
                    },
                    {
                      label: "Логическая матрица поглощения",
                      key: "11",
                      disabled: !calculated,
                      children: calculated && (
                        <DataGrid data={calcData.H0} header="H0" />
                      ),
                    },
                    {
                      label: "Граф согласования",
                      key: "12",
                      disabled: !calculated,
                      children: calculated && (
                        <Graph data={calcData.P0} header="P0"></Graph>
                      ),
                    },
                    {
                      label: "Граф Жаккарда",
                      key: "13",
                      disabled: !calculated,
                      children: calculated && (
                        <Graph data={calcData.G0} header="G0"></Graph>
                      ),
                    },
                    {
                      label: "Граф рассогласования",
                      key: "14",
                      disabled: !calculated,
                      children: calculated && (
                        <Graph data={calcData.S0} header="S0"></Graph>
                      ),
                    },
                    {
                      label: "Граф поглощения",
                      key: "15",
                      disabled: !calculated,
                      children: calculated && (
                        <Graph data={calcData.H0} header="H0"></Graph>
                      ),
                    },
                  ]}
                />
              ),
            },
            {
              label: "ПУРО",
              key: "1",
              disabled: false,
              children: (
                <Tabs
                  defaultActiveKey="0"
                  style={{
                    minHeight: 770,
                  }}
                  items={[
                    {
                      label: "Таблица оценок",
                      key: "0",
                      disabled: false,
                      children:
                        dataPuro.length &&
                        columnsPuro.length &&
                        rowsPuro.length ? (
                          <>
                            <Button onClick={handleCalcPuro}>Рассчитать</Button>
                            <Table
                              type="puro"
                              data={dataPuro}
                              columns={columnsPuro}
                              rows={rowsPuro}
                              onDataChange={handleDataChangePuro}
                              onColumnAdd={handleColumnAddPuro}
                              onRowAdd={handleRowAddPuro}
                            ></Table>
                          </>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Form
                              layout="horizontal"
                              style={{
                                maxWidth: 600,
                                background: "#fff",
                                padding: "16px",
                                border: "1px solid #d9d9d9",
                                borderRadius: "10px",
                                boxShadow: "0 2px 0 rgba(0, 0, 0, 0.02)",
                              }}
                            >
                              <Form.Item label="Столбцы">
                                <Input
                                  value={col}
                                  onChange={(e) => {
                                    setC(e.target.value);
                                  }}
                                  type="number"
                                ></Input>
                              </Form.Item>
                              <Form.Item label="Строки">
                                <Input
                                  value={row}
                                  onChange={(e) => {
                                    setR(e.target.value);
                                  }}
                                  type="number"
                                ></Input>
                              </Form.Item>
                              <Form.Item>
                                <Space>
                                  <Button
                                    onClick={() => {
                                      let newColumns = [];

                                      let newRows = [];

                                      for (
                                        let index = 0;
                                        index < col;
                                        index++
                                      ) {
                                        newColumns = [
                                          ...newColumns,
                                          `Эксперт ${index + 1}`,
                                        ];
                                      }
                                      for (
                                        let index = 0;
                                        index < row;
                                        index++
                                      ) {
                                        newRows = [
                                          ...newRows,
                                          `Объект ${index + 1}`,
                                        ];
                                      }

                                      setColumnsPuro(newColumns);
                                      setRowsPuro(newRows);

                                      let newData = [];
                                      for (let i = 0; i < row; i++) {
                                        newData[i] = [];
                                        for (let j = 0; j < col; j++) {
                                          newData[i][j] = 0;
                                        }
                                      }
                                      setC(0);
                                      setR(0);
                                      setDataPuro(newData);
                                    }}
                                  >
                                    Создать
                                  </Button>
                                  <label class="input-file">
                                    <input
                                      type="file"
                                      className="input-file"
                                      onChange={(e) => {
                                        e.preventDefault();
                                        const input = e.target.files[0];
                                        const reader = new FileReader();

                                        reader.onload = function (e) {
                                          const text = e.target.result;
                                          const data = csvToArray(text);
                                          const newdata = [];

                                          for (
                                            let i = 0;
                                            i < data[0].length;
                                            i++
                                          ) {
                                            newdata[i] = [];
                                            for (
                                              let j = 0;
                                              j < data.length;
                                              j++
                                            ) {
                                              newdata[i][j] = data[j][i];
                                            }
                                          }

                                          let newColumns = [];

                                          let newRows = [];

                                          for (
                                            let index = 0;
                                            index < data.length;
                                            index++
                                          ) {
                                            newColumns = [
                                              ...newColumns,
                                              `Эксперт ${index + 1}`,
                                            ];
                                          }
                                          for (
                                            let index = 0;
                                            index < data[0].length;
                                            index++
                                          ) {
                                            newRows = [
                                              ...newRows,
                                              `Объект ${index + 1}`,
                                            ];
                                          }

                                          setColumnsPuro(newColumns);
                                          setRowsPuro(newRows);
                                          setDataPuro(newdata);
                                        };

                                        reader.readAsText(input);
                                      }}
                                      accept=".csv"
                                    />
                                    <span>Выберите файл</span>
                                  </label>
                                </Space>
                              </Form.Item>
                            </Form>
                          </div>
                        ),
                    },
                    {
                      label: "Расстояния ранжирования",
                      key: "1",
                      disabled: !calculatedPuro,
                      children: (
                        <>
                          <Form.Item label="Пороговое значение">
                            <Input
                              style={{ maxWidth: "200px", marginRight: "15px" }}
                              value={paramPuro}
                              onChange={(e) => {
                                setParamPuro(e.target.value);
                              }}
                              type="number"
                            ></Input>
                            <Button
                              onClick={() => {
                                setCalculatedPuroTwo(true);
                                setCalcDataPuro({
                                  ...calcDataPuro,
                                  Dpor: calcDpor(calcDataPuro.D0),
                                });
                              }}
                            >
                              Рассчитать
                            </Button>
                          </Form.Item>
                          <DataGridSpecial data={calcDataPuro.D} />
                          <DataGrid
                            data={calcDataPuro.D0}
                            header="Относительный вид"
                          />
                        </>
                      ),
                    },
                    /*{
                      label: "Матрицы упорядочения",
                      key: "2",
                      disabled: !calculatedPuro,
                      children:
                        calculatedPuro &&
                        calcDataPuro.E.map((item, i) => {
                          return (
                            <DataGrid
                              data={item}
                              header={"Эксперт " + (i + 1)}
                            ></DataGrid>
                          );
                        }),
                    },
                    {
                      label: "Взаимосвязи",
                      key: "3",
                      disabled: !calculatedPuro && !calculatedPuroTwo,
                      children: <DataGrid data={calcDataPuro.Dpor}></DataGrid>,
                    },*/
                    {
                      label: "График взаимосвязей",
                      key: "4",
                      disabled: !calculatedPuro && !calculatedPuroTwo,
                      children: (
                        <Graph data={calcDataPuro.Dpor} header=""></Graph>
                      ),
                    },
                  ]}
                />
              ),
            },
          ]}
        />
      </div>
      {contextHolder}
    </div>
  );
}
