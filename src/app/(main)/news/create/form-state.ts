export type CreateNewsState = {
  message?: string;
  fieldErrors?: {
    title?: string[];
    content?: string[];
    imageUpload?: string[];
  };
  values?: {
    title: string;
    content: string;
  };
};

export const initialCreateNewsState: CreateNewsState = {
  values: {
    title: "",
    content: "",
  },
};
