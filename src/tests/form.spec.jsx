import App from "../App";
import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Form Test", () => {
  test("追加時、表示が反映されているか", async () => {
    // testId(title)を指定して取得
    render(<App />);

    // 入力欄に入力
    fireEvent.change(screen.getByTestId("inputTitle"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByTestId("inputTime"), {
      target: { value: "10" },
    });

    // 追加ボタンをクリック
    fireEvent.click(screen.getByTestId("addButton"));

    // 追加された内容が表示されるか確認
    await (() => {
      expect(screen.getByText("test：10時間")).toBeInTheDocument();
    });
  });

  test("削除時、項目が減ること", async () => {
    render(<App />);

    // 初期の要素が表示されるのを待つ
    await (() => {
      expect(screen.getByText("test：10時間")).toBeInTheDocument();
    });

    // 最初の「削除」ボタンを取得（HTMLに対応するもの）
    // memo: 途中描画なので、awaitで待つ必要がある(getAllByTextではなくfindAllByText)
    const deleteButtons = await screen.findAllByText("削除");
    expect(deleteButtons.length).toBe(2); // 削除ボタンが2個ある

    // 1つ目の削除ボタンをクリック
    fireEvent.click(deleteButtons[0]);

    // 要素数が1つ減っているか確認
    await (() => {
      expect(deleteButtons.length).toBe(1);
    });
  });

  test("入力せず登録押下時、エラーを表示", async () => {
    render(<App />);

    fireEvent.click(screen.getByTestId("addButton"));

    expect(await screen.findAllByText("入力してください"));
  });
});
