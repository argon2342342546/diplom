import s from "./style.module.scss";

export function DataGridSpecial({ data, header }) {
  console.log("ggg", data);
  return (
    <div className={s.container}>
      <div>{header}</div>
      <div className={s["table-weapper"]}>
        <table className={s.table}>
          <thead className={s.thead}>
            <tr className={s.tr}>
              <th className={s.th}></th>
              {data.map((i, index) => {
                return (
                  <th key={i.toString()} className={s.th}>{`Эксперт ${
                    index + 1
                  }`}</th>
                );
              })}
              <th className={s.th}>Сумма</th>
              <th className={s.th}>Сумма квадратов расстояния Кемени</th>
            </tr>
          </thead>
          <tbody className={s.tbody}>
            {data.map((r, i) => {
              return (
                <tr key={i.toString()} className={`${s.tr}`}>
                  <td className={s.td}>
                    <div>{`Эксперт ${i + 1}`}</div>
                  </td>
                  {r.map((d, j) => {
                    return (
                      <td key={j.toString()} className={s.td}>
                        <div>{Number.isInteger(d) ? d : d.toFixed(2)}</div>
                      </td>
                    );
                  })}
                  <td className={s.td}>
                    <div>
                      {r.reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                        0
                      )}
                    </div>
                  </td>
                  <td className={s.td}>
                    <div>
                      {r.reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue * currentValue,
                        0
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
