import Link from "next/link";
import React from "react";
import styles from "scss/components/Footer.module.scss";
import Image from "next/image";
import { client, MenuLocationEnum } from "client";
import Heading from "components/Heading";
import { useRouter } from "next/router";

interface Props {
  copyrightHolder?: string;
}

function Footer({ copyrightHolder = "Company Name" }: Props): JSX.Element {
  const { menuItems } = client.useQuery();
  const router = useRouter();
  const os_links = menuItems({
    where: { location: MenuLocationEnum.OUR_SERVICES },
  }).nodes;
  const footer_links = menuItems({
    where: { location: MenuLocationEnum.FOOTER },
  }).nodes;
  const year = new Date().getFullYear();

  return (
    <footer
      className={`${styles.main} ${styles.mainfooter}`}
      style={{
        backgroundImage:
          "url(https://myriadsolutionz.com/wp-content/uploads/2020/02/footer.webp)",
      }}
    >
      <div className={`${styles.footerinner} container`}>
        <div className={`${styles.footertop} d-flex`}>
          <div className={`${styles.footercolone} col`}>
            <Link href="/">
              <a className={styles.footerlogo}>
                <Image
                  src="https://myriadsolutionz.com/wp-content/uploads/2019/10/logo-1.svg"
                  alt="Landscape picture"
                  width="120"
                  height="38"
                />
              </a>
            </Link>
            <ul className={styles.companyinfo}>
              <li>
                <Link href="/">
                  <a>
                    <i className="fas fa-map-marker-alt"></i>
                    B-103 Time Square Building, Opp. Iscon Arcade, C.G. Road,
                    Ahmedabad - 380009 India
                  </a>
                </Link>
              </li>
              <li>
                <Link href="mailto:info@myriadsolutionz.com">
                  <a>
                    <i className="far fa-envelope"></i>info@myriadsolutionz.com
                  </a>
                </Link>
              </li>
              <li>
                <Link href="tel:917984205622">
                  <a>
                    <i className="fas fa-headset"></i>+91-798 420 5622
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={`${styles.footercoltwo} col`}>
            <Heading level={"h3"} className={styles.footercoltitle}>
              Our Services
            </Heading>
            <ul className={styles.footerservicelink}>
              {os_links?.map((oslink) => (
                <li key={`${oslink.label}1`}>
                  <Link href={oslink.url ?? ""}>
                    <a
                      href={oslink.url}
                      className={oslink.url === router.pathname ? "active" : ""}
                    >
                      {oslink.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.footercolthree} col`}>
            <Heading level={"h3"} className={styles.footercoltitle}>
              Site Analysis Report
            </Heading>
            <form
              className={`${styles.websitecheckup} ${styles.siteanalysisreport}`}
              method="POST"
            >
              <div className="alert alert-success d-none" role="alert">
                Your enquiry has been received at Myriad Solutionz. We will get
                back to you with 2 business days. Thank you!
              </div>
              <div className="alert alert-danger d-none" role="alert">
                Please Try Again.
              </div>
              <div className="pos-rel">
                <i className="fas fa-globe"></i>
                <input
                  className="footer-input"
                  type="url"
                  name="website_link"
                  placeholder="Website URL"
                />
              </div>
              <div className="pos-rel">
                <i className="fas fa-at"></i>
                <input
                  className={`${styles.footerinput} ${styles.lastinput}`}
                  type="email"
                  name="user_email"
                  placeholder="Your Email ID"
                />
              </div>
              <button
                type="submit"
                className="btn btn-default form-submit-button"
              >
                <i className="fa fa-long-arrow-alt-right"></i>
              </button>
              <input type="hidden" value="save_website_checkup" name="action" />
            </form>
          </div>
        </div>
        <div className={`${styles.footerbottom} container`}>
          <div className="row d-flex justify-space align-center">
            <div className="col">
              <ul className={styles.socialmedia}>
                <li>
                  <Link href="https://www.facebook.com/myriadsol">
                    <a className={styles.facebook} target="_blank">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/myriadsolutionz">
                    <a className={styles.insta} target="_blank">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://in.linkedin.com/company/myriad-solutionz">
                    <a className={styles.linkedin} target="_blank">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className={`${styles.footermenulink} d-flex`}>
                {footer_links?.map((flink) => (
                  <li key={`${flink.label}$-menu-flink`}>
                    <Link href={flink.url ?? ""}>
                      <a
                        href={flink.url}
                        className={
                          flink.url === router.pathname ? "active" : ""
                        }
                      >
                        {flink.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={`${styles.copyright} text-center`}>
          <p className={styles.copyrighttxt}>
            {`© Copyright ${year} Myriad Solutionz | All Rights Reserved`}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
