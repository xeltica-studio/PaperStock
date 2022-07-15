export type ApiServerSetting = {
  serverName: string | null;
  ownerName: string | null;
  serverIconUrl: string | null;
  isUserOnly: boolean;
  canRegister: boolean;
  sidebarMenu: ApiSidebarMenuItem[];
};

export type ApiSidebarMenuItem = {
  type: 'link' | 'separator' | 'external-link';
  path?: string;
  icon?: string;
  isDisabled?: boolean;
};
