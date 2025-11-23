import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  PopoverGroup,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

/* ---------------- MUI Styled Badge ---------------- */
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

/* Small avatar (used inside badge content if needed) */
const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

/* ---------------- Component ---------------- */
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white w-full fixed top-0 left-0 right-0 shadow">
        <nav
          aria-label="Global"
          className="w-full flex items-center justify-between px-6 py-4"
        >
          {/* Logo */}
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 text-white bg-green-500"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Menu */}
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <a href="#" className="text-sm font-semibold text-black">
              Dashboard
            </a>
            <a href="#" className="text-sm font-semibold text-black">
              Users
            </a>
            <a href="#" className="text-sm font-semibold text-black">
              Donations
            </a>
            <a className="block text-base font-semibold text-black" href="#">
              Alerts
            </a>
            <a className="block text-base font-semibold text-black" href="#">
              Analytics
            </a>
            <a className="block text-base font-semibold text-black" href="#">
              Settings
            </a>
          </PopoverGroup>

          {/* Right Side: Avatar + Online Badge */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt="User"
                src="https://mui.com/static/images/avatar/1.jpg"
              />
            </StyledBadge>
          </div>
        </nav>

        {/* ---------------- Mobile Menu ---------------- */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50 bg-black/30" />

          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full bg-white p-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 text-white bg-green-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <a className="block text-base font-semibold text-black" href="#">
                Dashboard
              </a>
              <a className="block text-base font-semibold text-black" href="#">
                Users
              </a>
              <a className="block text-base font-semibold text-black" href="#">
                Donations
              </a>
              <a className="block text-base font-semibold text-black" href="#">
                Alerts
              </a>
              <a className="block text-base font-semibold text-black" href="#">
                Analytics
              </a>
              <a className="block text-base font-semibold text-black" href="#">
                Settings
              </a>

              {/* Mobile Badge + Avatar */}
              <div className="pt-6">
                <Stack direction="row" spacing={2}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      alt="User"
                      src="https://mui.com/static/images/avatar/1.jpg"
                      sx={{ width: 24, height: 24 }}
                    />
                  </StyledBadge>
                </Stack>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  );
};

export default Header;
