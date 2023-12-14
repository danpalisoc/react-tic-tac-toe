import styled from "styled-components";

interface FlexProps {
  flexDirection?: "column" | "row";
  justifyContent?: string;
  flexWrap?: string;
  flexGrow?: string;
}

const Flex = styled.div<FlexProps>`
  display: flex;
  gap: 5px;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  ${({ justifyContent }) =>
    justifyContent ? `justify-content: ${justifyContent}` : ""};
  ${({ flexWrap }) => (flexWrap ? `flex-wrap: ${flexWrap}` : "")};
  ${({ flexGrow }) => (flexGrow ? `flex-grow: ${flexGrow}` : "")};
`;

export default Flex;
