import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delayWhen, EMPTY, Observable, retry, switchMap, throwError, timer} from "rxjs";
import {NotificationDTO} from "./NotificationDTO";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly API_URL = 'http://localhost:8080/api/notify/'

  constructor(private http: HttpClient) {
  }

  getNotificationsNotAppearedOnView(userId: number): Observable<NotificationDTO[]> {
    return this.http.get<NotificationDTO[]>(this.API_URL + userId)
  }

  markNotificationAsRead(notificationId: string): Observable<void> {
    return this.http.put<void>(`http://localhost:8080/api/notifications/${notificationId}`, {});
  }

  pollForNotifications(userId: number): Observable<NotificationDTO[]> {
    return timer(0, 60000).pipe(
      switchMap(() => this.getNotificationsNotAppearedOnView(userId)),
      retry({
        delay: (err) => {
          const isServerError = err?.message.includes('500');
          return isServerError ? timer(10000) : throwError(() => err)
        }
      })
    )
  }

  getAllNotifications(userId: number): Observable<NotificationDTO[]> {
    return this.http.get<NotificationDTO[]>(`http://localhost:8080/api/inbox/${userId}`);
  }

  pollForAllNotifications(userId: number): Observable<NotificationDTO[]> {
    return timer(0, 5000).pipe(
      switchMap(() => this.getAllNotifications(userId)),
      retry({
        delay: (err) => {
          const isServerError = err?.message.includes('500');
          return isServerError ? timer(10000) : throwError(() => err)
        }
      })
    )
  }

}
