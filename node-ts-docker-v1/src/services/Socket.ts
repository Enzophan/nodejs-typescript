import * as socketio from 'socket.io';
import * as http from 'http';
import { BehaviorSubject, Observable } from 'rxjs';

import { NumberOfUser } from '../models/Socket';

export class SocketService {
    private numberOfUser: BehaviorSubject<NumberOfUser> = new BehaviorSubject<NumberOfUser>({ data: 0 }); // Here our "stream pipe" of the NumberOfUser Data.
    private numberOfUser$: Observable<NumberOfUser> = this.numberOfUser.asObservable(); // Here's our "Observable" data.
    private io!: socketio.Server; // Our Socket instance
    constructor(server: http.Server) {
        this.io = new socketio.Server(server, { cors: { origin: "*" } }); // We init our Socket instance with the server as parameter
    }
    public listenStore() {
        this.numberOfUser$.subscribe((store) => {
            // subscribe is called at each store value change !
            this.io.emit("numberOfUser", store.data); // So at each value change, we emit this value to the client with the event name "numberOfUser"
        });
    }
    public listenUserActivity() {
        this.io.on("connection", (client) => {
            console.log("New User connected: ", client.id)
            this.numberOfUser.next({
                data: this.numberOfUser.value.data ? this.numberOfUser.value.data + 1 : 1,
            });

            client.once("disconnect", () => {
                this.numberOfUser.next({
                    data: this.numberOfUser.value.data ? this.numberOfUser.value.data - 1 : 0,
                })
            });
        });
    }
}