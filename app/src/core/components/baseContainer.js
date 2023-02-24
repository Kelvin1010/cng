import { styled } from "../style/index";
const ESTIMATED_NAV_HEIGHT = 160;
// height: calc(100vh - ${ ESTIMATED_NAV_HEIGHT }px);
const StyledContainer = styled.div`
  ${({ theme }) => `
        display: flex;
        width: 100%;
        
        overflow: hidden;
        overflow-y: auto;
        background-color: white;
    `};
`;

export default StyledContainer;
