export type DropLinkType = {
  path: string;
  label: string;
  icon: React.ReactNode;
  title: string;
};

export type DropItemType = | {
    id: string;
    type: 'link';
    link: DropLinkType;
  }
| {
    id: string;
    type: 'component';
    component: React.ReactNode;
  };
