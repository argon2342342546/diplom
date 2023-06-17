import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import s from "./style.module.scss";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

let db;
const request = indexedDB.open("projects");

request.onerror = (event) => {
  console.error("Why didn't you allow my web app to use IndexedDB?!");
};

request.addEventListener("success", (event) => {
  console.log("success");
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

export function Home({}) {
  const [items, setItems] = useState([]);
  let navigate = useNavigate();

  console.log("items", items);

  useEffect(() => {
    console.log(db);
    if (db) {
      let transaction = db.transaction(["projects"], "readwrite");
      const objectStore = transaction.objectStore("projects");
      const request = objectStore.getAll();
      request.onerror = (event) => {
        // Handle errors!
      };
      request.onsuccess = (e) => {
        // Do something with the request.result!
        console.log(e);

        const req = objectStore.getAllKeys();
        req.onerror = (event) => {
          // Handle errors!
        };
        req.onsuccess = (event) => {
          // Do something with the request.result!
          console.log(event);
          setItems(
            e.target.result.map((i, index) => ({
              ...i,
              key: event.target.result[index],
            }))
          );
        };
      };
    } else {
      onsuccess((event) => {
        console.log("onsuccess");
        let transaction = event.target.result.transaction(
          ["projects"],
          "readwrite"
        );
        const objectStore = transaction.objectStore("projects");
        const request = objectStore.getAll();

        request.onerror = (event) => {
          // Handle errors!
        };
        request.onsuccess = (e) => {
          // Do something with the request.result!
          console.log(e);

          const req = objectStore.getAllKeys();
          req.onerror = (event) => {
            // Handle errors!
          };
          req.onsuccess = (event) => {
            // Do something with the request.result!
            console.log(event);
            setItems(
              e.target.result.map((i, index) => ({
                ...i,
                key: event.target.result[index],
              }))
            );
          };
        };
      });
    }
  }, []);

  const onEdit = (id) => {
    navigate("/project/" + id);
  };

  const onDelete = (id) => {
    const request = db
      .transaction(["projects"], "readwrite")
      .objectStore("projects")
      .delete(id);
    request.onsuccess = (event) => {
      let transaction = db.transaction(["projects"], "readwrite");
      const objectStore = transaction.objectStore("projects");
      const request = objectStore.getAll();
      request.onerror = (event) => {
        // Handle errors!
      };
      request.onsuccess = (e) => {
        // Do something with the request.result!
        console.log(e);

        const req = objectStore.getAllKeys();
        req.onerror = (event) => {
          // Handle errors!
        };
        req.onsuccess = (event) => {
          // Do something with the request.result!
          console.log(event);
          setItems(
            e.target.result.map((i, index) => ({
              ...i,
              key: event.target.result[index],
            }))
          );
        };
      };
    };
  };

  return (
    <div className={s.container}>
      <div
        className={s.card}
        onClick={() => {
          navigate("/project");
        }}
      >
        <FileAddOutlined style={{ fontSize: "56px", color: "#1677ff" }} />
      </div>
      {items.map((item) => {
        return (
          <Card
            style={{
              width: 300,
            }}
            key={item.key}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <EditOutlined onClick={() => onEdit(item.key)} key="edit" />,
              <DeleteOutlined
                onClick={() => onDelete(item.key)}
                key="setting"
              />,
            ]}
          >
            <Meta title={item.name} />
          </Card>
        );
      })}
    </div>
  );
}
