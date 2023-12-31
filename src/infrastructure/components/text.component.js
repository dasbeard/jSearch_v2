import { styled } from 'styled-components/native';

const defaultTextStyles = (theme) => `
  
  font-weight: ${theme.fontWeights.regular}; 
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme) => `
  font-size: ${theme.fontSizes.body};
`;

const error = (theme) => `
  color: ${theme.colors.text.error};
`;

const caption = (theme) => `
  font-size: ${theme.fontSizes.caption};
`;

const label = (theme) => `
  font-size: ${theme.fontSizes.body};
  font-weight: ${theme.fontWeights.medium};
`;

const header = (theme) => `
  font-size: ${theme.fontSizes.title};
  font-weight: ${theme.fontWeights.bold};
`;

const variants = {
  body,
  label,
  caption,
  error,
  header,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: 'body',
};
