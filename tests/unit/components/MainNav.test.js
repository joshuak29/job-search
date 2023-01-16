// import render function and screen object from installed vue library
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event"   //import userEvent from installed library to stimulate events
import { describe, it, expect } from "vitest";

import MainNav from "@/components/MainNav.vue";

describe("MainNav", () => {
  it("displays company name", () => {
    render(MainNav);
    //screen.debug();
    const Name = screen.getByText("Kigali Careers");
    expect(Name).toBeInTheDocument();
  });
  it("displays the navigation links texts", () => {
	  render(MainNav);
	  const navigationTexts = screen.getAllByRole("link")
	  const navigationTextsArray = navigationTexts.map((linkTexts) => linkTexts.textContent)
	  //console.log(navigationTextsArray)
	  expect(navigationTextsArray).toEqual(['Kigali Careers','Teams','Location','Life at Kigali centers','How We Hire','Students','Jobs'])
  })
});

describe("When User Logs in", () => {
	it("displays profile picture", async () => {
		render(MainNav)
		// screen.debug()
		
		const profilePic = screen.queryByRole("img", {
			//name: "profile pic"              //select img tag with alt = profile pic 
			name: /profile pic/i               //select with regep(recomended) (case insensitive)
		})
		expect(profilePic).not.toBeInTheDocument();  //should not be in the DOM on load(before loging in)
		
		const loginBtn = screen.queryByRole("button", {
			name: /sign in/i
		})
		await userEvent.click(loginBtn);
		// screen.debug()
		const profilePic2 = screen.queryByRole("img", {
			name: /profile pic/i     
		})
		expect(profilePic2).toBeInTheDocument();  //should be in the DOM on load(after loging in)
		
	})
	
	
})
