declare module 'react-world-flags' {
  import React from 'react';

  interface FlagProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    code: string; // ISO 3166-1 alpha-2 code
  }

  const Flag: React.FC<FlagProps>;
  export default Flag;
}
