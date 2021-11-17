import { httpsCallable } from "firebase/functions";
import { functions } from "./Firebase";

export const generateInviteLink = httpsCallable(functions, 'generateInviteLink');

// generateInviteLink({ userId: messageText })
//   .then((result) => {
//     // Read result of the Cloud Function.
//     /** @type {any} */
//     const data = result.data;
//     const sanitizedMessage = data.text;
//   });