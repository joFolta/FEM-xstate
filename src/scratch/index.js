// // import React from "react";
// // import { createMachine } from "xstate";
// // import { useMachine } from "@xstate/react";

// // export const ScratchApp = () => {
// //   // true / false
// //   // const [isActive, setIsActive] = useState(true);

// //   // true / false is simple, but it getting complex with saving state and cancellation state.
// //   // 'inactive', 'pending', 'active'

// //   // similar to how real watches work
// //   // button should only have to worry about sending an electrical on/off signal
// //   // the device's computer should decide how to modify state

// //   // useReducer() is better than useState when possible
// //   // sends state
// //   const [status, setStatus] = useReducer(alarmReducer);
// //   const initialState = "pending";
// //   // alarmReducer: helps to have a centralized place for all the logic of states
// //   const alarmReducer = (state, event) => {
// //     switch (state) {
// //       case "inactive":
// //         if (event.type === "TOGGLE") {
// //           return "pending";
// //         }
// //         return state;
// //       case "pending":
// //         if (event.type === "SUCCESS") {
// //           return "active";
// //         }
// //       case "active":
// //         if (event.type === "TOGGLE") {
// //           return "inactive";
// //         }
// //     }
// //   };

// // machine to simplify alarmReducer
// // const alarmMachine = {
// //   initial: 'inactive',
// //   states: {
// //     inactive: {
// //       on: {
// //         TOGGLE: 'pending'
// //       }
// //     },
// //     pending: {

// //     },
// //     active: {

// //     }
// //   }
// // }

// // const improvedAlarmReducer = (state, event) = {
// // const nextState = alarmMachine.states[state].on[event.type]
// // }

// //   return (
// //     <div className="scratch">
// //       <div className="alarm">
// //         <div className="alarmTime">
// //           {new Date().toLocaleTimeString("en-US", {
// //             hour: "2-digit",
// //             minute: "2-digit",
// //           })}
// //         </div>
// //         {/* <div className="alarmToggle" data-active></div> */}
// //         <div
// //           className="alarmToggle"
// //           data-active
// //           onClick={() => dispatch("TOGGLE")}
// //         ></div>
// //       </div>
// //     </div>
// //   );
// // };

// // ORIGINAL
// // ORIGINAL
// // ORIGINAL
// // ORIGINAL
// // ORIGINAL

// import React from "react";
// import { createMachine } from "xstate";
// import { useMachine } from "@xstate/react";

// export const ScratchApp = () => {
//   return (
//     <div className="scratch">
//       <div className="alarm">
//         <div className="alarmTime">
//           {new Date().toLocaleTimeString("en-US", {
//             hour: "2-digit",
//             minute: "2-digit",
//           })}
//         </div>
//         <div className="alarmToggle" data-active></div>
//       </div>
//     </div>
//   );
// };
