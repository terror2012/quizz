import api from '@/services/API.js'

export default {
    async get_quizzes() 
    {
        return api().get("/get_all_quiz", {withCredentials: true}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    },
    async get_quiz(id)
    {
        return api().get('/get_quiz', {withCredentials: true, params: {id}}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    },
    async increment_quizz(id)
    {
        return api().post("/increment_quiz", {id}, {withCredentials: true}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    },
    async login(credentials)
    {
        return api().post("/login", credentials, {withCredentials: true}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    },
    async check_session() {
        return api().get('/check_session', {withCredentials: true}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    },
    async logout() {
        return api().get('/logout', {withCredentials: true}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    },
    async get_solutions() {
        return api().get('/get_solutions', {withCredentials: true}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    }
}