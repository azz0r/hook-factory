# 🏭 Hook Factory

## 📕 Index

- [Installing](#installing)
- [Usage](#usage)

### 💪 <a name="installing">Installing</a>

`yarn add hook-factor`

### 📒 <a name="usage">Usage</a>
```javascript

import factory from "hook-factory"

const data = {
    count: 0
};

const modifier = ({
    prehook: data => {
        data.count++
        return data;
    },
    posthook: data => {
        data.count++
        return data;
    }
});

const modifiers = [modifier];

const newCount = factory({
    data,
    modifiers
});

console.log(newCount);
// { count: 2}
```
