export class Leads {
  static readonly GET_ALL = '/leads';
  static readonly CREATE = '/leads';
  static readonly QUERY_KEY = 'leads';

  static UPDATE_STATUS = (id: string) => `/leads/${id}/status`;
}