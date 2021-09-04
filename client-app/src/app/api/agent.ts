import axios, { AxiosResponse } from 'axios';
import { url } from 'inspector';
import React from 'react';
import { string } from 'yargs';
import { Activity } from '../models/Activity';

axios.defaults.baseURL = "http://localhost:5000/api"

axios.interceptors.response.use(async response => {
    try{
        await sleep(1000)
        return response
    }catch(err){
        console.log(err)
        return await Promise.reject(err)
    }
})

function sleep(delay: number) {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })
}

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request ={
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body:{}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}


const Activities ={
    list: () => request.get<Activity[]>('/activities'),
    details: (id: string) => request.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => axios.post<void>('/activities', activity),
    update: (activity: Activity) => request.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => request.del<void>(`/activities/${id}`)
}

const agent = {
    Activities
}


export default agent