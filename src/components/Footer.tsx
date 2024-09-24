import styled from 'styled-components'

export function Footer() {
  return (
    <Container>
      <h1>Footer</h1>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 20px;
  display: flex;
  height: 60px;
  width: 100%;
  justify-content: space-between;
  font-size: 12px;
  background-color: ${({ theme }) => theme.BannerTextColor};
`