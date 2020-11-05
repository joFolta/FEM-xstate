import { createMachine, assign } from "xstate";

// refactoring useEffect logic from Timer.js into the xstate machine as a callback
// ctx at time this was invoked (not updated context)
// const ticker = (ctx, ev) => (callback) => {
//   // TODO REMOVE LOG
//   console.log("callback", callback);
//   // This is the callback service creator.
//   // Add the implementation details here.
//   // ...
//   const intervalId = setInterval(() => {
//     callback("TICK");
//   }, ctx.interval * 1000);

//   // cleanup function
//   return () => clearInterval(intervalId);
// };

// refactoring useEffect logic from Timer.js into the xstate machine as a callback
const ticker = (ctx, ev) => (sendBack) => {
  const intervalId = setInterval(() => {
    sendBack("TICK");
  }, ctx.interval * 1000);

  // cleanup function
  return () => {
    console.log("cleaning up...");
    clearInterval(intervalId);
  };
};

// From Timer.js
// useEffect(() => {
//   const intervalId = setInterval(() => {
//     send("TICK");
//   }, interval * 1000);

//   return () => clearInterval(intervalId);
// }, []);

const timerExpired = (ctx) => ctx.elapsed >= ctx.duration;

// https://xstate.js.org/viz/?gist=78fef4bd3ae520709ceaee62c0dd59cd
export const timerMachine = createMachine({
  id: "timer",
  initial: "idle",
  context: {
    duration: 60,
    elapsed: 0,
    interval: 0.1,
  },
  states: {
    idle: {
      entry: assign({
        duration: 60,
        elapsed: 0,
      }),
      on: {
        TOGGLE: "running",
        RESET: undefined,
      },
    },
    running: {
      // Invoke the callback service here.
      // ...
      invoke: {
        id: "ticker", // only used for visibility
        src: ticker,
      },
      initial: "normal",
      states: {
        normal: {
          always: {
            target: "overtime",
            cond: timerExpired,
          },
          on: {
            RESET: undefined,
          },
        },
        overtime: {
          on: {
            TOGGLE: undefined,
          },
        },
      },
      on: {
        TICK: {
          actions: assign({
            elapsed: (ctx) => ctx.elapsed + ctx.interval,
          }),
        },
        TOGGLE: "paused",
        ADD_MINUTE: {
          actions: assign({
            duration: (ctx) => ctx.duration + 60,
          }),
        },
      },
    },
    paused: {
      on: { TOGGLE: "running" },
    },
  },
  on: {
    RESET: {
      target: ".idle",
    },
  },
});
