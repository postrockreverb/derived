# Derived

Atomic state manager library inspired by Jotai and Svelte stores.
Library utilizes asynchronous functions, observables, and a map-like structures.

## Installation

`yarn add @yermak/derived`
`npm install @yermak/derived`
`bun add @yermak/derived`

## Entities

### Observable

- Defines a structure for observables with get and subscribe methods.

### Derived

- Creates a derived observable value based on a getter function. It subscribes to stores and updates its value when any of the stores change.
