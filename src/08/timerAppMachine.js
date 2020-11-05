import { createMachine, assign, spawn } from "xstate";
import { createTimerMachine } from "./timerMachine";

// Read this
// https://www.brianstorti.com/the-actor-model/

export const timerAppMachine = createMachine({
  initial: "new",
  context: {
    duration: 0,
    // currentTimer which will be the new one when one is created
    currentTimer: -1,
    // Can create multiple timers
    timers: [],
  },
  states: {
    new: {
      on: {
        CANCEL: {
          target: "timer",
          cond: (ctx) => ctx.timers.length > 0,
        },
      },
    },
    timer: {
      on: {
        DELETE: {
          actions: assign((ctx) => {
            const timers = ctx.timers.slice(0, -1);
            const currentTimer = timers.length - 1;

            return {
              timers,
              currentTimer,
            };
          }),
          target: "deleting",
        },
      },
    },
    deleting: {
      always: [
        { target: "new", cond: (ctx) => ctx.timers.length === 0 },
        { target: "timer" },
      ],
    },
  },
  on: {
    ADD: {
      // Uncomment this once you've added the spawn() code:
      target: ".timer",
      actions: assign((ctx, event) => {
        // Spawn a new timerMachine here (using createTimerMachine)
        // and append this timer to context.timers
        // ...
        const newTimer = spawn(createTimerMachine(event.duration));

        // add newTimer to timers array
        const timers = ctx.timers.concat(newTimer);

        // return ctx;
        // Change the above line to return the updated context:
        // - `context.timers` should contain the appended spawned timer
        // - `context.currentTimer` should be the index of that spawned timer
        return {
          timers,
          currentTimer: timers.length - 1, // -1 to get the latest timer in the array
        };
      }),
    },
    CREATE: "new",
    SWITCH: {
      actions: assign({
        currentTimer: (_, event) => event.index,
      }),
    },
  },
});
