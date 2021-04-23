import styled from "styled-components";

export function Row({
  children,
  bottomMargin = "small",
}: {
  children: React.ReactNode;
  bottomMargin?: "large" | "medium" | "small";
}) {
  const marginBottom =
    bottomMargin === "small"
      ? "24px"
      : bottomMargin === "medium"
      ? "32px"
      : "40px";

  return (
    <div style={{ marginBottom }} className="row">
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
