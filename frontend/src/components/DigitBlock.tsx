import styled from "styled-components";

interface IDigitBlockProps {
  digit: string;
  variant?: "normal" | "highlight";
}

const StyledSpan = styled.span<Pick<IDigitBlockProps, "variant">>`
  ${(props) => `
      font-weight: bold;
      background-color: ${
        (props as any).variant === "highlight"
          ? props.theme["$highlightColor"]
          : props.theme["$darkBaseColor"]
      };
      color: ${
        (props as any).variant === "highlight"
          ? props.theme["$textColor"]
          : "white"
      }
    `}
`;

export function DigitBlock({ digit, variant = "normal" }: IDigitBlockProps) {
  return (
    <StyledSpan className="list-group-item .flex-fill" variant={variant}>
      {digit}
    </StyledSpan>
  );
}
