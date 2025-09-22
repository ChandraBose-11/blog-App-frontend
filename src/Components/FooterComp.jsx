import {
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import { Link } from "react-router-dom";
const FooterComp = () => {
  return (
    <div>
      <Footer container className="border-t-8 border-teal-500">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="mt-5">
              <Link
                to={"/"}
                className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
              >
                <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                  blogger
                </span>
                Hunt
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8  sm:mt-4 sm:grid-cols-3 s,:gap-6">
              <div>
                <FooterTitle title="About" />
                <FooterLinkGroup col>
                  <FooterLink
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    100 JS Projects
                  </FooterLink>
                  <FooterLink
                    href="/about"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Blogger Hunt
                  </FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Follow us" />
                <FooterLinkGroup col>
                  <FooterLink
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Githhub
                  </FooterLink>
                  <FooterLink
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Linkedin
                  </FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Follow us" />
                <FooterLinkGroup col>
                  <FooterLink
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </FooterLink>
                  <FooterLink
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms &amp; Conditions
                  </FooterLink>
                </FooterLinkGroup>
              </div>
            </div>
          </div>
          <FooterDivider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooterCopyright
              href="#"
              by="Blogger Hunt"
              year={new Date().getFullYear()}
            />
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                <FooterIcon href="#" icon={BsFacebook}/>
                 <FooterIcon href="#" icon={BsInstagram}/>
                  <FooterIcon href="#" icon={BsLinkedin}/>
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default FooterComp;
