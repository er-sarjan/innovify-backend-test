const grantsObject = {
  admin: {
    article: {
      'create:any': ['*', '!views', '!likes'],
      'read:any': ['*'],
      'update:any': ['*', '!views', '!likes'],
      'delete:any': ['*']
    }
  },
  user: {
    article: {
      'create:own': ['*', '!views', '!likes'],
      'read:any': ['*'],
      'update:own': ['*', '!views', '!likes'],
      'delete:own': ['*', '!protected']
    }
  }
};

export default grantsObject;
