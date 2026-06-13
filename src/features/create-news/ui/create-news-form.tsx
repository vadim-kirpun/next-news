"use client";

import { useActionState, useEffect, useState } from "react";
import { createNewsAction } from "@/features/create-news/actions/create-news";
import {
  type CreateNewsState,
  initialCreateNewsState,
} from "@/features/create-news/model/form-state";
import { ContentField } from "./content-field";
import { FormMessage } from "./form-message";
import { ImageUploadField } from "./image-upload-field";
import { SubmitButton } from "./submit-button";
import { TitleField } from "./title-field";

export function CreateNewsForm() {
  const [state, formAction] = useActionState<CreateNewsState, FormData>(
    createNewsAction,
    initialCreateNewsState,
  );

  const [title, setTitle] = useState(
    initialCreateNewsState.values?.title ?? "",
  );
  const [content, setContent] = useState(
    initialCreateNewsState.values?.content ?? "",
  );

  useEffect(() => {
    if (state.values) {
      setTitle(state.values.title);
      setContent(state.values.content);
    }
  }, [state.values]);

  return (
    <form
      action={formAction}
      className="space-y-6"
      encType="multipart/form-data"
    >
      <TitleField
        value={title}
        onChange={setTitle}
        errors={state.fieldErrors?.title}
      />
      <ContentField
        value={content}
        onChange={setContent}
        errors={state.fieldErrors?.content}
      />
      <ImageUploadField errors={state.fieldErrors?.imageUpload} />
      <FormMessage message={state.message} />

      <SubmitButton />
    </form>
  );
}
