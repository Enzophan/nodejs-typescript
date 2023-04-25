// import { io, Socket } from "socket.io-client";
// import { Observable, BehaviorSubject } from "rxjs";

// export interface SocketData {
//   numberOfUser?: number;
// }

// export class SocketService {
//   private socket!: Socket;

//   private store: BehaviorSubject<SocketData> = new BehaviorSubject<SocketData>({
//     numberOfUser: 0,
//   });
//   private store$: Observable<SocketData> = this.store.asObservable();

//   constructor() {
//     this.socket = io("YOUR_BACKEND_URL");
//     this.socket.on("numberOfUser", (data) => {
//       this.emit(data); // At each "numberOfUser" event we modify our "Observable" data.
//     });
//   }

//   public emit(store: SocketData): void {
//     this.store.next(store);
//   }

//   public listen(): Observable<SocketData> {
//     return this.store$; // You will be able to use this.socketService.listen().subscribe(), it's the same logic as we see above !
//   }
// }