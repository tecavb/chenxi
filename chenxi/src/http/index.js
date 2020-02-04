import axios from 'axios';
const http = axios.create({
    baseURL: 'http://192.168.68.137:8080',
    timeout: 2000
})
export function storlist() {
    return http.get('/storage/list')
}
export function outlist() {
    return http.get('/outstor/list')
}
export function storchange(id, ac, num) {
    return http.get(`/storage/change?id=${id}&ac=${ac}&num=${num}`)
}
export function storcho(id, cho) {
    return http.get(`/storage/cho?id=${id}&cho=${cho}`)
}
export function storadd(name, color, count, size, pri, pre) {
    return http.get(`/storage/add?name=${name}&color=${color}&count=${count}&size=${size}&pri=${pri}&pre=${pre}`)
}
export function outstor(name, fors, color, count, size, pri, pre) {
    return http.get(`/outstor/add?name=${name}&fors=${fors}&color=${color}&count=${count}&size=${size}&pri=${pri}&pre=${pre}`)
}
export function storpri(id, pri) {
    return http.post('/storage/price', {
        id: id,
        pri: pri
    })
}
export function order(ary, fors) {
    return http.get(`/order/order?ary=${JSON.stringify(ary)}&fors=${fors}`)
}
export function orderlist() {
    return http.get('/order/list')
}
export function orderdele(id) {
    return http.get(`/order/dele?id=${id}`)
}
export function token(token) {
    return http.post(`/login/token`, {
        token: token
    })
}
export function login(username, password, number, verify) {
    return http.post(`/login/login`, {
        username,
        password,
        number,
        verify
    })
}
export function log(username, password) {
    return http.post(`/login/log`, {
        username,
        password
    })
}
export function orderstate(id, state) {
    return http.post(`/order/state`, {
        id,
        state
    })
}
export function verify(name) {
    return http.post(`/login/verify`, {
        name
    })
}