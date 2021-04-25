import styled from "styled-components";

function getMargin(size: string): string {
  switch (size) {
    case "small":
      return "24px";

    case "medium":
      return "32px";

    case "large":
      return "40px";

    default:
      return "0px";
  }
}

export function Row({
  children,
  bottomMargin = "small",
  topMargin = "none",
}: {
  children: React.ReactNode;
  bottomMargin?: "large" | "medium" | "small" | "none";
  topMargin?: "large" | "medium" | "small" | "none";
}) {
  const marginBottom = getMargin(bottomMargin);
  const marginTop = getMargin(topMargin);

  return (
    <div style={{ marginBottom, marginTop }} className="row">
      {children}
    </div>
  );
}

export function Col({ children }: { children: React.ReactNode }) {
  return <div className="col">{children}</div>;
}

const StyledDiv = styled.div`
  ${(props) => `
    background-color: ${props.theme["$baseColor"]};
    color: ${props.theme["$textColor"]};
  `}
`;

export function Container({ children }: { children: React.ReactNode }) {
  return <StyledDiv className="container">{children}</StyledDiv>;
}
