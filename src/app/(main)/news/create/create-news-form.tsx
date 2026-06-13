"use client";

import { useActionState } from "react";
import type { CreateNewsState } from "./actions";
import { createNewsAction, initialCreateNewsState } from "./actions";
import { ContentField } from "./components/content-field";
import { FormMessage } from "./components/form-message";
import { ImageUploadField } from "./components/image-upload-field";
import { SubmitButton } from "./components/submit-button";
import { TitleField } from "./components/title-field";

export function CreateNewsForm() {
  const [state, formAction] = useActionState<CreateNewsState, FormData>(
    createNewsAction,
    initialCreateNewsState,
  );

  return (
    <form
      action={formAction}
      className="space-y-6"
      encType="multipart/form-data"
    >
      <TitleField
        defaultValue={state.values?.title}
        errors={state.fieldErrors?.title}
      />
      <ContentField
        defaultValue={state.values?.content}
        errors={state.fieldErrors?.content}
      />
      <ImageUploadField errors={state.fieldErrors?.imageUpload} />
      <FormMessage message={state.message} />

      <SubmitButton />
    </form>
  );
}
