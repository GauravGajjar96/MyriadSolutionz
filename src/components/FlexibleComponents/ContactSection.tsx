import Heading from "components/Heading";
import React from "react";
import styles from "scss/components/FlexibleComponentStyles/ContactSection.module.scss";
import Image from "next/image";
import Link from "next/link";
import { client } from "client";
import Cf7FormWrapper from "./cf7-form-wrapper";
import { useState } from "react";

interface Props {
  QueryData: any;
  name:any;
}
interface Form{ 
  handler: any; 
  isLoading: Boolean;
  isSent:Boolean;
  hasError: any;
}

const Form = function Form({ handler, isLoading, isSent, hasError }) {
  const [formState, setFormState] = useState({})

  const handleFieldChange = (field, e) => {
    setFormState({
      ...formState,
      [field]: e.target.value,
    })
  }

  const handleFormSubmit = (e) => {
    handler(e, formState)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>isLoading: {isLoading ? "Loading" : "false"}</div>
      <div>isSent: {isSent ? "Sent" : "false"}</div>
      <div>Error: {hasError || "null"}</div>

      <div>Enter your name:</div>
      <input onChange={(e) => handleFieldChange("your-name", e)} type="text" />
      <div>Enter your email:</div>
      <input onChange={(e) => handleFieldChange("your-email", e)} type="text" />
      
      <input type="submit" value="Send" />
    </form>
  )
}
/*
const stripHtml = (string) => string.replace(/(<([^>]+)>)/gi, "");

const normalizeResponse = (url, response) => {
    if (
        url.match(/wp-json\/contact-form-7\/v1\/contact-forms\/\d+\/feedback/)
    ) {
        return normalizeContactForm7Response(response);
    }


    return {
        isSuccess: false,
        message: "Are you submitting to the right URL?",
        validationError: {}
    };
};


const normalizeContactForm7Response = (response) => {
    const isSuccess = response.status === "mail_sent";
    const message = response.message;
    const validationError = isSuccess
        ? {}
        : Object.fromEntries(
              response.invalid_fields.map((error) => {
                  const key = /cf7[-a-z]*.(.*)/.exec(error.into)[1];

                  return [key, error.message];
              })
          );

    return {
        isSuccess,
        message,
        validationError
    };
};
function formToJSON( elem ) {
  var current, entries, item, key, output, value;
  output = {};
  entries = elem.entries();
  // Iterate over values, and assign to item.
  while ( item = entries.next().value )
    {
      // assign to variables to make the code more readable.
      key = item[0];
      value = item[1];
      // Check if key already exist
      if (Object.prototype.hasOwnProperty.call( output, key)) {
        current = output[ key ];
        if ( !Array.isArray( current ) ) {
          // If it's not an array, convert it to an array.
          current = output[ key ] = [ current ];
        }
        current.push( value ); // Add the new value to the array.
      } else {
        output[ key ] = value;
      }
    }
    return JSON.stringify( output );
  }

const getFormJSON = (form) => {
  const data = new FormData();
  // return Array.from(data.keys()).reduce((result, key) => {
  //   result[key] = data.get(key);
  //   return result;
  // }, {});

};


const formSubmissionHandler = async (event) => {
  
    event.preventDefault();
    const formElement2 = event.target;
    console.log(formElement2);
    const formElement = event.target.elements[0],
        { action, method } = formElement,
        body = new FormData();
      //   for (let key in formElement) {
      //     Array.isArray(formElement[key])
      //         ? formElement[key].forEach(value => body.append(key + '[]', value))
      //         : body.append(key, formElement[key]) ;
      // }
      // for (const [key, value] of Object.entries(formElement) {
      //   console.log(key, value);
      //   body.append(key, value);
      // });
      Object.keys(formElement).forEach(fieldName => {
        
        body.append(fieldName, formElement[fieldName]);
        console.log(fieldName, formElement[fieldName]);
      })
      // for (const [key, value] of Object.entries(body)) {
      //     console.log(key, value);
      //   };
        console.log( Object.keys(formElement));
        // for(let [name, value] of formElement) {
        //   // alert(`${name} = ${value}`); // key1 = value1, then key2 = value2
        //   body.append(name,value);
        // }
        // Array.from(formElement).forEach((name,value) => {
        //   if (!name) return;
        //   body.append(name,value);
        // });
        // JSON.stringify(body)

        // Object.keys(formElement).forEach(key => body.append(key, formElement[key]));
        // Object.keys(formElement).forEach(fieldName => {
        //   // console.log(fieldName, formElement[fieldName]);
        //   body.append(fieldName, formElement[fieldName]);
        // })
        
// let formDatss = body.entries();
// const keys = Object.keys(formDatss);  
// keys.forEach((key, index) => {
//   console.log(`${key}: ${formDatss[key]}`);
// });    
//  console.log(formDatss);
        // await fetch(action, {
        // method : "POST",
        // body,
        // headers: {
                // 'accept':'application/json',
                // "Content-Type": "application/json",
                // "Access-Handler":"Authorization:null",
    //     }
    // })
    //     .then((response) => response.json())
    //     .then((response) => normalizeResponse(action, response))
    //     .then((response) => {
    //         alert(response.message);

    //         if (response.isSuccess) {
    //             formElement.reset();
    //         }
    //     })
    //     .catch((error) => {
    //         alert("Check the console for the error details.");
    //         console.log(error);
    //     });
};

*/


