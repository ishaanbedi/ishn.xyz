const PrivacyPolicy = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center ">
        PRIVACY POLICY FOR ISHN.XYZ
      </h1>
      <h3 className="text-xl font-bold text-center ">
        Last updated: 27-12-2022
      </h3>
      <div className="px-3 py-3">
        <p>
          Our link shortener app is an open-source project, which means that the
          source code is freely available for anyone to view, modify, and
          distribute. The app was built by an indie developer, working
          independently of a larger organization. We are committed to keeping
          the app open-source and do not have any plans to sell or profit from
          it. We have no intention of earning profits or selling any data
          collected through the app. We believe in the importance of
          transparency and the benefits of open-source software for users and
          developers alike.
        </p>
        <p>
          With ishn.xyz, I am committed to protecting the privacy of the users
          (&quot;you,&quot; &quot;your,&quot; or &quot;yours&quot;). This
          privacy policy (&quot;Policy&quot;) explains practices regarding the
          collection, use, and disclosure of your personal information when you
          use our link shortener app and related services (the
          &quot;Services&quot;). Please read this Policy carefully to understand
          the policies and practices regarding your personal information and how
          I will treat it. If you do not agree with our policies and practices,
          do not use our services.
        </p>
        <h2 className="text-xl font-bold">Data Stored</h2>
        <p>
          There are two ways you register with us: (1) By creating an account
          with us by providing just your email address and signing in with a
          magic link, sent over to your email via Sendgrid. <br />
          or (2) via GitHub OAuth. With this method, we just read your email
          address, name, and profile picture from GitHub. We do not read/store
          any other information from your GitHub account.
        </p>
        <p>
          When you use ishn.xyz, we store the following types of personal
          information in the database:
        </p>
        <p>
          <strong>Name:</strong> We may collect your name when you create an
          account with us or otherwise provide it to us. We use your name to
          identify you as a user of our Services.
        </p>
        <p>
          <strong>Email:</strong> We collect your email address when you create
          an account with us to uniquely identify your account. We use Sendgrid
          to let the users sign up for an account.
        </p>

        <p>
          <strong>Views:</strong> We collect information about the number of
          clicks for each link you create using our Services.
        </p>
        <p>
          <strong>Countries:</strong> We collect names of the countries where
          your links are viewed. We use this information to give you a more
          detailed analysis about how your created links are performing. The
          only geographical information we collect is the country name of the
          user which accesses our Services (ex: India, USA, Germany etc.). We do
          not collect or store any other information about any user&apos;s
          location.
        </p>
        <h2 className="text-xl font-bold">Use of Your Personal Information</h2>
        <p>
          The only use of your information (name & email) is to reflect the same
          back to you and uniquely identify your account in the database. We do
          not sell or share your information with any third party.
        </p>
        <h2 className="text-xl font-bold">
          Security of Your Personal Information
        </h2>
        <p>
          We take reasonable measures to protect your personal information from
          unauthorized access, use, or disclosure.
        </p>
        <h2 className="text-xl font-bold">Children&apos;s Privacy</h2>
        <p>
          Our Services are not intended for children. We do not knowingly
          collect personal information from children. If we are notified that we
          have stored information from a child, we will take steps to delete
          such information as soon as possible.
        </p>
        <h2 className="text-xl font-bold">Changes to This Policy</h2>
        <p>
          We may update this Policy from time to time. We will post any changes
          on this page and, if the changes are significant, we will provide a
          more prominent notice at the landing page as well. We encourage you to
          review this Policy whenever you access our Services to stay informed
          about our information practices and the choices available to you.
        </p>
        <h2 className="text-xl font-bold">Contact Us</h2>
        <p>
          If you have any questions about this Policy or our information
          practices, please contact me at{" "}
          <a href="mailto:hi@ishaanbedi.in">hi@ishaanbedi.in</a>.
        </p>
        <h3 className="text-xl font-bold">Get your account deleted/upgraded</h3>
        <p>
          If you are concerned about any of the policy mentioned above, you can
          request a deletion of your account or a special upgrade to your
          account that does not store specified information.
          <br />
          For such requests, please contact me at{" "}
          <a href="mailto:hi@ishaanbedi.in">hi@ishaanbedi.in</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
