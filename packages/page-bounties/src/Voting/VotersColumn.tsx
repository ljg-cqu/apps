// Copyright 2017-2021 @polkadot/app-bounties authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DeriveCollectiveProposal } from '@polkadot/api-derive/types';
import type { BountyStatus } from '@polkadot/types/interfaces';

import React, { useMemo } from 'react';
import styled from 'styled-components';

import { AddressSmall, Icon } from '@polkadot/react-components';

import { getProposalToDisplay } from '../helpers/extendedStatuses';

interface Props {
  className?: string;
  option: 'ayes' | 'nays';
  proposals: DeriveCollectiveProposal[];
  status: BountyStatus;
}

const styleOptions = {
  ayes: {
    icon: 'check',
    label: 'AYE:'
  },
  nays: {
    icon: 'times',
    label: 'NAY:'
  }
};

function VotersColumn ({ className, option, proposals, status }: Props): JSX.Element {
  const proposal = useMemo(() => getProposalToDisplay(proposals, status), [proposals, status]);
  const votes = useMemo(() => option === 'ayes' ? proposal?.votes?.ayes : proposal?.votes?.nays, [proposal, option]);

  const voters = useMemo(() => votes?.map((accountId) =>
    <div
      className='voter'
      data-testid={`voters_${option}_${accountId.toString()}`}
      key={accountId.toString()}
    >
      <AddressSmall value={accountId}/>
    </div>), [option, votes]);

  return (
    <>
      {proposal &&
        <div className={className}>
          <div className='vote-numbers'>
            <span className='vote-numbers-icon'><Icon icon={styleOptions[option].icon} /></span>
            <span className='vote-numbers-label'>{styleOptions[option].label} {votes && votes.length}</span>
          </div>
          {voters}
        </div>}
    </>
  );
}

export default React.memo(styled(VotersColumn)`
  .vote-numbers {
    display: flex;
    align-items: center;
    margin-bottom: 0.85rem;
  }

  .vote-numbers-icon svg {
    max-width: 10px;
    color: #9E9E9E;
  }
  
  .vote-numbers-label {
    margin-left: 0.75rem;
    font-weight: bold;
    font-size: 0.7rem;
    line-height: 0.85rem;
    text-transform: uppercase;
    color: #4D4D4D;
  }
`);