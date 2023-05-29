export interface IListResponse {
  readonly total_item: number;
  readonly limit: number;
  readonly current_page: number;
  readonly items: Record<string, any>[];
}
