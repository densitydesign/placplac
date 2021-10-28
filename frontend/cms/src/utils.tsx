import { ListProps } from "react-admin";
import { CustomPagination } from "./components/CustomPagination";

export function initField(source: string, options: any, type?: "array") {
  return {
    source,
    label: options[source].label,
    ...(type && type === "array"
      ? {
          optionText: "display_name",
          optionValue: "value",
        }
      : {}),
  };
}

export function getDefaultListProps(props: ListProps) {
  return { ...props, perPage: 50, pagination: <CustomPagination /> };
}

export function initInput(
  source: string,
  options: any,
  disabled?: any,
  type?: "array"
) {
  return {
    source,
    required: options[source]?.required,
    label: options[source]?.label,
    disabled: disabled ? true : false,
    fullWidth: true,
    variant: "outlined" as "outlined",
    ...(type && type === "array"
      ? {
          optionText: "display_name",
          optionValue: "value",
        }
      : {}),
  };
}
