import api from '@/services/API.js'

export default {
    async get_all_quizzes() {
        return api().get('/admin/get_all_quizzes', {withCredentials: true}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    },
    async add_new_quiz(data) {
        return api().post('/admin/add_new_quiz', data, {withCredentials: true}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    },
    async delete_quiz(id) {
        return api().post('/admin/delete_quiz', {id}, {withCredentials: true}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    },
    async update_questions(id, questions) {
        return api().post('/admin/update_questions', {id, questions}, {withCredentials: true}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    },
    async get_categories() {
        return api().get('/admin/get_categories', {withCredentials: true}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    },
    async create_category(name) {
        return api().post('/admin/create_category', {name}, {withCredentials: true}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    },
    async edit_category(data) {
        return api().post('/admin/edit_category', data, {withCredentials: true}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    },
    async delete_category(id) {
        return api().post('/admin/delete_category', {id}, {withCredentials: true}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status:'failed', message: err.message}})
    },
    async get_questions(id)
    {
        return api().get('/admin/get_questions', {withCredentials: true, params: {id}}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    },
    async edit_quizz(data)
    {
        return api().post('/admin/edit_quiz', data, {withCredentials: true}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    },
    async get_solutions()
    {
        return api().get('/admin/get_solutions', {withCredentials: true}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    },
    async create_solution(data)
    {
        return api().post('/admin/create_solution', data, {withCredentials: true}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    },
    async edit_solution(data)
    {
        return api().post('/admin/edit_solution', data, {withCredentials: true}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    },
    async delete_solution(id)
    {
        return api().post('/admin/delete_solution', {id}, {withCredentials: true}).then(response => {
            return response
        }).catch(err=>{console.log(err); return {status: 'failed', message: err.message}})
    }
}