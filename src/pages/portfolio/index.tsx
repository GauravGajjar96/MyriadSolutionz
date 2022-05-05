import Head from 'next/head';
import { Header, Footer, Hero } from '../../components';
import { client } from '../../client';
import styles from "scss/components/FlexibleComponentStyles/PortfolioSection.module.scss";
import Link from "next/link";
import Heading from "components/Heading";

export default function Page() {	
  const { useQuery,usePosts, useCategory } = client;
  const { generalSettings } = client.useQuery();
  const portfolioItems = useQuery().allPortfolio()?.nodes;
  
  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>Portfolio - {generalSettings.title}</title>
      </Head>

      <Hero title="The web is our playground." bgImage="https://myriadsolutionz.com/wp-content/uploads/2019/10/work.jpg"/>

      <main className="content content-single">
      <ul className="category-link">
		<li><a href="https://myriadsolutionz.com/portfolio/" className="">Show all</a></li>
				<li>
			<a href="https://myriadsolutionz.com/portfolio_category/content-management-systems/" className="active">
				CMS			</a>
		</li>
				<li>
			<a href="https://myriadsolutionz.com/portfolio_category/e-commerce/" className="">
				E-commerce			</a>
		</li>
				<li>
			<a href="https://myriadsolutionz.com/portfolio_category/email-marketing/" className="">
				Email Marketing			</a>
		</li>
				<li>
			<a href="https://myriadsolutionz.com/portfolio_category/mobile-responsive/" className="">
				Mobile / Responsive			</a>
		</li>
				<li>
			<a href="https://myriadsolutionz.com/portfolio_category/search-engine-optimization/" className="">
				SEO			</a>
		</li>
				<li>
			<a href="https://myriadsolutionz.com/portfolio_category/web-development/" className="">
				Web Development			</a>
		</li>
			</ul>
      <section
        className={`${styles.portfoliosection} portfolioSection commonPadding`}
      >
        <div className="container">
          
          <div className="portfolio-block">
          <div className={`${styles.portfolioList}`}>
              <div className="row d-flex">
              {portfolioItems.map((item, index) => {
                // console.log(item);
      
                const prtitmHeading = item?.title();
                const prtitmImage = item?.featuredImage?.node?.sourceUrl();

                return ( <div className={`${styles.portfolioItem} col`} key={index}>
                <div
                  className={`${styles.portfolioItemWrap}`}
                  style={{
                    backgroundImage:
                      `url(${prtitmImage})`
                  }} key={index}> 
                  <div className={`${styles.portfolioContent}`}>
                    
                    <Heading level="h4" className={`${styles.h4}`}>
                    {prtitmHeading}
                    </Heading>
                    
                     <div className={`${styles.portfolioCategory}`}>
                    {item?.portfolioCategories()?.nodes?.map((cat,i) => {
                      return (
                        <Link href={String(cat?.link)} key={i}>
                        <a className={`${styles.categorylink}`}>
                          {cat?.name}
                        </a>
                      </Link>
                      );
                    })
                  }
                      
                    </div> 

                    <Link href={String(prtitmImage)}>
                      <a className={`${styles.portfolioLink}`}>
                        <i className="fas fa-long-arrow-alt-right"></i>
                      </a>
                    </Link>
                  </div>
                </div> 
              </div>);
              })} 
                         
                     
              </div>
            </div>
        </div></div></section>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
  
}


