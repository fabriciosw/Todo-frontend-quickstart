import React from 'react';

export interface IRoute {
  path: string;
  element: React.FunctionComponent;
  public?: boolean;
}
