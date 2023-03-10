// import render function and screen object from installed vue library
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event"; //import userEvent from installed library to stimulate events
import { describe, it, expect } from "vitest";
import { RouterLinkStub } from "@vue/test-utils";
import { useRoute } from "vue-router";
import type { Mock } from "vitest";
vi.mock("vue-router");

const useRouterMock = useRoute as Mock;
import { createTestingPinia } from "@pinia/testing";
import { useUserStore } from "@/stores/user.js";

import MainNav from "@/components/navigation/MainNav.vue";
const renderMainNav = () => {
  useRouterMock.mockReturnValue({ name: "Home" });
  const pinia = createTestingPinia({ stubActions: false });
  render(MainNav, {
    global: {
      plugins: [pinia],
      stubs: {
        FontAwesomeIcon: true,
        RouterLink: RouterLinkStub,
      },
    },
  });
};
describe("MainNav", () => {
  it("displays company name", () => {
    renderMainNav();
    const Name = screen.getByText("Kigali Careers");
    expect(Name).toBeInTheDocument();
  });
  it("displays the navigation links texts", () => {
    renderMainNav();
    const navigationTexts = screen.getAllByRole("link");
    const navigationTextsArray = navigationTexts.map((linkTexts) => {
      if (linkTexts.textContent != null) { return linkTexts.textContent.toLowerCase() }
    });

    expect(navigationTextsArray).toEqual([
      "location",
      "life at kigali careers centers",
      "how we hire",
      "students",
    ]);
  });
  describe("before user logs in", () => {
    it("doesn't display profile pic", () => {
      const userStore = useUserStore();
      renderMainNav();

      const profilePic = screen.queryByRole("img", {
        name: /profile pic/i,
      });

      expect(profilePic).not.toBeInTheDocument();
    });
  });
  describe("When User Logs in", () => {
    it("displays profile picture", async () => {
      const userStore = useUserStore();

      renderMainNav();

      const loginBtn = screen.getByRole("button", {
        name: /sign in/i,
      });

      await userEvent.click(loginBtn);

      const profilePic = screen.getByRole("img", {
        name: /profile pic/i,
      });
      expect(profilePic).toBeInTheDocument();
    });
  });
});
