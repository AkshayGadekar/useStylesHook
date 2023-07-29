import {
  renderHook
} from "@testing-library/react";
import { type Theme } from "@mui/material/styles";
import user from "@testing-library/user-event";
import { makeStyles } from "../index";

describe("test useStyles in all scenarios", () => {
  it("as simple styling object", () => {
    const useStyles = makeStyles({
      button: { color: "#fff" },
    });
    const { result } = renderHook(useStyles);
    expect(result.current.button).toStrictEqual({ color: "#fff" });
  });

  it("as function returning styling object", () => {
    const useStyles = makeStyles(() => ({
      button: { color: "#fff" },
    }));
    const { result } = renderHook(useStyles);
    expect(result.current.button).toStrictEqual({ color: "#fff" });
  });

  it("as function having theme param", () => {
    const useStyles = makeStyles((theme: Theme) => ({
      button: { color: theme.palette.common.white },
    }));
    const { result } = renderHook(useStyles);
    expect(result.current.button).toStrictEqual({ color: "#fff" });
  });

  it("as function having theme param and dependencies", () => {
    const useStyles = makeStyles((theme: Theme, deps: { active: boolean }) => ({
      button: {
        color: deps.active
          ? theme.palette.common.white
          : theme.palette.common.black,
      },
    }));

    const { result: activeResult } = renderHook(useStyles, {
      initialProps: { active: true },
    });
    expect(activeResult.current.button).toStrictEqual({ color: "#fff" });

    const { result: inactiveResult } = renderHook(useStyles, {
      initialProps: { active: false },
    });
    expect(inactiveResult.current.button).toStrictEqual({ color: "#000" });
  });
  it("check memoization of styles on rerendering", async () => {
    const useStyles = makeStyles((theme: Theme, deps: { active: boolean }) => ({
      button: {
        color: deps.active
          ? theme.palette.common.white
          : theme.palette.common.black,
      },
    }));
    const { result, rerender } = renderHook(useStyles, {
      initialProps: { active: true },
    });

    const value1 = result.current;
    expect(value1).toStrictEqual({
      button: {
        color: "#fff",
      },
    });

    rerender();

    const value2 = result.current;
    expect(value2).toStrictEqual({
      button: {
        color: "#fff",
      },
    });

    expect(value1).toBe(value2);
  });
});
