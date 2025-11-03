import Lotto from "../../src/model/Lotto.js";

describe("Lotto (도메인)", () => {
  test("6개가 아니면 예외", () => {
    expect(() => new Lotto([1,2,3,4,5])).toThrow("[ERROR]");
    expect(() => new Lotto([1,2,3,4,5,6,7])).toThrow("[ERROR]");
  });

  test("중복 숫자 예외", () => {
    expect(() => new Lotto([1,2,3,4,5,5])).toThrow("[ERROR]");
  });

  test("모든 번호는 1~45 정수", () => {
    expect(() => new Lotto([0,2,3,4,5,6])).toThrow("[ERROR]");
    expect(() => new Lotto([1,2,3,4,5,46])).toThrow("[ERROR]");
    expect(() => new Lotto([1,2,3,4,5,6.5])).toThrow("[ERROR]");
  });

  // 정책이라면 유지, 아니라면 제거 가능
  test("번호는 오름차순 보관", () => {
    const lotto = new Lotto([6,1,5,2,4,3]);
    expect(lotto.numbers).toEqual([1,2,3,4,5,6]);
  });
});