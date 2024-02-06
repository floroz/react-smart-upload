import { FilePicker } from "../../src/components";

describe("<FilePicker />", () => {
  it("renders the input", () => {
    cy.mount(<FilePicker files={[]} />);

    cy.findByLabelText("Choose a file").as("input");

    cy.get("@input").should("exist");
  });

  it("should render the file name once selected", () => {
    cy.mount(<FilePicker files={[new File([""], "example.txt")]} />);

    cy.findByText("example.txt").should("exist");
  });

  it("should render the custom placeholder", () => {
    cy.mount(<FilePicker files={null} placeholder="Select a file..." />);

    cy.findByText("Select a file...").should("exist");
  });

  // In Headed mode, this test needs the Browser Window in focus to pass
  it("should render an outline on the label when the input focused", () => {
    cy.mount(<FilePicker files={null} />);

    cy.findByLabelText("Choose a file").as("input");

    cy.get("@input").focus();

    cy.get("@input")
      .parent()
      .should("have.css", "outline", "rgb(59, 130, 246) solid 2px");
  });

  it.only("should support selecting a file from disk", () => {
    cy.mount(<FilePicker files={null} />);

    cy.findByLabelText("Choose a file").as("input");

    cy.get("@input").should("have.prop", "files").and("have.length", 0);

    cy.get("@input").selectFile("cypress/fixtures/example.json", {
      force: true,
    });

    cy.get("@input").should("have.prop", "files").and("have.length", 1);
  });
});

// describe("<FilePicker /> Visual Regression", () => {
//   cy.mount(() => (
//     <>
//       <FilePicker files={[]} />
//       <FilePicker files={[new File([""], "example.txt")]} />
//       <FilePicker files={null} placeholder="Select a file..." />
//       <FilePicker files={null} variant="primary" />
//       <FilePicker files={null} variant="secondary" />
//       <FilePicker files={null} variant="tertiary" />
//     </>
//   ));

//   // take snapshot with Percy for example
//   cy.percySnapshot();
// })
