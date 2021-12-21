// import { httpsCallable } from "firebase/functions";
// import { functions } from "./Firebase";
import axios from "axios";

// const api = 'https://0473-2a01-4f8-172-40a6-00-2.ngrok.io/coke-cny/us-central1'
// const api = 'https://0473-2a01-4f8-172-40a6-00-2.ngrok.io/coke-cny/us-central1'
const api = 'https://us-central1-macallan-ecf92.cloudfunctions.net'

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    // console.log(error.response)
    if(error.response?.status === 401) {
        localStorage.removeItem("_user")
        window.location.reload()
    } 
    if(error?.request && !error?.response) {
        // connection failure
        // alert("Connection Error");
    }
    return Promise.reject(error);
});

export const getScore = (challangeId,respondentId,fileToUpload ) => {
    var formData = new FormData();
    formData.append("fileToUpload", fileToUpload, fileToUpload.name);
    formData.append("challangeId", challangeId);
    formData.append("respondentId", respondentId);
   return axios.post(`${api}/getScore`, formData); 
}
export const getChallenge = (challengeInstanceId) =>{
    return axios.post(`${api}/getChallenge`, {challengeInstanceId});
}
export const onChallengeCreated = (challengeInstanceId) =>{
    return axios.post(`${api}/onChallengeCreated`,{challengeInstanceId})
}
export const addChallenge = (questionId,challangeInstanceId,answerId) => {
    return axios.post(`${api}/addChallange`,{questionId,challangeInstanceId,answerId});
}
export const sendCode = (name,phone_number) =>{
    return axios.post(`${api}/sendCode`,{name,phone_number},)
}
export const createChallengeInstance = (invitationId = '', fileToUpload) =>{
    var formData = new FormData();
    formData.append("fileToUpload", fileToUpload, fileToUpload.name);
    // formData.append("challangerId", challangerId);
    formData.append("invitationId", invitationId);
    return axios.post(`${api}/createChallangeInstance`,formData)
}

export const upload = (fileToUpload) =>{
    var formData = new FormData();
    formData.append("fileToUpload", fileToUpload, fileToUpload.name);
    return axios.post(`${api}/upload`,formData)
}

export const verifyToken = (verificationId,sms_token) => {
    return axios.post(`${api}/verifyToken`,{verificationId,sms_token});
}

export const generateInviteLink = (uid, relation) => {
    return axios.post(`${api}/generateInviteLink`, {uid: uid, relation})
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

export const getQuiz = (invitationId) => {
    return axios.post(`${api}/getQuiz`, {invitationId})
}

export const addScoreForPlayTogether = (respondentId,netScore,percentage, fileToUpload) => {
    var formData = new FormData();
    formData.append("fileToUpload", fileToUpload, fileToUpload.name);
    formData.append("respondentId", respondentId);
    formData.append("netScore", netScore);
    formData.append("percentage", percentage);
   
    return axios.post(`${api}/addScoreForPlayTogether`, formData, {})
}

export const getScoreById = ( scoreId ) => {
    return axios.post(`${api}/getSingleScoreById`, { scoreId}); 
}

// admin apis
export const getUsers = (uid, itemsPerPage, page, token) => {
    return axios.post(`${api}/getUsersList`, {uid, itemsPerPage, page, token})
}

export const adminLogin = (username, password) => {
    return axios.post(`${api}/adminLogin`, {username, password})
}

export const adminGetQuestions = (uid, token, page, itemsPerPage) => {
    return axios.post(`${api}/getQuestionsList`, {uid, token, itemsPerPage, page})
}

export const editQuestion = (questionId, questionText, challengeText, relation, uid, token) => {
    return axios.post(`${api}/editQuestion`, {questionId, questionText, challengeText, relation, uid, token})
}

export const editChoice = (choiceID, answersText, uid, token) => {
    return axios.post(`${api}/editQuestionChoice`, {choiceID, answersText, uid, token})
}

export const addFullQuestion = (question) => {
    return axios.post(`${api}/addMultipleQuestions`, { questions: [
        question
    ]})
}

export const deleteQuestion = (questionId, uid, token) => {
    return axios.post(`${api}/deleteQuestion`, {questionId, uid, token})
}

export const getStats = (uid, token) => {
    return axios.post(`${api}/getDashBoardStats`, {uid, token})
}

export const adminGetScoreList = (uid, token, page, itemsPerPage) => {
    return axios.post(`${api}/getScoresList`, {uid, token, itemsPerPage, page})
}
