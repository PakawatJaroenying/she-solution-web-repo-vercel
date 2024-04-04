export  interface PaginationInput{
    pageSize: number,
    pageNo: number
}

export interface PaginationResponse{
    pageNo: number
    pageSize: number
    total: number
}

