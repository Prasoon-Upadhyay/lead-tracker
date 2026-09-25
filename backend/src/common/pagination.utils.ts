export const pagination = (page: number, limit: number) => ({
  skip: (page - 1) * limit,
  take: limit,
});
