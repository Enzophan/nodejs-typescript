import { Router } from "express";
import { Register, Login, AuthenticatedUser, Refresh, Logout } from "./controller/auth.controller";

export const routes = (router: Router) => {
    router.get('', (req, res) => {
        res.send('Server NODE TS')
    })
    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.get('/api/user', AuthenticatedUser)
    router.post('/api/refresh', Refresh)
    router.post('/api/logout', Logout)


}