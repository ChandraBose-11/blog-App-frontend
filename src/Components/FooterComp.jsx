import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import React from "react";

const FooterComp = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-3">
          <div>
            <FooterBrand
              href="#"
              src="https://i.pinimg.com/originals/bc/6d/ba/bc6dba1583b51782a61bdfc2b2daf181.jpg"
              alt="Logo"
              name="Blogger-Hunt "
            />
          </div>
          <div className="grid grid-cols-3 gap-8 sm:mt-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="Frontend Libraries" />
              <FooterLinkGroup col>
                <FooterLink href="https://flowbite.com/" target="_blank">
                  Flowbite
                </FooterLink>
                <FooterLink href="https://tailwindcss.com/" target="_blank">
                  Tailwind CSS
                </FooterLink>
                <FooterLink href="https://reactjs.org/" target="_blank">
                  React
                </FooterLink>
                <FooterLink href="https://redux.js.org/" target="_blank">
                  Redux
                </FooterLink>
                <FooterLink href="https://firebase.google.com/" target="_blank">
                  Firebase
                </FooterLink>
                <FooterLink href="https://ant.design/" target="_blank">
                  Ant Design
                </FooterLink>
                <FooterLink href="https://www.npmjs.com/package/jspdf" target="_blank">
                  jsPDF
                </FooterLink>
                <FooterLink href="https://react-icons.github.io/react-icons/" target="_blank">
                  React Icons
                </FooterLink>
                <FooterLink href="https://reactrouter.com/" target="_blank">
                  React Router DOM
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Frontend Packages" />
              <FooterLinkGroup col>
                <FooterLink href="https://www.npmjs.com/package/axios" target="_blank">
                  Axios
                </FooterLink>
                <FooterLink href="https://www.npmjs.com/package/file-saver" target="_blank">
                  File Saver
                </FooterLink>
                <FooterLink href="https://www.npmjs.com/package/react-circular-progressbar" target="_blank">
                  React Circular Progressbar
                </FooterLink>
                <FooterLink href="https://www.npmjs.com/package/react-csv" target="_blank">
                  React CSV
                </FooterLink>
                <FooterLink href="https://www.npmjs.com/package/react-toastify" target="_blank">
                  React Toastify
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Backend Packages" />
              <FooterLinkGroup col>
                <FooterLink href="https://www.npmjs.com/package/bcryptjs" target="_blank">
                  bcryptjs
                </FooterLink>
                <FooterLink href="https://expressjs.com/" target="_blank">
                  Express
                </FooterLink>
                <FooterLink href="https://mongoosejs.com/" target="_blank">
                  Mongoose
                </FooterLink>
                <FooterLink href="https://www.npmjs.com/package/cors" target="_blank">
                  Cors
                </FooterLink>
                <FooterLink href="https://www.npmjs.com/package/jsonwebtoken" target="_blank">
                  JWT
                </FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between font-bold">
          <FooterCopyright
            href="#"
            by="ChandraBose™"
            year={new Date().getFullYear()}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon
              href="https://github.com/ChandraBose-11"
              icon={BsGithub}
            />
            <FooterIcon
              href="https://www.linkedin.com/in/chandra-bose-b838142a1/"
              icon={BsLinkedin}
            />
          </div>
        </div>
      </div>
      
    </Footer>
  );
};

export default FooterComp;