import styled from 'styled-components';

interface Props {
  height?: string;
  backgroundImage?: string;
  hasShadow?: boolean;
}

const SwiperDiv = styled.div<Props>`
  width: 100vw;
  height: ${(props) => props.height};
  background-size: cover;
  background-image: ${(props) => props.backgroundImage};
  background-position: center;
  box-shadow: ${(props) =>
    props.hasShadow &&
    'inset 0px 60px 50px -10px rgba(0, 0, 0, 0.5), inset 0px 0px 0px 0px rgba(0, 0, 0, 0.5);'};

  @media (min-width: 600px) {
    width: 600px;
  }
`;

export default SwiperDiv;
