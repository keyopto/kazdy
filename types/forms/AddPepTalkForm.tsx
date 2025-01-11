import { z } from 'zod';

const AddPepTalkForm = (t: (key: string) => string) => {
  return z.object({
    title: z.string().optional(),
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
