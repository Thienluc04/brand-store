export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

export interface ListParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: "asc" | "desc";

  [key: string]: any;
}

export interface Common {
  id: number;
  name: string;
}

export interface ListFilter {
  category: Common[];
  features: Common[];
  stars: number[];
  range?: {
    min: number;
    max: number;
  };
}
