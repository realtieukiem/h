import type { PrivacyPolicy } from '../data/types';

export const privacy: PrivacyPolicy = {
  title: 'Privacy Policy for Im Game Dev',
  responsibleParty: 'Im Game Dev',
  contactEmail: 'realtieukiem@gmail.com',
  effectiveDate: '2023-11-13',
  lastUpdated: '',
  sections: [
    {
      id: 'privacy-policy',
      numeral: 'I',
      title: 'Privacy Policy',
      blocks: [
        {
          type: 'p',
          text: 'Im Game Dev built the Im Game Dev app as a Free app. This SERVICE is provided by Im Game Dev at no cost and is intended for use as is.',
        },
        {
          type: 'p',
          text: 'This page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service.',
        },
        {
          type: 'p',
          text: 'If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy.',
        },
        {
          type: 'p',
          text: 'The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at Im Game Dev unless otherwise defined in this Privacy Policy.',
        },
      ],
    },
    {
      id: 'information-collection-and-use',
      numeral: 'II',
      title: 'Information Collection and Use',
      blocks: [
        {
          type: 'p',
          text: 'For a better experience, while using our Service, I may require you to provide us with certain personally identifiable information, including but not limited to Im Game Dev. The information that I request will be retained on your device and is not collected by me in any way.',
        },
        {
          type: 'p',
          text: 'The app does use third-party services that may collect information used to identify you.',
        },
        {
          type: 'p',
          text: 'Link to the privacy policy of third-party service providers used by the app',
        },
        {
          type: 'links',
          items: [
            { label: 'Google Play Services', url: 'https://www.google.com/policies/privacy/' },
            { label: 'AdMob', url: 'https://support.google.com/admob/answer/6128543?hl=en' },
            { label: 'Facebook', url: 'https://www.facebook.com/about/privacy/update/printable' },
          ],
        },
      ],
    },
    {
      id: 'log-data',
      numeral: 'III',
      title: 'Log Data',
      blocks: [
        {
          type: 'p',
          text: 'I want to inform you that whenever you use my Service, in a case of an error in the app I collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing my Service, the time and date of your use of the Service, and other statistics.',
        },
      ],
    },
    {
      id: 'cookies',
      numeral: 'IV',
      title: 'Cookies',
      blocks: [
        {
          type: 'p',
          text: "Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.",
        },
        {
          type: 'p',
          text: 'This Service does not use these “cookies” explicitly. However, the app may use third-party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.',
        },
      ],
    },
    {
      id: 'service-providers',
      numeral: 'V',
      title: 'Service Providers',
      blocks: [
        {
          type: 'p',
          text: 'I may employ third-party companies and individuals due to the following reasons:',
        },
        {
          type: 'list',
          items: [
            'To facilitate our Service;',
            'To provide the Service on our behalf;',
            'To perform Service-related services; or',
            'To assist us in analyzing how our Service is used.',
          ],
        },
        {
          type: 'p',
          text: 'I want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.',
        },
      ],
    },
    {
      id: 'security',
      numeral: 'VI',
      title: 'Security',
      blocks: [
        {
          type: 'p',
          text: 'I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.',
        },
      ],
    },
    {
      id: 'links-to-other-sites',
      numeral: 'VII',
      title: 'Links to Other Sites',
      blocks: [
        {
          type: 'p',
          text: 'This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.',
        },
      ],
    },
    {
      id: 'childrens-privacy',
      numeral: 'VIII',
      title: 'Children’s Privacy',
      blocks: [
        {
          type: 'p',
          text: 'These Services do not address anyone under the age of 13. I do not knowingly collect personally identifiable information from children under 13 years of age. In the case I discover that a child under 13 has provided me with personal information, I immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me so that I will be able to do the necessary actions.',
        },
      ],
    },
    {
      id: 'changes-to-this-privacy-policy',
      numeral: 'IX',
      title: 'Changes to This Privacy Policy',
      blocks: [
        {
          type: 'p',
          text: 'I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page.',
        },
        {
          type: 'p',
          text: 'This policy is effective as of 2023-11-13',
        },
      ],
    },
    {
      id: 'contact-us',
      numeral: 'X',
      title: 'Contact Us',
      blocks: [
        {
          type: 'p',
          text: 'If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me:',
        },
        {
          type: 'contact',
          label: 'Email',
          email: 'realtieukiem@gmail.com',
        },
      ],
    },
  ],
};
