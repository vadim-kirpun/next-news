import { Input } from "@/components/ui/input";
import { FieldError } from "./field-error";

type TitleFieldProps = {
  value: string;
  onChange: (nextValue: string) => void;
  errors?: string[];
};

export function TitleField({ value, onChange, errors }: TitleFieldProps) {
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
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="e.g. Shipping a new editorial experience"
      />
      <FieldError errors={errors} />
    </div>
  );
}
