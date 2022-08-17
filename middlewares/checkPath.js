exports.isNotAuthPath = (path) => {
    return [
      '/api/hanttech/account/register',
      '/api/hanttech/account/login'
    ].some(pattern => new RegExp(pattern).test(path));
}

exports.isLogBuilder = (path) => {
    return path.startsWith('/api/builder/');
}

exports.isHanttech = (path) => {
    return path.startsWith('/api/hanttech/');
}

exports.isUnauthorized = (req) => {
    const user = req.user;
    const pathBuilder = isLogBuilder(req.path);
    const pathHanttech = isHanttech(req.path);
    if (!user) {
        return true;
    }    
    if (!pathBuilder) {
        return true;
    }
    if (!pathHanttech) {
        return true;
    }
}