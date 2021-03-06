import { getNextStaticProps, is404 } from "@faustjs/next";
import {
  Footer,
  Header,
  Hero,
  HeroBanner,
  InnerBanner,
  IntroSection,
  ExpertiseSection,
  PortfolioSection,
  WeOfferSection,
  SolutionServices,
  AboutInfo,ChooseUs,ServicesBanner,ContentWithSidebar,FullWidthCTA,CareersSection,ContactSection
} from "components";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { client, Page as PageType } from "client";

export interface PageProps {
  page: PageType | PageType["preview"]["node"] | null | undefined;
}

export function PageComponent({ page }: PageProps) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  const { usePage } = client;
  const LayoutOptions = usePage().fieldLayoutOptions.flexibleLayouts;

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {page?.title()} - {generalSettings.title}
        </title>
      </Head>

      {/* <Hero
        title={page?.title()}
        bgImage={page?.featuredImage?.node.sourceUrl()}
      /> */}

      <main className="content content-single">
        {LayoutOptions.map((Layout, index) => {
          var ComponentsName = Layout.__typename;
          var ComponentsData = Layout.$on[ComponentsName];
          console.log(ComponentsData);


          return (
            <div key={index}>
              {ComponentsName ==
              "Page_Fieldlayoutoptions_FlexibleLayouts_HeroSection" ? (
                <HeroBanner QueryData={ComponentsData} />
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
              "Page_Fieldlayoutoptions_FlexibleLayouts_AboutInfo" ? (
                <AboutInfo QueryData={ComponentsData} />
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

export default function Page() {
  const { usePage } = client;
  const page = usePage();

  return <PageComponent page={page} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
