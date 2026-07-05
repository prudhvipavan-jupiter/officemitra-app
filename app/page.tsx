import { HomeLatest } from "@/components/home/HomeLatest";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeStats } from "@/components/home/HomeStats";
import {
  HomeExpertBanner,
  HomeModulesGrid,
  HomeMoreHelp,
  HomePopularTopics,
  HomeTrust,
  HomeWhyOfficeMitra,
} from "@/components/home/HomeSections";
import { WebSiteJsonLd } from "@/components/seo/WebSiteJsonLd";
import { getHomeStats } from "@/lib/data/homepage";
import { getVisiblePlatformModules } from "@/lib/modules-visible";
import { getSiteSettings } from "@/lib/site/settings-store";
import { getPublicSiteStats } from "@/lib/site-stats";

export default async function HomePage() {
  const [stats, settings] = await Promise.all([getPublicSiteStats(), getSiteSettings()]);
  const platformModules = getVisiblePlatformModules(settings).map(({ href, title, description, accent }) => ({
    href,
    title,
    description,
    accent,
  }));
  const homeStats = getHomeStats(stats);

  return (
    <>
      <WebSiteJsonLd />
      <HomeHero />
      <HomeStats stats={homeStats} />
      <HomeLatest />
      <HomeModulesGrid modules={platformModules} />
      <HomePopularTopics />
      <HomeWhyOfficeMitra />
      <HomeMoreHelp />
      <HomeTrust />
      <HomeExpertBanner />
    </>
  );
}
