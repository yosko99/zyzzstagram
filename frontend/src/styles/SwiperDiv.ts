import styled from 'styled-components';

interface Props {
  height?: string;
  backgroundImage?: string;
}

const SwiperDiv = styled.div<Props>`
  width: 100vw;
  height: ${(props) => props.height};
  background-size: cover;
  background-image: ${(props) => props.backgroundImage};
  background-position: center;

  @media (min-width: 600px) {
    width: 600px;
  }
`;

export default SwiperDiv;
