import { getNextStaticProps } from "@faustjs/next"

import { GetStaticPropsContext } from "next";
import Head from "next/head";
import React from "react";
import {
  CTA,
  Footer,
  Header,
  Hero,
  HeroBanner,
  InnerBanner,
  IntroSection,
  Posts,
  WeOfferSection,
  SolutionServices,
  PortfolioSection,
  ExpertiseSection,
  AboutInfo,ChooseUs,ServicesBanner,ContentWithSidebar,FullWidthCTA,CareersSection,ContactSection
} from "components";
import styles from "scss/pages/home.module.scss";
import { client, PageIdType, PortfolioIdType } from "client";

export default function Page() {
  const { usePosts, useQuery, usePage } = client;
  const generalSettings = useQuery().generalSettings;
  const posts = usePosts({
    first: 6,
    where: {
      categoryName: "uncategorized",
    },
  });
  const HomePage = usePage({
    id: String(231),
    idType: PageIdType.DATABASE_ID,
  });

  const LayoutOptions = HomePage.fieldLayoutOptions.flexibleLayouts;
  // console.log(LayoutOptions[5].$on[LayoutOptions[5].__typename]);
  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <main className="content">
        {LayoutOptions.map((Layout, index) => {
          var ComponentsName = Layout.__typename;
          var ComponentsData = Layout.$on[ComponentsName];
          // console.log(ComponentsData);

          return (
            <div key={index}>
              {ComponentsName ==
              "Page_Fieldlayoutoptions_FlexibleLayouts_InnerBannerSection" ? (
                <InnerBanner QueryData={ComponentsData} />
              ) : (
                ""
              )}
              {ComponentsName ==
              "Page_Fieldlayoutoptions_FlexibleLayouts_HeroSection" ? (
                <HeroBanner QueryData={ComponentsData} />
              ) : (
                ""
              )}

              {ComponentsName ==
              "Page_Fieldlayoutoptions_FlexibleLayouts_IntroSection" ? (
                <IntroSection QueryData={ComponentsData} />
              ) : (
                ""
              )}
              {ComponentsName ==
              "Page_Fieldlayoutoptions_FlexibleLayouts_OffersSection" ? (
                <WeOfferSection QueryData={ComponentsData} />
              ) : (
                ""
              )}
              {ComponentsName ==
              "Page_Fieldlayoutoptions_FlexibleLayouts_ServicesSection" ? (
                <SolutionServices QueryData={ComponentsData} />
              ) : (
                ""
              )}
              {ComponentsName ==
              "Page_Fieldlayoutoptions_FlexibleLayouts_Portfolio" ? (
                <PortfolioSection QueryData={ComponentsData} />
              ) : (
                ""
              )}
              {ComponentsName ==
              "Page_Fieldlayoutoptions_FlexibleLayouts_Expertise" ? (
                <ExpertiseSection QueryData={ComponentsData} />
              ) : (
                ""
              )}
              {ComponentsName ==
              "Page_Fieldlayoutoptions_FlexibleLayouts_InnerBannerSection" ? (
                <InnerBanner QueryData={ComponentsData} />
              ) : (
                ""
              )}
              {ComponentsName ==
              "Page_Fieldlayoutoptions_FlexibleLayouts_ChooseUsSection" ? (
                <ChooseUs QueryData={ComponentsData} />
              ) : (
                ""
              )}
              {ComponentsName ==
              "Page_Fieldlayoutoptions_FlexibleLayouts_ServicesBannerSection" ? (
                <ServicesBanner QueryData={ComponentsData} />
              ) : (
                ""
              )}
              {ComponentsName ==
              "Page_Fieldlayoutoptions_FlexibleLayouts_ContentWithSidebar" ? (
                <ContentWithSidebar QueryData={ComponentsData} />
              ) : (
                ""
              )}
              {ComponentsName ==
              "Page_Fieldlayoutoptions_FlexibleLayouts_FullWidthCta" ? (
                <FullWidthCTA QueryData={ComponentsData} />
              ) : (
                ""
              )}
              {ComponentsName ==
              "Page_Fieldlayoutoptions_FlexibleLayouts_CareersSection" ? (
                <CareersSection QueryData={ComponentsData} />
              ) : (
                ""
              )}
              {ComponentsName ==
              "Page_Fieldlayoutoptions_FlexibleLayouts_ContactSection" ? (
                <ContactSection QueryData={ComponentsData} />
              ) : (
                ""
              )}
            </div>
          );
        })}
      </main>
      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    revalidate: 10,
  });
}
