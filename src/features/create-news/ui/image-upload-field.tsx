import { Input } from "@/shared/ui/input";
import { FieldError } from "./field-error";

type ImageUploadFieldProps = {
  errors?: string[];
};

export function ImageUploadField({ errors }: ImageUploadFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="imageUpload" className="text-sm font-medium">
        Cover image
      </label>

      <Input
        id="imageUpload"
        name="imageUpload"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        required
        aria-invalid={Boolean(errors)}
      />

      <p className="text-sm text-muted-foreground">
        Upload JPG, PNG or WEBP up to 3MB. Images are resized and saved as WebP.
      </p>

      <FieldError errors={errors} />
    </div>
  );
}
