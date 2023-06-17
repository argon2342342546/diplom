import { Button } from "antd";
import { TableCell } from "./TableCell";
import s from "./style.module.scss";
import {
  PlusOutlined
} from '@ant-design/icons';

export function Table({
  columns,
  rows,
  data,
  onDataChange,
  onColumnAdd,
  onRowAdd,
  type
}) {
  const handleEdit = ({ value, i, j }) => {
    onDataChange(i, j, value);
  };

  return (
    <div className={s.container}>
      <div
        style={{
          padding: "16px",
        }}
        className={s["table-weapper"]}
      >
        <table className={s.table}>
          <thead className={s.thead}>
            <tr className={s.tr}>
              <th className={s.th} style={{ padding: 0 }}>
                <div className={s.buttons}>
                  <div className={s.top} onClick={onRowAdd}><PlusOutlined /></div>
                  <div className={s.bottom} onClick={onColumnAdd}><PlusOutlined /></div>
                </div>
              </th>
              {columns.map((i, index) => {
                return (
                  <th key={i.toString()} className={s.th}>
                    {i}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className={s.tbody}>
            {rows.map((r, i) => {
              return (
                <tr key={i.toString()} className={`${s.tr} ${s.sticky}`}>
                  <td className={`${s.td} ${s.sticky}`}>
                    <div>{r}</div>
                  </td>
                  {data[i].map((d, j) => {
                    return (
                      <td key={j.toString()} className={s.td}>
                        <TableCell
                          value={d}
                          i={i}
                          j={j}
                          onEdit={handleEdit}
                          type={type}
                        ></TableCell>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
