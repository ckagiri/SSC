import React from 'react';
import { Route, HttpError } from 'found';
import graphql from 'babel-plugin-relay/macro';
import { Loading } from '@ssc/core';

import { PreloadProvider } from '../contexts/PreloadContext';

const query = graphql`
  query RootRouteQuery($phone: String) {
    authenticated
    viewer {
      ...ConsultantFieldInput_viewer @arguments(phone: $phone)
      ...ContactFieldInput_viewer @arguments(phone: $phone)
      ... on Staff {
        consultants {
          ...ConsultantFieldInput_consultants
        }
      }
    }

    lists {
      prefixes {
        ...PrefixFieldInput_prefixes
      }
    }
    programs {
      ...ProgramFieldInput_programs
    }
    touchpoints {
      ...SourceFieldInput_touchpoints
    }
    cities {
      ...CityFieldInput_cities
    }
    areas {
      ...LocationFieldInput_areas
    }
  }
`;

class RootRoute extends Route {
  query = query;

  render({ Component, props, ...rest }) {
    if (!props) return <Loading />;
    const { viewer, touchpoints, cities, areas, lists, authenticated, programs, ...comProps } =
      props || {};
    if (!authenticated) {
      throw new HttpError(401);
    }

    return (
      <PreloadProvider
        value={{ ...lists, viewer, areas, touchpoints, cities, authenticated, programs }}
      >
        <Component {...comProps} {...rest} />
      </PreloadProvider>
    );
  }
}

export default RootRoute;
