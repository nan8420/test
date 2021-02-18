import React, {useEffect, useCallback} from 'react';
import styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../../../reducers/user';
import axios from 'axios';
import Input from '../../components/Input';
import Button from '../../components/Button';
import useInput from '../../hooks/useInput'; 

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #FEFFFF;
`;
const FormContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 32px;
`;

const Logo = styled.Text`
  color: #292929;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
`;



const Login = ({navigation}) => {
  const dispatch = useDispatch();

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');



  const onSubmitForm = useCallback(() => {
    console.log("submitform");
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <Container>
      <FormContainer onSubmit={onSubmitForm}>
      <Logo>Cook Class</Logo>
        <Input style={{marginBottom: 16}} placeholder="이메일"
         value={email} 
         onChange={onChangeEmail}
        />
        <Input
          style={{marginBottom: 16}}
          placeholder="비밀번호"
          secureTextEntry={true}
          value={password}
          onChange={onChangePassword}
        />
        <Button
        type="primary"
        htmlType="submit"
          label="로그인"
          style={{marginBottom: 24}}
          onPress={onSubmitForm }
        />
      </FormContainer>
    </Container>
  );
};

export default Login;
