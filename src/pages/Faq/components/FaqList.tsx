import { useState } from 'react';

const groups = [
  {
    id: 'general',
    label: 'General',
    items: [
      ['How to sign up for an IDbook account?', 'On the website page, in the left corner, you will find the account sign up details. Add your details and explore our design library.'],
      ['How to contact IDbook for any issue or doubt?', 'You will find our service mail in the About Us category, situated at the bottom of the website page.'],
      ['What is the useful content on IDbook?', 'On IDbook you can be a buyer. You will find new designs every week, and by subscribing you will hear about modifications and new services.'],
      ['How to download drawings from IDbook?', 'First log in, then select your category and design and purchase it. You will receive a mail including your desired interior design.'],
      ['Why should I use IDbook?', 'IDbook helps people design their own interiors and gives designers a place to share distinct work.'],
      ['How can I get information and notifications of new designs regularly?', 'Register your email on our website. Every week we send updates and new modifications to that address.'],
    ],
  },
  {
    id: 'membership',
    label: 'Membership / User',
    items: [
      ['Can anyone become a member / user?', 'Yes. Everyone can become a member / user.'],
      ['Why is membership required?', 'Membership lets you buy designs, see new work each week, and hear about modifications and new services.'],
      ['Who are professional members?', 'Only architects and interior designers will be professional members on the website.'],
      ['How do I deactivate my account?', 'You will find the Deactivate account option in My Account.'],
    ],
  },
  {
    id: 'orders',
    label: 'Products & Orders',
    items: [
      ['What file types are included on IDbook?', 'Three types of files are available when you purchase a design: CAD file, JPG and PDF.'],
      ['What drawing types are included on IDbook?', 'Drawings related to interior design only.'],
      ['Can we reuse these files on our website or social media?', 'No. The files are under our copyright. If you share a purchased design, mention IDbook as the source.'],
      ['I am not able to open the CAD, JPG or PDF. What do I do now?', 'CAD files are prepared in AutoCAD 2004, so you may need to convert them. If a file is corrupt, mail it to care@idbook.in and we will send it again.'],
      ['Can I get hard copies of designs?', 'We provide hard copies for special requests only. This is paid, with an extra charge for extra copies.'],
      ['How do I know my order has been confirmed?', 'You will receive an immediate mail and an SMS on your registered mobile number.'],
      ['The purchased design and the received design are different. What do I do?', 'Forward the mail to sales@idbook.in and we will help you.'],
      ['I am not able to pay through my debit card or credit card. What do I do?', 'Check your bank details. All banks are included in the payment section.'],
      ['How many designs can I purchase in one order?', 'You can purchase any number of designs. There is no limit.'],
      ['When will I receive my refund for a failed transaction?', 'Mail support@idbook.in and forward the payment cancellation mail so we can start the refund.'],
    ],
  },
];

const FaqList = () => {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(0);
  const current = groups[tab];

  return (
    <div className="sorath-faq-list">
      <div className="sorath-faq-tabs">
        {groups.map((group, index) => (
          <button
            key={group.id}
            type="button"
            className={tab === index ? 'is-active' : ''}
            onClick={() => {
              setTab(index);
              setOpen(0);
            }}
          >
            {group.label}
          </button>
        ))}
      </div>

      {current.items.map(([question, answer], index) => (
        <article key={question} className={open === index ? 'is-open' : ''}>
          <button type="button" onClick={() => setOpen(open === index ? -1 : index)}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            {question}
          </button>
          {open === index && <p>{answer}</p>}
        </article>
      ))}
    </div>
  );
};

export default FaqList;
