import { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(0);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  const addRecord = () => {
    setError("");
    //空の場合は登録しない
    if (title === "" || time === "") return setError("入力してください");

    setRecords([
      ...records,
      {
        title: title,
        time: time,
      },
    ]);

    setTitle("");
    setTime(0);
  };

  return (
    <>
      <h1>学習記録一覧</h1>
      <div>
        <div>
          学習内容：
          <input
            type="text"
            value={title}
            placeholder="学習内容を記入してください"
            onChange={(event) => setTitle(event.target.value)} //MEMO：event.target.valueで詰まった
          />
        </div>
        <div>
          学習時間：
          <input
            type="number"
            value={time}
            placeholder="学習時間を記入してください"
            onChange={(event) => setTime(event.target.value)}
          />
        </div>
        <div>{error}</div>
        <button onClick={() => addRecord()}>追加</button>
        {/* ??：addRecordだとダメだっけ、addRecord()なら動いたけど変数指定していない時もこれだっけという */}
      </div>
      <div>
        入力中：
        <div>学習内容：{title}</div>
        <div>学習時間：{time}時間</div>
      </div>
      <ul>
        {records.map((item) => {
          return (
            <li>
              {item.title}：{item.time}時間
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
