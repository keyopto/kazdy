import NotificationType from '@/enums/NotificationType';
import * as Notifications from 'expo-notifications';

const NotificationContent: Record<NotificationType, Notifications.NotificationContentInput> = {
  [NotificationType.GOAL]: {
    title: 'Objectif atteint',
  },
  [NotificationType.MILESTONE]: {
    title: 'Etape atteinte',
  },
  [NotificationType.PEP_TALK]: {
    title: 'Nouvel Enregistrement',
  },
};

export default NotificationContent;
