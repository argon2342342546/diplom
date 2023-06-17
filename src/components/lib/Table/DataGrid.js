import s from "./style.module.scss";

export function DataGrid({ data, header }) {
  return (
    <div className={s.container}>
      <div>{header}</div>
      <div className={s["table-weapper"]}>
        <table className={s.table}>
          <tbody className={s.tbody}>
            {data.map((r, i) => {
              return (
                <tr key={i.toString()} className={`${s.tr}`}>
                  {r.map((d, j) => {
                    return (
                      <td key={j.toString()} className={s.td}>
                        <div>{Number.isInteger(d) ? d : d.toFixed(2)}</div>
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
