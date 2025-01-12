import NotificationContent from '@/constants/NotificationContent';
import type NotificationType from '@/enums/NotificationType';
import * as Notifications from 'expo-notifications';

export type useNotificationsType = {
  scheduleNewNotification: (
    type: NotificationType,
    id: number,
    date: Date
  ) => Promise<string | null>;
};

const useNotifications = (): useNotificationsType => {
  const scheduleNewNotification = async (type: NotificationType, id: number, date: Date) => {
    const permissions = await Notifications.getPermissionsAsync();

    if (permissions.status !== 'granted') {
      return null;
    }

    const idNotification = await Notifications.scheduleNotificationAsync({
      content: {
        ...NotificationContent[type],
        data: {
          id,
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date,
      },
    });

    return idNotification;
  };

  return {
    scheduleNewNotification,
  };
};

export default useNotifications;
