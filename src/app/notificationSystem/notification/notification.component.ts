import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../notification-service.service";
import {MessageService} from "primeng/api";
import {NotificationDTO} from "../NotificationDTO";
import {LoginService} from "../../login/login.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: NotificationDTO[] = []
  inbox: NotificationDTO[] = []
  displaySidebar: boolean = false

  constructor(private notificationService: NotificationService,
              private messageService: MessageService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.loginService.isLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {

        const userId = this.loginService.getLoggedUserId();
        this.notificationService.pollForNotifications(userId).subscribe({
          next: (data) => {
            this.notifications = data
            this.notifications.forEach((notification: NotificationDTO) => this.showNotification(notification))
          },
          error: (error) => console.log('Error fetching notifications:', error)
        })


        this.notificationService.pollForAllNotifications(userId).subscribe({
          next: (data) => this.inbox = data,
          error: (error) => console.log('Error fetching all notifications:', error)
        });
      } else {
        this.notificationService.stopPollingForNotificationsMethod();
        this.notificationService.stopPollingForAllNotificationsMethod()
      }
    })
  }

  showNotification(notification: NotificationDTO): void {
    this.messageService.add({
      severity: 'info',
      summary: `${notification.type}`,
      detail: `Details: ${notification.parameters.join(', ')}`,
      life: 3000, // Toast will stay on screen until user action
      closable: true,
      data: {id: notification.id}  // Store the notification ID here
    })
  }

  // handleToastClose(event: any): void {
  //   const notificationId = event.message.data.id
  //   this.notificationService.markNotificationAsRead(notificationId).subscribe({
  //     next: () => console.log('Notification marked as read'),
  //     error: (error) => console.log('Error marking notification as read:', error)
  //   })
  // }

  toggleSidebar(): void {
    this.messageService.clear()
    this.displaySidebar = !this.displaySidebar
  }

  markAsRead(notification: NotificationDTO): void {
    this.notificationService.markNotificationAsRead(notification.id).subscribe({
      next: () => {
        console.log('Notification marked as read');
        // Update the local state of the notification
        notification.isRead = true;
      },
      error: (error) => console.error('Error marking notification as read:', error)
    });
  }

}
