// Pagination
const pagination = (request, response, next) => {
    const page = parseInt(request?.query?.page) || 1;
    const limit = parseInt(request?.query?.limit) || 10;
    const search = request?.query?.search || "";
    const offset = (page - 1) * limit;

    // Inject properties into request object
    request.paginate = { page, limit, offset, search };

    return next();
};

module.exports = { pagination };