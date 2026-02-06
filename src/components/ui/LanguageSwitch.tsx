import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export function LanguageSwitch({ variant = "default" }: { variant?: "default" | "minimal" }) {
  const { lang, setLang } = useLanguage();
  
  const toggle = () => setLang(lang === "fr" ? "mg" : "fr");
  
  if (variant === "minimal") {
    return (
      <button
        onClick={toggle}
        className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-muted hover:bg-muted/80 transition-colors"
      >
        <Languages className="h-3.5 w-3.5" />
        {lang.toUpperCase()}
      </button>
    );
  }
  
  return (
    <Button variant="ghost" size="sm" onClick={toggle} className="gap-2">
      <Languages className="h-4 w-4" />
      {lang === "fr" ? "Français" : "Malagasy"}
    </Button>
  );
}
