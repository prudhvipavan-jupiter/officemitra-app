import { ClipboardList, type LucideIcon } from "lucide-react";
import type { SiteSettingsMap } from "@/lib/site/settings-store";
import { platformModules, secondaryModules, type PlatformModule } from "./modules";

export const processTemplatesModule: PlatformModule = {
  href: "/process-templates",
  title: "Process & Templates",
  description:
    "Step-by-step workflows, office notes, proceedings, drafting formats, and downloadable templates.",
  icon: ClipboardList,
  accent: "bg-indigo-50 text-indigo-700",
};

export function getVisiblePlatformModules(settings: SiteSettingsMap): PlatformModule[] {
  if (!settings.process_templates_visible) return [...platformModules];
  const mods = [...platformModules];
  mods.splice(3, 0, processTemplatesModule);
  return mods;
}

export { platformModules, secondaryModules };
export type { PlatformModule, LucideIcon };
