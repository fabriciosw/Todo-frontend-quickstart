import React from 'react';

export interface IText {
  children: React.ReactNode;
  as:
    | 'p'
    | 'small'
    | 'b'
    | 'i'
    | 'em'
    | 'mark'
    | 'del'
    | 'ins'
    | 'sub'
    | 'sup'
    | 'span'
    | 'strong'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6';
  size?: string;
  weight?: 400 | 500 | 700;
  color?: string;
  className?: string;
}
