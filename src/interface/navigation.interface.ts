interface ISubNavigation {
  title: string;
  url: string;
}

export interface INaviationProps {
  title: string;
  url: string;
  icon: React.ElementType;
  subNavigation?: ISubNavigation[];
}
