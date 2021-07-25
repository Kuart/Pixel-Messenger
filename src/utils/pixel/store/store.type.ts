interface ICurrentUserStore {
  isAuth?: boolean;
  [key: string]: any;
}

type IPixelStoreUpdateProp = [string, any];

export { ICurrentUserStore, IPixelStoreUpdateProp };
