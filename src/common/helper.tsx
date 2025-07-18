import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as Flags from "country-flag-icons/react/3x2";

// Type guard
function isValidFlag(code: string): code is keyof typeof Flags {
  return code.toUpperCase() in Flags;
}

const renderFlagIcon = (countryCode?: string, countryName?: string) => {
  if (!countryCode) return null;

  const upperCode = countryCode.toUpperCase();

  if (!isValidFlag(upperCode)) return null;

  const FlagComponent = Flags[upperCode];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <FlagComponent className="w-8 h-6 rounded-sm shadow-md cursor-pointer" />
      </TooltipTrigger>
      <TooltipContent className="text-xs text-center" side="bottom">
        {countryName || upperCode}
      </TooltipContent>
    </Tooltip>
  );
};

function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
  const cleaned: Partial<T> = {};

  for (const key in obj) {
    const value = obj[key];

    // Skip undefined, null, empty string, or "None" (as string)
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "None"
    ) {
      cleaned[key] = value;
    }
  }

  return cleaned;
}

export { 
  renderFlagIcon,
  cleanObject,
};
