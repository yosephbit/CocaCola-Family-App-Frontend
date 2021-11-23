// import { httpsCallable } from "firebase/functions";
// import { functions } from "./Firebase";
import axios from "axios";

const api = 'http://localhost:5001/family-ref-9b2fb/us-central1'

export const sendCode = (name,phone_number) =>{
    return axios.post(`${api}/sendCode`,{name,phone_number},)
}

export const verifyToken = (verificationId,sms_token) =>{
    return axios.post(`${api}/verifyToken`,{verificationId,sms_token});
}

export const generateInviteLink = (uid, relation) => {
    return axios.post(`${api}/generateInviteLink`, {uid, relation})
}

export const onInvitationLink = (invitationId, invitedId) => {
    return axios.post(`${api}/onInvitationLink`, {invitationId, invitedId})
}

export const addFamily = (userId, familyMemberId, relation) => {
    return axios.post(`${api}/addFamily`, {userId, familyMemberId, relation})
}

export const getInviteDetails = (invitationId) => {
    return axios.post(`${api}/getInviteDetails`, {invitationId})
}

export const addQuestion = (questionText) => {
    return axios.post(`${api}/addQuestion`, {questionText})
}

export const addChoiceToQuestion = (qid, answersText) => {
    return axios.post(`${api}/addChoiceToQuestion`, {qid, answersText})
}

export const answerQuestion = (respondentId, challangeId, questionId, questionChoiceId) => {
    return axios.post(`${api}/answerQuestion`, {respondentId, challangeId, questionId, questionChoiceId})
}

export const getQuiz = (numberOfQuestions) => {
    return axios.post(`${api}/getQuiz`, {numberOfQuestions})
}

// export const generateInviteLink = httpsCallable(functions, 'generateInviteLink');
// export const signUpUser = httpsCallable(functions, 'signUpUsers')
// generateInviteLink({ userId: messageText })
//   .then((result) => {
//     // Read result of the Cloud Function.
//     /** @type {any} */
//     const data = result.data;
//     const sanitizedMessage = data.text;
//   });