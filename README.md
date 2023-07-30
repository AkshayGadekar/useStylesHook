# React Hook for Material UI to link stylesheets

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://www.npmjs.com/package/mui-styles-hook) [![npm version](https://img.shields.io/npm/v/mui-styles-hook.svg?style=flat)](https://www.npmjs.com/package/mui-styles-hook) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://www.npmjs.com/package/mui-styles-hook)

A simple hook to link stylesheets to the component using _SX_ prop for styling.
Inspired from Material UI V4 makeStyles utility.

## Installation

```bash
npm i mui-styles-hook
```

## Usage

```javascript
import { makeStyles } from "mui-styles-hook";

const useStyles = makeStyles({
  button: { backgroundColor: "#1b91c9", p: 1 },
  typography: { display: { xs: "block", md: "inline" } },
});

const SendBtn = (props) => {
  const styles = useStyles();

  return (
    <>
      <Button sx={styles.button} variant="contained" fullWidth>
        SEND
      </Button>
      <Typography sx={styles.typography} variant="caption">
        This will redirect to Payment Gateway
      </Typography>
    </>
  );
};
```

One can also use Theme

```javascript
const useStyles = makeStyles((theme) => ({
  button: { backgroundColor: theme.palette.primary.dark, p: theme.spacing(2) },
  typography: { display: { xs: "block", md: "inline" } },
}));
```

One can also pass depenedencies

```javascript
const useStyles = makeStyles((theme, deps) => ({
  button: { backgroundColor: deps.btnColor, p: theme.spacing(2) },
  typography: { display: { xs: "block", md: deps.mdDisplay } },
}));

const SendBtn = (props) => {
  const { btnColor, mdDisplay } = props;
  const styles = useStyles({ btnColor, mdDisplay });

  return (
    <>
      <Button sx={styles.button} variant="contained" fullWidth>
        SEND
      </Button>
      <Typography sx={styles.typography} variant="caption">
        This will redirect to Payment Gateway
      </Typography>
    </>
  );
};
```

Depenedencies are passed as simple object to useStyles hook. Styles are memoized based on values in object, whenever values changes styles gets prepared again, object should not have reference values.

### Typescript

makeStyles is a generic function. It accepts two types, first is styles interface and second is dependcies interface if one is passing dependcies.

```typescript
import { makeStyles, type SX, type Theme } from "mui-styles-hook";
interface Styles {
  button: SX;
  typography: SX;
}
interface Deps {
  btnColor: string;
  mdDisplay: string;
}
const useStyles = makeStyles<Styles, Deps>((theme: Theme, deps) => ({
  button: { backgroundColor: deps.btnColor, p: theme.spacing(2) },
  typography: { display: { xs: "block", md: deps.mdDisplay } },
}));
```
