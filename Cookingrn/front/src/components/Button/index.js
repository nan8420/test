import React from 'react';
import styled from 'styled-components/native';

const StyleButton = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  background-color: #3796EF;
`;
const Label = styled.Text`
  color: #FFFFFF;
`;



const Button = ({label, style, color, onPress}) => {
  return (
    <StyleButton style={style} onPress={onPress}>
      <Label style={{color: color ? color : '#FFFFFF'}}>{label}</Label>
    </StyleButton>
  );
};

export default Button;
