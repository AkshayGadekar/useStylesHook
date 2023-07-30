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
