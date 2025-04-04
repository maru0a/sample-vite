import { useEffect, useState } from "react";
import "./App.css";
import {
  getAllRecords,
  addRecord,
  deleteRecord,
} from "../utils/supabaseFunctions";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * データ取得
   */
  useEffect(() => {
    setLoading(true);
    const getRecords = async () => {
      const items = await getAllRecords();
      setRecords(items.data);

      setTotal(
        items.data.reduce((pre, current) => {
          return pre + current.time;
        }, parseInt(0))
      );
      setLoading(false);
    };
    getRecords();
    // setLoading(false); ここに書いたら、getRecordsの処理が走ってる時に先にfalseになっちゃうんだ..
  }, []);

  /**
   * 入力値を登録
   */
  const addItem = () => {
    setError("");

    //空の場合は登録しない
    if (title === "" || time === "" || time === 0)
      return setError("入力してください");

    addRecord(title, parseInt(time));
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

  /**
   * 削除処理
   */
  const deleteItem = (id) => {
    deleteRecord(id);
    setRecords((records) => {
      //memo：書くの苦戦した
      return records.filter((record) => {
        return record.id !== id;
      });
    });
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
        <button onClick={() => addItem()} style={{ width: "100%" }}>
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
      {loading && <div>loading...</div>}
      {!loading && (
        <div style={{ "margin-left": "20px" }}>
          <div>
            総合学習時間：
            {total ? total + "時間" : "記録がありません"}
          </div>
          <div>
            {records.map((item, key) => {
              return (
                <>
                  <p key={key}>
                    {item.title}：{item.time}時間
                  </p>
                  <div>{item.id}</div>
                  <button onClick={() => deleteItem(item.id)}>削除</button>
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
