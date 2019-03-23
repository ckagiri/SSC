import React from 'react';
import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import {
  InputBase as Input,
  Field,
  withMutation,
  login,
  PasswordInput,
  LoadingButton,
  Loading,
  Typography,
} from '@ssc/core';
import { Card, CardContent, CardActions } from '@material-ui/core';
import { get } from 'lodash';
import { makeStyles } from '@material-ui/styles';
import { loginValidation } from '@ssc/common';

import { PreloadProvider } from '../contexts/PreloadContext';
import LocationFieldInput from '../inputs/LocationFieldInput';
import environment from '../environment';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    margin: 'auto',
    marginTop: 64,
  },
  header: {
    paddingTop: 24,
    backgroundColor: theme.palette.grey[100],
  },
}));

const LoginPage = ({ isValid, isSubmitting, error, ...props }) => {
  const classes = useStyles(props);
  return (
    <Card className={classes.root}>
      <CardContent className={classes.header}>
        <img src="/images/sunshine-logo.png" alt="Sunshine" height={48} />
      </CardContent>
      <CardContent>
        {error && <Typography color="error">{error}</Typography>}
        <Field
          Component={Input}
          name="credential"
          placeholder="Điện thoại/Email/Tên đăng nhập"
          label="Tên đăng nhập"
        />
        <Field Component={Input} name="password" label="Mật khẩu" />
        <LocationFieldInput name="location" />
      </CardContent>
      <CardActions>
        <LoadingButton color="primary" type="submit" disabled={!isValid} loading={isSubmitting}>
          Đăng nhập
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

const onComplete = (v, { location, ...props }) => {
  login(v);
  if (get(location, 'pathname') !== '/login') {
    window.location.href = get(location, 'pathname');
  } else {
    window.location.href = '/';
  }
};

const LoginContainer = withMutation({
  debug: true,
  environment,
  onComplete,
  validationSchema: loginValidation,
  payloadToValue: v => get(v, 'userMutation.login'),
  mutation: graphql`
    mutation LoginPageMutation($input: LoginUserInput!) {
      userMutation {
        login(input: $input) {
          accessToken
          user {
            __typename
            id
            location
            firstName
            lastName
          }
        }
      }
    }
  `,
})(LoginPage);

export default comProps => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query LoginPageQuery {
        areas {
          ...LocationFieldInput_areas
        }
      }
    `}
    render={({ props }) => {
      if (!props) return <Loading />;
      const { areas } = props || {};

      return (
        <PreloadProvider value={{ areas }}>
          <LoginContainer {...comProps} />
        </PreloadProvider>
      );
    }}
  />
);