function ContactSection({ QueryData }: Props): JSX.Element{
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const Description = QueryData?.description;
  const MainImage = QueryData?.image?.sourceUrl();
  const { useQuery } = client;
  const address = useQuery().themeGeneralSettings?.generalThemeSettings?.address;
  const emailAddress = useQuery().themeGeneralSettings?.generalThemeSettings?.emailAddress;
  const phone1 = useQuery().themeGeneralSettings?.generalThemeSettings?.phone1;
  const phone2 = useQuery().themeGeneralSettings?.generalThemeSettings?.phone2;
  const socialMediaList = useQuery().themeGeneralSettings?.generalThemeSettings?.socialMediaList;

  return (
    <section className={styles.contactsection} style={{
        backgroundImage: `url(${MainImage})`
      }}>
      

        <div className="container">
          <div className={styles.contactsecinner}>
            {MainHeading ? (
              <Heading level={HeadingTag} className={styles.ctatitle}>
                <div dangerouslySetInnerHTML={{ __html: MainHeading ?? "" }} />
              </Heading>
            ) : (
              ""
            )}
            {Description ? (
            <div dangerouslySetInnerHTML={{ __html: Description ?? "" }} />
            ) : (
                ""
              )}
          </div>
            <div className={`${styles.contactInfoBlock} row d-flex`}>
                <div className={`${styles.ContactInfoCol} col bg-dark`}>
                    <div className={styles.contactInfoData}>
                        <h3>Get in touch with us</h3>

                        {address || emailAddress || phone1 || phone2  ? (
                        <ul className="company-info">
						{address ? (	<li><a href="#"><i className="fas fa-map-marker-alt"></i>{address}</a></li>):""}
            {emailAddress ? (<li><a href={`mailto:${emailAddress}`}><i className="far fa-envelope"></i>{emailAddress}</a></li>):""}
            {phone1 ? ( <li><a href={`tel:+${phone1.replace(/-|\s/g,"")}`}><i className="fas fa-headset"></i>+{phone1}</a></li>):""}
            {phone2 ? ( <li><a href={`tel:+${phone2.replace(/-|\s/g,"")}`}>+{phone2}</a></li>):""}
				        </ul>):""
} {socialMediaList ? (
                        <ul className={styles.social_media}>
                          {socialMediaList.map((link,index) => (
                            <li key={index}>
                            <Link href={String(link.socialLink)}>
                              <a className={styles[link.socialName]} target="_blank">
                              <i className={link.socialIcon}></i>
                              </a>
                            </Link>
                          </li>
                            ))}
					    </ul>):""}
                    </div>
                </div>
              <div className={`${styles.ContactInfoCol} col`}>
                  <div className="contactForm">
                  {/*<form method="post" action="http://localhost/myriadsolutionz/wp-json/contact-form-7/v1/contact-forms/455/feedback" onSubmit={formSubmissionHandler}>
						<div className="alert alert-success d-none" role="alert">
							Your enquiry has been received at Myriad Solutionz. We will get back to you with 2 business days. Thank you!
						</div>
						<div className="alert alert-danger d-none" role="alert">
							Please Try Again.
						</div>
						<div className="row">
							<div className="col-md-12 col-sm-12 col-12">
								<div className="form-group">
									<input type="text" className="form-control" name="your-name" placeholder="Name" required/>
									<div className="invalid-feedback">Please enter Name.</div>
								</div>
							</div>
							<div className="col-md-6 col-sm-6 col-6 pr-1">
								<div className="form-group">
									<input type="email" className="form-control" name="your-email" placeholder="Email" required/>
									<div className="invalid-feedback">Please enter email.</div>
								</div>
							</div>
							
							
							<div className="col-md-3 col-sm-3 col-3 pl-1">
                <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
								<input type="hidden" value="save_contact_data" name="action" />
							</div>
						</div>
					</form>*/}
          <Cf7FormWrapper url="http://localhost/myriadsolutionz/wp-json/contact-form-7/v1/contact-forms/455/feedback">
            <Form handler={undefined} isLoading={false} isSent={false} hasError={false} />
          </Cf7FormWrapper>
                  </div>
              </div>
              <div className={`${styles.ContactInfoCol} col`}>
                  <div className={styles.contactMap}>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7343.711550625083!2d72.55432187358568!3d23.029067139798997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e846cec1381b7%3A0xc8c7f23486371bb8!2sMyriad%20Solutionz!5e0!3m2!1sen!2sin!4v1652033201565!5m2!1sen!2sin" width="600" height="450"  style={{border: 0}}  loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe>
                  </div>
              </div>
          </div>
        </div>
    
    </section>
  );
}

export default ContactSection;

