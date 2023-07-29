import { useMemo } from "react";
import { useTheme, type Theme, type SxProps } from "@mui/material/styles";

type SX = SxProps<Theme>;
type Styles = Record<string, SX>;
type ReturnedHook<T, U> = (deps?: U) => T;

const makeStyles = <
  T extends object = Styles,
  U extends object = Record<string, any>
>(
  param: (() => T) | ((theme: Theme) => T) | ((theme: Theme, deps: U) => T) | T
): ReturnedHook<T, U> => {
  const useStyles = (deps?: U) => {
    const theme = useTheme();
    const dependencies = Object.values(deps || {});
    const styles = useMemo(() => {
      if (typeof param === "object") {
        return param;
      }
      switch (param.length) {
        case 0:
          return (param as () => T)();
          break;
        case 1:
          return (param as (theme: Theme) => T)(theme);
          break;
        case 2:
          return (param as (theme: Theme, deps: U) => T)(theme, deps!);
          break;
        default:
          return (param as (theme: Theme, deps: U) => T)(theme, deps!);
          break;
      }
    }, dependencies);
    return styles;
  };

  return useStyles;
};

export { makeStyles, type SX };
