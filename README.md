# React Hook for Material UI to link stylesheets

[![GitHub license](https://img.shields.io/npm/l/mui-styles-hook.svg?style=flat&color=blue)](https://www.npmjs.com/package/mui-styles-hook) [![npm version](https://img.shields.io/npm/v/mui-styles-hook.svg?style=flat)](https://www.npmjs.com/package/mui-styles-hook) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://www.npmjs.com/package/mui-styles-hook)

A simple hook to link stylesheets to the component using _SX_ prop for styling.
Inspired from Material UI V4 makeStyles utility.

## Installation

```bash
npm i mui-styles-hook
```

## Usage

One only needs to import `makeStyles` function from package, which accepts object or function and declare styles in it. It returns hook `useStyles` (one can name it) which can be used in the component to use the styles.

```javascript
import { makeStyles } from "mui-styles-hook";

const useStyles = makeStyles({
  button: { backgroundColor: "#1b91c9", p: 1 },
  typography: { display: { xs: "block", md: "inline" } },
});

const SendBtn = () => {
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

One can also use Theme in styles by passing a function to `makeStyles` accepting theme as first parameter and returning a styles object

```javascript
const useStyles = makeStyles((theme) => ({
  button: { backgroundColor: theme.palette.primary.dark, p: theme.spacing(2) },
  typography: { display: { xs: "block", md: "inline" } },
}));
```

One can also use depenedencies, just pass it to function as second parameter besides theme

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

Depenedencies are passed as a simple object to useStyles hook as dependency object. Styles are memoized based on values in dependency object, whenever values change styles gets prepared again, dependency object should not have reference values.

### Typescript

makeStyles is a generic function. It accepts two types, first is styles interface and second is dependencies interface if one is passing dependency object.

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

## Contribution

You can contribute to this package by discovering bugs and opening issues. Please, add to which version of package you create pull request or issue. (e.g. [1.0.0] Fatal error on `makeStyles` method)
