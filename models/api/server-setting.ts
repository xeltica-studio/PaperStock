export type ApiServerSetting = {
  serverName: string | null;
  ownerName: string | null;
  serverIconUrl: string | null;
  isUserOnly: boolean;
  canRegister: boolean;
  sidebarMenu: ApiSidebarMenuItem[];
};

export type ApiSidebarMenuItem = {
  type: 'link';
  path: string;
  isDisabled: boolean;
} | {
  type: 'separator';
} | {
  type: 'external-link';
  url: string;
  icon: string;
  isDisabled: boolean;
};
