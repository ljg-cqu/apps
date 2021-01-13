// Copyright 2017-2021 @polkadot/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ApiPromise } from '@polkadot/api';

import BN from 'bn.js';
import React from 'react';
import styled from 'styled-components';

import { useBlockTime } from '@polkadot/react-hooks';

interface Props {
  api?: ApiPromise;
  blocks?: BN;
  children?: React.ReactNode;
  className?: string;
  isInline?: boolean;
  label?: React.ReactNode;
}

function BlockToTime ({ api, blocks, children, className = '', isInline, label }: Props): React.ReactElement<Props> | null {
  const [, text] = useBlockTime(blocks, api);

  if (blocks?.ltn(0)) {
    return null;
  }

  return (
    <div className={`${className}${isInline ? ' isInline' : ''}`}>
      {label || ''}{text.split(' ').map((v, index) =>
        <span
          className={index % 2 ? 'timeUnits' : undefined}
          key={index}
        >{v}</span>
      )}{children}
    </div>
  );
}

export default React.memo(styled(BlockToTime)`
  margin-top: 0.28rem;
  font-size: 0.7rem;
  line-height: 0.85rem;
  color: #8B8B8B;

  &.isInline {
    display: inline-block;
  }

  span+span {
    padding-left: 0.25em;
  }

  span.timeUnits {
    font-size: 0.825em;
  }
`);
