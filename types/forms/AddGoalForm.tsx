import { z } from 'zod';

const AddGoalForm = (t: (key: string) => string) => {
  return z.object({
    title: z
      .string({ required_error: t('validation.title.required') })
      .min(1, t('validation.title.required')),
    date: z
      .date({
        required_error: t('validation.date.required'),
      })
      .refine((date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date.getTime() >= today.getTime();
      }, t('validation.date.past')),
    description: z
      .string({ required_error: t('validation.description.required') })
      .min(1, t('validation.description.required')),
    image: z.string().optional(),
  });
};

export type FormDataAddGoal = {
  title: string;
  date: Date;
  description: string;
  image: string | undefined;
};

export default AddGoalForm;
