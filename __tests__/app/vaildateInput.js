import App from "../../src/app/App.js";
import { mockQuestions, mockRandoms, getLogSpy, resetAll } from "../helpers/testUtils.js";

describe("App - 입력 예외 후 재입력 플로우", () => {
  beforeEach(() => resetAll());

  const findIndexByRegex = (calls, regex) => calls.findIndex((s) => regex.test(s));
  const findIndexByIncludes = (calls, text) => calls.findIndex((s) => s.includes(text));

  test.each(["0", "-1000", "999", "1000.5", "abc", ""])(
    "구입 금액 재입력: '%s' → [ERROR] → '2000'으로 정상 진행",
    async (bad) => {
      const log = getLogSpy();
      mockRandoms([[1,2,3,4,5,6],[11,12,13,14,15,16]]);
      mockQuestions([bad, "2000", "1,2,3,4,5,6", "7"]);

      const app = new App();
      await app.run();

      const calls = log.mock.calls.map((a) => String(a[0]).trim());
      const errIdx = findIndexByRegex(calls, /^\[ERROR\]/);
      const proceedIdx = findIndexByRegex(calls, /^\d+개를 구매했습니다\.?$/);
      expect(errIdx).toBeGreaterThan(-1);
      expect(proceedIdx).toBeGreaterThan(errIdx);
    }
  );

  test.each([
    "1,2,3,4,5", "1,2,3,4,5,6,7", "1,2,3,4,5,5",
    "0,2,3,4,5,6", "1,2,3,4,5,46", "1,2,3,4,5,a", "1,2,3,4,5,6.5",
  ])("당첨 번호 재입력: '%s' → [ERROR] → 정상 진행", async (badLucky) => {
    const log = getLogSpy();
    mockRandoms([[10,11,12,13,14,15]]);
    mockQuestions(["1000", badLucky, "1,2,3,4,5,6", "7"]);

    const app = new App();
    await app.run();

    const calls = log.mock.calls.map((a) => String(a[0]).trim());
    const errIdx = findIndexByRegex(calls, /^\[ERROR\]/);
    const statIdx = findIndexByIncludes(calls, "당첨 통계");
    expect(errIdx).toBeGreaterThan(-1);
    expect(statIdx).toBeGreaterThan(errIdx);
  });

  test.each(["0", "46", "a", "6.5"])(
    "보너스 번호 재입력: '%s' → [ERROR] → 정상 진행",
    async (badBonus) => {
      const log = getLogSpy();
      mockRandoms([[10,11,12,13,14,15]]);
      mockQuestions(["1000","1,2,3,4,5,6", badBonus, "7"]);

      const app = new App();
      await app.run();

      const calls = log.mock.calls.map((a) => String(a[0]).trim());
      const errIdx = findIndexByRegex(calls, /^\[ERROR\]/);
      const statIdx = findIndexByIncludes(calls, "당첨 통계");
      expect(errIdx).toBeGreaterThan(-1);
      expect(statIdx).toBeGreaterThan(errIdx);
    }
  );
});
