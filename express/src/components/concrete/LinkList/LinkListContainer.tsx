import * as React from 'react';
import shortid from 'shortid';

// Components
import LinkListComponent from '@src/components/concrete/LinkList/LinkListComponent';
import LinkListItem from '@src/components/concrete/LinkList/LinkListItem';

type Props = {
  columns?: number;
  items: Child[];
  textSize?: string;
};
type Child = {
  columns?: number;
  link: string;
  subtitle?: string;
  text: string;
  textSize?: string;
  title: string;
};

const LinkList = ({ columns, items, textSize }: Props) => (
  <LinkListComponent>
    {items.map(props => (
      <LinkListItem
        columns={columns}
        key={shortid.generate()}
        textSize={textSize}
        {...props}
      />
    ))}
  </LinkListComponent>
);

export default LinkList;
