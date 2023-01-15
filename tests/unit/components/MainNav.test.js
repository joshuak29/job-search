// import render function and screen object from installed vue library
import { render, screen } from "@testing-library/vue";
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
