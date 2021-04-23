import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { App } from "./App";
import { setHintResponse, setVerifyResponse } from "./mocks";
import { Provider } from "react-redux";
import { createNewStore } from "./data";

const setup = () => {
  return render(
    <Provider store={createNewStore()}>
      <App />
    </Provider>
  );
};

describe("App test", () => {
  it("on first load it should show submit button and no api error message", () => {
    setHintResponse({ hint: "12345678" });
    setup();

    return waitFor(() => {
      expect(
        screen.queryByText("Sorry! The API failed on us.")
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Submit" })
      ).toBeInTheDocument();
    });
  });

  it("should show error message if new-password api call fails", () => {
    setHintResponse({ hint: "12345678" }, 404);
    setup();

    return waitFor(() => {
      expect(
        screen.queryByText("Sorry! The API failed on us.")
      ).toBeInTheDocument();
    });
  });

  it("should attempt #1 if the user makes a wrong guess", () => {
    setHintResponse({ hint: "12345678" }, 200);
    setVerifyResponse({
      correct: false,
      highlight: [],
      answer: "12345678",
      hint: "12345678",
    });
    setup();

    fireEvent.change(screen.getByPlaceholderText("Type here"), {
      target: { value: "12345678" },
    });
    fireEvent.click(screen.getByRole("button"));

    return waitFor(() => {
      expect(screen.queryByText(/attempt #1/i)).toBeInTheDocument();
      expect(
        screen.queryByText("Sorry! The API failed on us.")
      ).not.toBeInTheDocument();
    });
  });

  it("should show error message if verify-password api call fails", () => {
    setHintResponse({ hint: "12345678" }, 200);
    setVerifyResponse({}, 404);
    setup();

    fireEvent.change(screen.getByPlaceholderText("Type here"), {
      target: { value: "12345678" },
    });
    fireEvent.click(screen.getByRole("button"));

    return waitFor(() => {
      expect(
        screen.queryByText("Sorry! The API failed on us.")
      ).toBeInTheDocument();
    });
  });

  it("should show error message if you don't enter a digit", () => {
    setHintResponse({ hint: "12345678" }, 200);
    setVerifyResponse({}, 404);
    setup();

    fireEvent.change(screen.getByPlaceholderText("Type here"), {
      target: { value: "-" },
    });

    return waitFor(() => {
      expect(
        screen.queryByText("You can only enter digits!")
      ).toBeInTheDocument();
    });
  });
});
