# PathOf

## Description

Sometimes we need to create a string representation of an object path:

```typescript
const obj = {
  x: 2,
  y: {
    w: "abc",
    z: true,
  },
}

const path = "y.z"
```

This small library allows to create the string path in a typed fashion:

```typescript
const path = pathOf<typeof obj>().y.z[PATH]
```

We have intellisense while typing the path and if the object fields are renamed, the path will also be renamed accordingly

## Installation

To install the stable version:

```bash
yarn install typed-string-path
```

