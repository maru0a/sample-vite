import { useEffect, useState } from "react";
import "./App.css";
import { getAllRecords } from "../utils/supabaseFunctions";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const getRecords = async () => {
      const records = await getAllRecords();
      console.log(records);
    };
    getRecords();
  }, []);

  const addRecord = () => {
    setError("");

    //空の場合は登録しない
    if (title === "" || time === "" || time === 0)
      return setError("入力してください");

    setRecords([
      ...records,
      {
        title: title,
        time: parseInt(time),
      },
    ]);

    setTotal(
      records.reduce((pre, current) => {
        return pre + current.time;
      }, parseInt(time))
    );

    setTitle("");
    setTime("");
  };

  return (
    <>
      <h1>学習記録一覧</h1>
      <div>
        <div style={{ display: "flex", "margin-bottom": "5px" }}>
          学習内容：
          <input
            type="text"
            value={title}
            placeholder="学習内容を記入してください"
            onChange={(event) => setTitle(event.target.value)} //MEMO：event.target.valueで詰まった
            style={{ flex: 1 }} //MEMO：直で書く時って「""」で囲わないとエラー出るんだ...
          />
        </div>
        <div style={{ display: "flex" }}>
          <div>学習時間：</div>
          <input
            type="number"
            value={time}
            placeholder="学習時間を記入してください"
            onChange={(event) => setTime(event.target.value)}
            style={{ flex: 1 }}
          />
        </div>
        <div>{error}</div>
        <button onClick={() => addRecord()} style={{ width: "100%" }}>
          追加
        </button>
        {/* ??：addRecordだとダメだっけ、addRecord()なら動いたけど変数指定していない時もこれだっけという */}
      </div>
      {/* <div>
        入力中：
        <div>学習内容：{title}</div>
        <div>学習時間：{time}時間</div>
      </div> */}
      <h3 style={{ "margin-top": "40px" }}>学習履歴</h3>
      <div style={{ "margin-left": "20px" }}>
        <div>総合学習時間：{total ? total + "時間" : "記録がありません"}</div>
        <div>
          {records.map((item) => {
            return (
              <p>
                {item.title}：{item.time}時間
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
