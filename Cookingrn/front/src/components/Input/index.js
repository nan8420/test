import React from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  height: 40px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 4px;
  background-color: #FAFAFA;
  border-width: 1px;
  border-color: #D3D3D3;
`;
const InputField = styled.TextInput`
  flex: 1;
  color: #292929;
  
`;



const Input = ({
  placeholder,
  keyboardType,
  secureTextEntry,
  style,
  clearMode,
  // onChangeText,
  value,
  onChange,
}) => {


  return (
    <Container style={style}>
      <InputField
        selectionColor="#292929"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType ? keyboardType : 'default'}
        autoCapitalize="none"
        autoCorrect={false}
        allowFontScaling={false}
        placeholderTextColor="#C3C2C8"
        placeholder={placeholder}
        clearButtonMode={clearMode ? 'while-editing' : 'never'}
        // onChangeText={onChangeText}
        value={value}
        onChange={onChange}
      />
    </Container>
  );
};

export default Input;
