import * as React from 'react';
import shortid from 'shortid';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Connectors
import { useConfig } from '@src/store/connectors';

// Components
import CrossDomainLink from '@src/components/concrete/CrossDomainLinks/CrossDomainLink';

// Data
import domains from './domains';

const CrossDomainLinks = (props) => {
  const { config: { domain, route: { domainSpecific, pathname } } } = props;
  return (
    <div className={css(styles.flagContainer)}>
      {domains.filter(linkDomain => linkDomain.prefix !== domain).map((linkDomain) => (
        <CrossDomainLink
          flag={linkDomain.flag}
          href={domainSpecific ? '/' : pathname}
          key={shortid.generate()}
          prefix={linkDomain.prefix}
          transKey={linkDomain.transkey}
        />
      ))}
    </div>
  );
};

export default useConfig(CrossDomainLinks);
