import { z } from 'zod';

const AddPepTalkForm = (t: (key: string) => string) => {
  return z.object({
    title: z
      .string({ required_error: t('validation.title.required') })
      .min(1, t('validation.title.required')),
    date: z.date({
      required_error: t('validation.date.required'),
    }),
  });
};

export type FormDataAddPepTalk = {
  title: string;
  date: Date;
};

export default AddPepTalkForm;
