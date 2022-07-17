import React, { PropsWithChildren } from 'react';

export type FC<T = Record<string, unknown>> = React.FC<PropsWithChildren<T>>;
