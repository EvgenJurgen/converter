export interface Route<T extends string> {
  route: T;
  Page: React.FC;
  name: string;
  Icon: React.FC;
}
