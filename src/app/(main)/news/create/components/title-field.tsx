import { Input } from "@/components/ui/input";
import { FieldError } from "./field-error";

type TitleFieldProps = {
  defaultValue?: string;
  errors?: string[];
};

export function TitleField({ defaultValue, errors }: TitleFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="title" className="text-sm font-medium">
        Title
      </label>

      <Input
        id="title"
        name="title"
        required
        minLength={5}
        maxLength={120}
        aria-invalid={Boolean(errors)}
        defaultValue={defaultValue}
        placeholder="e.g. Shipping a new editorial experience"
      />
      <FieldError errors={errors} />
    </div>
  );
}
