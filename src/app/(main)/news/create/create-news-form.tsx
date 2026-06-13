"use client";

import { useActionState, useEffect, useState } from "react";
import { createNewsAction } from "./actions";
import { ContentField } from "./components/content-field";
import { FormMessage } from "./components/form-message";
import { ImageUploadField } from "./components/image-upload-field";
import { SubmitButton } from "./components/submit-button";
import { TitleField } from "./components/title-field";
import { type CreateNewsState, initialCreateNewsState } from "./form-state";

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
