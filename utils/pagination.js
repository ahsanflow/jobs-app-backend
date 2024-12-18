export const getPagination = (query) => {
  const page = parseInt(query.page) || 1;
  const pageSize = parseInt(query.pageSize) || 10;

  const skip = (page - 1) * pageSize;
  const limit = pageSize;

  return { skip, limit, page, pageSize };
};
