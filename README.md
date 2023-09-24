# Derived

Atomic state manager library based on Jotai.

## Installation

`yarn add yermak-derived`

`npm install yermak-derived`

## Idea

Library provides two base entities, that can be combined to cover all the necessary tasks.

### Store

Store holds value of provided type. As simple as `useState` from react.

- `get` - returns store value.
- `set` - sets value.

### Derived store

Derived store holds computed from some stores value.

- `get` - returns computed value.

### useStore

`useStore` hook can be used to get value from both Store and Derived store.

## Examples

### Basic usage

https://codesandbox.io/s/yermak-derived-example-pscd8j

```typescript jsx

import { derived, store, useStore } from "yermak-derived";

class Something {
  public $counter = store(1); // for naming store I prefer to use $ as prefix
  public $power = store<number>(1); // type can be defined

  constructor() {
    this.increasePower(); // on store create increase power by 1
  }

  // and for derived - $$ as prefix
  public $$counterPowered = derived(async (get) => {
    const counter = get(this.$counter); // use get function to subscribe to changes
    const power = this.$power.get(); // changes of store $power will not trigger reevaluate
    return Math.pow(counter, power);
  });

  public increasePower = () => {
    this.$power.set(this.$power.get() + 1);
  };
}

const _something = new Something();

export default function App() {
  const counter = useStore(_something.$counter);
  const counterPowered = useStore(_something.$$counterPowered);
  const power = useStore(_something.$power);

  return (
    <>
      <p>
        <label>Counter </label>
        <input
          value={counter}
          onChange={(event) =>
            _something.$counter.set(Number(event.target.value))
          }
        />
      </p>
      <button onClick={() => _something.increasePower()}>Increase power</button>
      <p>
        Powered by {power}: {counterPowered}
      </p>
    </>
  );
}

```

