import { z } from 'zod';

const AddMilestoneForm = (t: (key: string) => string) => {
  return z.object({
    title: z
      .string({ required_error: t('validation.title.required') })
      .min(1, t('validation.title.required')),
    date: z.date({
      required_error: t('validation.date.required'),
    }),
  });
};

export type FormDataAddMilestone = {
  title: string;
  date: Date;
};

export default AddMilestoneForm;
