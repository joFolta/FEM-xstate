import { createMachine, assign } from "xstate";

// Actions parameterized
// Parameterize the assign actions here:
const tick = assign({
  elapsed: (ctx, ev) => ctx.elapsed + ctx.interval,
});

const addMinute = assign({
  duration: (ctx, ev) => ctx.duration + 60,
});

const reset = assign({
  duration: 60,
  elapsed: 0,
});

export const timerMachine = createMachine({
  initial: "idle",
  context: {
    duration: 60,
    elapsed: 0,
    interval: 0.1,
  },
  states: {
    idle: {
      // Parameterize this action:
      entry: reset,
      on: {
        TOGGLE: "running",
      },
    },
    running: {
      on: {
        TICK: {
          actions: tick,
        },
        TOGGLE: "paused",
        ADD_MINUTE: {
          // Parameterize this action:
          actions: addMinute,
        },
      },
    },
    paused: {
      on: {
        TOGGLE: "running",
        RESET: "idle",
      },
    },
  },
  // add actions HERE to make it more flexible - the consuming app can pass in it's own custom actions
  // pass in custom actions at useMachine second param
  // {actions: {reset, tick, addMinute}}
});
